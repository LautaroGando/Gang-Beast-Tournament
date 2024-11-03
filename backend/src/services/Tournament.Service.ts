import { QueryRunner } from "typeorm";
import { Tournament } from "../entities/Tournament";
import { ITournament } from "../interfaces/ITournament";
import { TournamentRepository } from "../repositories/Tournament.Repository";
import { AppDataSource } from "../config/data-source";
import { TournamentStatus } from "../enums/TournamentStatus";
import { UserTournamentRepository } from "../repositories/UserTournament.Repository";
import { UserTournament } from "../entities/UserTournament";

export const getAllTournamentsService = async (): Promise<Tournament[]> => {

    const tournaments: Tournament[] = await TournamentRepository.find({
        relations: {
            users: true,
        }
    });

    return tournaments;

};

export const getTournamentByIdService = async (id: number): Promise<Tournament> => {

    const tournament: Tournament = await TournamentRepository.findById(id);

    return tournament;

};

export const createTournamentService = async (tournamentData: ITournament): Promise<Tournament> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const newTournament: Tournament = TournamentRepository.create(tournamentData);

        await TournamentRepository.save(newTournament);

        await queryRunner.commitTransaction();

        return newTournament;
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al crear el torneo.');

    } finally {

        await queryRunner.release();

    };

};

export const activeTournamentService = async (id: number): Promise<void> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const findTournament: Tournament = await TournamentRepository.findById(id);

        if (findTournament.status === TournamentStatus.ACTIVE) throw new Error("El torneo ya está activo.");

        const userTournaments: UserTournament[] = await UserTournamentRepository.find({
            where: {
                tournament: findTournament,
                isFinalized: true,
            },
        });

        for (const userTournament of userTournaments) {

            userTournament.isFinalized = false;

            await queryRunner.manager.save(userTournament);

        };

        findTournament.status = TournamentStatus.ACTIVE;

        await queryRunner.manager.save(findTournament);

        await queryRunner.commitTransaction();
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al activar el torneo.');

    } finally {

        await queryRunner.release();

    };

};

export const finalizeTournamentService = async (id: number): Promise<void> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const findTournament: Tournament = await TournamentRepository.findById(id);

        if (findTournament.status === TournamentStatus.FINALIZED) throw new Error("El torneo ya está finalizado.");

        const userTournaments: UserTournament[] = await UserTournamentRepository.find({
            where: {
                tournament: findTournament,
                isFinalized: false,
            },
        });

        if (userTournaments.length === 0) throw new Error("No hay usuarios activos en este torneo.");

        for (const userTournament of userTournaments) {

            userTournament.isFinalized = true;

            await queryRunner.manager.save(userTournament);

        };

        findTournament.status = TournamentStatus.FINALIZED;

        await queryRunner.manager.save(findTournament);

        await queryRunner.commitTransaction();
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al finalizar el torneo.');

    } finally {

        await queryRunner.release();

    };

};

export const deleteTournamentService = async (id: number): Promise<void> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const tournament: Tournament = await TournamentRepository.findById(id);

        const userTournaments: UserTournament[] = await UserTournamentRepository.find({
            where: {
                tournament,
            }
        });

        for (const userTournament of userTournaments) {

            await queryRunner.manager.remove(UserTournament, userTournament)

        };

        await queryRunner.manager.remove(Tournament, tournament);

        await queryRunner.commitTransaction();
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al eliminar el torneo.')

    } finally {

        await queryRunner.release();

    };

};