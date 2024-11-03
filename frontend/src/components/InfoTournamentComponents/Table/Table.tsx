"use client"

import React from "react";
import { IPropsTable } from "./types";
import { useAllUsers } from "@/hooks/useAllUsers";
import TableUser from "../TableUser/TableUser";
import { IUser } from "@/context/UserContext/types";
import { ITournament } from "@/components/AdminTournamentComponents/TournamentList/types";

export const Table: React.FC<IPropsTable> = ({ params }: IPropsTable): React.ReactElement => {

    const { users } = useAllUsers();

    const usersInscriptionTournament = users.filter((user: IUser) => user.tournaments.find((tournament: ITournament) => tournament.tournamentId === +params.id));

    return (

        <div className="w-4/5 self-center">
            <div className="flex text-center h-[50px] bg-blue text-white items-center font-dynapuff rounded-tl-xl rounded-tr-xl">
                <h2 className="w-full">POSICIÓN</h2>
                <h2 className="w-full">JUGADOR</h2>
                <h2 className="w-full">PUNTOS</h2>
            </div>
            <TableUser users={usersInscriptionTournament} tournamentId={+params.id} />
        </div>

    );

};

export default Table;