import { AppDataSource } from "../config/data-source";
import { Tournament } from "../entities/Tournament";

export const TournamentRepository = AppDataSource.getRepository(Tournament).extend({
    findById: async function(id: number) {

        const tournament: Tournament | null = await this.findOne({
            where: {
                id,
            },
            relations: {
                users: true,
            },
        });

        if (tournament) return tournament;
        else throw new Error('Torneo no encontrado.');

    },
});