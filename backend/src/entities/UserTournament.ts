import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Tournament } from "./Tournament";

@Entity({
    name: 'user_tournaments',
})
export class UserTournament {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => User, user => user.tournaments)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Tournament, tournament => tournament.users)
    @JoinColumn()
    tournament: Tournament;

    @Column({
        default: 0,
    })
    points: number;

    @Column({
        default: false,
    })
    isFinalized: boolean

    @Column()
    tournamentId: number;
};