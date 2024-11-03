import { ITournament } from "@/components/AdminTournamentComponents/TournamentList/types";

export interface IUser {
    id: number;
    name: string;
    dni: number;
    phone: number;
    address: string;
    role: string;
    credentials: {
        email: string;
        password: string;
    };
    tournaments: ITournament[];
};

export interface IPropsUserContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    handleLogout: () => void;
};