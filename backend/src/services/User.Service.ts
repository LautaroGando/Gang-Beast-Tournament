import { QueryRunner } from "typeorm";
import { User } from "../entities/User";
import { ICredential } from "../interfaces/ICredencial";
import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../repositories/User.Repository";
import { AppDataSource } from "../config/data-source";
import { checkCredentialsService, createCredentialsService } from "./Credential.Service";
import { Credential } from "../entities/Credential";
import { ILogin } from "../interfaces/ILogin";
import { RoleUser } from "../enums/RoleUser";
import { Tournament } from "../entities/Tournament";
import { TournamentRepository } from "../repositories/Tournament.Repository";
import { UserTournament } from "../entities/UserTournament";
import { UserTournamentRepository } from "../repositories/UserTournament.Repository";

export const getAllUsersService = async (): Promise<User[]> => {

    const users: User[] = await UserRepository.find({
        relations: {
            credentials: true,
            tournaments: true,
        },
    });

    return users;

};

export const getUserByIdService = async (id: number): Promise<User> => {

    const user: User = await UserRepository.findById(id);

    return user;

};

export const registerUserService = async (userData: IUser, credentialData: ICredential): Promise<User> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const credentials: Credential = await createCredentialsService(credentialData);

        const newUser: User = UserRepository.create(userData);

        if (credentials) {

            newUser.credentials = credentials;

            credentials.email === "lautarogandodev@gmail.com" ? newUser.role = RoleUser.ADMIN : newUser.role = RoleUser.USER;

            await queryRunner.manager.save(newUser);

        };

        await queryRunner.commitTransaction();

        return newUser;

    } catch (error) {

        await queryRunner.rollbackTransaction();

        throw new Error("Credenciales inválidas.");

    } finally {

        await queryRunner.release();

    };

};

export const loginUserService = async (credentialData: ICredential): Promise<ILogin> => {

    const credentials: Credential = await checkCredentialsService(credentialData);

    const user: User = await UserRepository.findById(credentials.id);

    const login: ILogin = {
        login: true,
        user,
    };

    if (user) return login;
    else throw new Error("Credenciales inválidas.");

};

export const inscriptionUserTournamentService = async (userId: number, tournamentId: number): Promise<void> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const tournament: Tournament = await TournamentRepository.findById(tournamentId);

        if (tournament.status !== 'pending') throw new Error('El torneo no permite inscripciones');

        const user: User = await UserRepository.findById(userId);

        const activeTournament = await UserTournamentRepository.findOne({
            where: {
                user,
                isFinalized: false,
            }
        });

        if (activeTournament) throw new Error("El usuario ya está en un torneo activo");

        const userTournament = new UserTournament();

        userTournament.user = user;
        userTournament.tournament = tournament;

        await queryRunner.manager.save(UserTournament, userTournament);

        await queryRunner.commitTransaction();

    } catch (error) {

        await queryRunner.rollbackTransaction();

        throw new Error('Error al inscribirse al torneo.');

    } finally {

        await queryRunner.release();

    };

};

export const addPointsService = async (userId: number, tournamentId: number, points: number): Promise<UserTournament> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const userTournament: UserTournament = await UserTournamentRepository.findTournamentIdAndUserId(userId, tournamentId);

        userTournament.points += points;

        await queryRunner.manager.save(userTournament);

        await queryRunner.commitTransaction();

        return userTournament;
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al agregar puntos.');

    } finally {

        await queryRunner.release();

    };

};

export const removePointsService = async (userId: number, tournamentId: number, points: number): Promise<UserTournament> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const userTournament: UserTournament = await UserTournamentRepository.findTournamentIdAndUserId(userId, tournamentId);

        userTournament.points -= points;

        await queryRunner.manager.save(userTournament);

        await queryRunner.commitTransaction();

        return userTournament;
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al eliminar puntos.');

    } finally {

        await queryRunner.release();

    };

};

export const deleteUserService = async (id: number): Promise<void> => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {

        await queryRunner.startTransaction();

        const user: User = await UserRepository.findById(id);

        await UserRepository.remove(user);

        await queryRunner.commitTransaction();
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        throw new Error('Error al eliminar usuario.');

    } finally {

        await queryRunner.release();

    };

};