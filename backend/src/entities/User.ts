import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { RoleUser } from "../enums/RoleUser";
import { UserTournament } from "./UserTournament";

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dni: number;

    @Column()
    phone: number;

    @Column()
    address: string;

    @Column({
        type: 'enum',
        enum: RoleUser,
        default: RoleUser.USER,
    })
    role: RoleUser;

    @OneToOne(() => Credential)
    @JoinColumn()
    credentials: Credential;

    @OneToMany(() => UserTournament, userTournament => userTournament.user)
    @JoinColumn()
    tournaments: UserTournament;
};