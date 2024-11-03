import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { UserDto } from "../dtos/UserDto";
import { ICredential } from "../interfaces/ICredencial";
import { CredentialRepository } from "../repositories/Credential.Repository";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User.Repository";
import { RoleUser } from "../enums/RoleUser";

const preloadCredentials: ICredential[] = [
    {
        email: 'lautarogandodev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'rociobonindev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'agustinanconadev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'abrilgandodev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'nahuelgandodev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'gracieladuartedev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'marcelogandodev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'pablobonindev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'karinamartinezdev@gmail.com',
        password: 'Ganditocapo*3',
    },
    {
        email: 'corchitoanconadev@gmail.com',
        password: 'Ganditocapo*3',
    },
];

const preloadUsers: UserDto[] = [
    {
        name: 'Lautaro Gando',
        dni: 43171024,
        phone: 1132692245,
        address: 'Av. Juan B. Justo 9100',
        credentialsId: 1,
    },
    {
        name: 'Rocio Bonin',
        dni: 42100709,
        phone: 1132698855,
        address: 'Yatay 707',
        credentialsId: 2,
    },
    {
        name: 'Agustin Ancona',
        dni: 43806171,
        phone: 1132692244,
        address: 'Cangaye 4030',
        credentialsId: 3,
    },
    {
        name: 'Abril Gando',
        dni: 43171021,
        phone: 1132692241,
        address: 'Av. Juan B. Justo 9100',
        credentialsId: 4,
    },
    {
        name: 'Nahuel Gando',
        dni: 15987456,
        phone: 1154894525,
        address: 'Versalles 7673',
        credentialsId: 5,
    },
    {
        name: 'Graciela Duarte',
        dni: 16454878,
        phone: 1145484562,
        address: 'Av. Juan B. Justo 9100',
        credentialsId: 6,
    },
    {
        name: 'Marcelo Gando',
        dni: 17763557,
        phone: 1548795645,
        address: 'Av. Juan B. Justo 9100',
        credentialsId: 7,
    },
    {
        name: 'Pablo Bonin',
        dni: 13656484,
        phone: 1154558888,
        address: 'Yatay 707',
        credentialsId: 8,
    },
    {
        name: 'Karina Martinez',
        dni: 92546878,
        phone: 1532692245,
        address: 'Yatay 707',
        credentialsId: 9,
    },
    {
        name: 'Corchito Ancona',
        dni: 87887999,
        phone: 1564895222,
        address: 'Cangaye 4030',
        credentialsId: 10,
    },
];

const preloadDataCredentials = async () => {

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const credentials: ICredential[] = await CredentialRepository.find();

        if (credentials.length) return console.log('No se hizo la precarga de credenciales porque ya hay datos.');

        for await (const credential of preloadCredentials) {

            const newCredential: ICredential = CredentialRepository.create(credential);

            await transactionalEntityManager.save(newCredential);

        };

        console.log("Precarga de credenciales existosa.");

    });

};

const preloadDataUsers = async () => {

    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    const promises: Promise<void>[] = preloadUsers.map(async (user: UserDto) => {

        const newUser: User = UserRepository.create(user);

        await queryRunner.manager.save(newUser);

        const credentials = await CredentialRepository.findOneBy({
            id: user.credentialsId,
        });

        if (!credentials) throw new Error("Credenciales inexistentes.");

        newUser.credentials = credentials;

        newUser.credentials.email === 'lautarogandodev@gmail.com' ? newUser.role = RoleUser.ADMIN : newUser.role = RoleUser.USER;

        await queryRunner.manager.save(newUser);

    });

    try {

        await queryRunner.startTransaction();

        await Promise.all(promises);

        console.log("Precarga de usuarios existosa.");

        await queryRunner.commitTransaction();
        
    } catch (error) {
        
        await queryRunner.rollbackTransaction();

        console.log("Error al intentar cargar los usuarios.");

    } finally {

        await queryRunner.release();

    };

};

export const preloadAllData = async () => {

    await preloadDataCredentials();
    await preloadDataUsers();

};