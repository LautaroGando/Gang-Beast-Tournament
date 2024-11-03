import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TournamentStatus } from "../enums/TournamentStatus";
import { UserTournament } from "./UserTournament";

@Entity({
    name: 'tournaments',
})
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column({
        type: 'enum',
        enum: TournamentStatus,
        default: TournamentStatus.PENDING,
    })
    status: TournamentStatus

    @OneToMany(() => UserTournament, userTournament => userTournament.tournament)
    @JoinColumn()
    users: UserTournament[]
};