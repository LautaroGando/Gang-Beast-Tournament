import { DataSource } from "typeorm";
import 'dotenv/config';
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Tournament } from "../entities/Tournament";
import { UserTournament } from "../entities/UserTournament";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [Credential, User, Tournament, UserTournament],
    subscribers: [],
    migrations: [],
});