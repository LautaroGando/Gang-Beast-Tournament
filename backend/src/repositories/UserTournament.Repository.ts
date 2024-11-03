import { AppDataSource } from "../config/data-source";
import { UserTournament } from "../entities/UserTournament";

export const UserTournamentRepository = AppDataSource.getRepository(UserTournament).extend({
    findTournamentIdAndUserId: async function(userId: number, tournamentId: number) {

        const userTournament: UserTournament | null = await this.findOne({
            where: {
                user: {
                    id: userId,
                },
                tournament: {
                    id: tournamentId,
                },
                isFinalized: false,
            },
        });

        if (userTournament) return userTournament;
        else throw new Error('No se encontró un torneo activo para este usuario.');

    },
});