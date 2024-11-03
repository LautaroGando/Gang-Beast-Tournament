import { IUser } from "@/context/UserContext/types";

export interface ITournament {
    id: number;
    name: string;
    duration: number;
    status: string;
    points: number;
    tournamentId: number;
    users?: IUser[];
};

export interface IPropsTournamentList {
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
};