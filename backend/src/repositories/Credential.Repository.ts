import { Credential } from "../entities/Credential";
import { AppDataSource } from "../config/data-source";

export const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    findCredentials: async function(email: string, password: string): Promise<Credential> {

        const credentials: Credential | null = await this.findOneBy({
            email,
            password,
        });

        if (credentials) return credentials;
        else throw new Error("Credenciales inválidas.");

    },
});