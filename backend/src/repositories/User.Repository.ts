import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function(id: number): Promise<User> {

        const user: User | null = await this.findOne({
            where: {
                id,
            },
            relations: {
                credentials: true,
                tournaments: true,
            },
        });

        if (user) return user;
        else throw new Error('Usuario no encontrado.');

    },
});