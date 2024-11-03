"use client";

import { ITournament } from "@/components/AdminTournamentComponents/TournamentList/types";
import { IUser } from "@/context/UserContext/types";
import { useUser } from "@/context/UserContext/UserContext";
import { fetchGetAllTournaments } from "@/services/fetchGetAllTournaments";
import { fetchInscriptionUserTournament } from "@/services/fetchInscriptionUserTournament";
import { fetchUserById } from "@/services/fetchUserById";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const TournamentList: React.FC = (): React.ReactElement => {

    const [tournaments, setTournaments] = useState<ITournament[]>([]);
    const { user, setUser } = useUser();

    useEffect(() => {

        const fetchData = async () => {

            const data = await fetchGetAllTournaments();

            setTournaments(data);

        };

        fetchData();

    }, [user]);

    const handleInscription = async (userId: number, tournamentId: number) => {

        await fetchInscriptionUserTournament(userId, tournamentId);

        const updateUser = await fetchUserById(userId);

        localStorage.setItem('userData', JSON.stringify(updateUser));

        setUser(updateUser);

    };

    return (

        <div className="flex flex-col gap-5">
            {
                tournaments && tournaments.length > 0 ? (
                    tournaments.map((tournament: ITournament) => (
                        <div className={`font-rajdhani font-bold text-2xl flex justify-between h-[200px] items-center p-5 rounded-xl shadow-md transition-all hover:shadow-blue`} key={tournament.id}>
                            <h2 className="w-[300px]">Nombre: <span className="font-light">{tournament.name}</span></h2>
                            <h2 className="w-[300px]">Duración: <span className="font-light">{tournament.duration} días</span></h2>
                            <h2 className="w-[300px]">Participantes: <span className="font-light">{tournament.users?.length}</span></h2>
                            <h2 className="w-[300px]">Estado: <span className={`px-3 rounded-lg text-base ${tournament.status === 'pending' ? 'bg-yellow text-black' : tournament.status === 'active' ? 'bg-green text-white' : 'bg-red text-white'}`}>{tournament.status}</span></h2>
                            {
                                user ? (
                                    <>
                                        {
                                            user.tournaments && !user.tournaments.some((userTournament: ITournament) => tournament.users?.find((user: IUser) => user.id === userTournament.id)) ? (
                                                <button onClick={() => handleInscription(user.id, tournament.id)} className={`text-white p-2 text-lg rounded-lg transition-all ${tournament.status === 'active' || tournament.status === 'finalized' ? 'bg-gray-400' : 'bg-blue hover:bg-[#089ddd]'}`} disabled={tournament.status === 'active' || tournament.status === 'finalized'}>INSCRIBIRSE</button>
                                            ) : (
                                                <Link className="text-white p-2 text-lg rounded-lg transition-all flex justify-center items-center bg-blue hover:bg-[#089ddd]" href={`/tournaments/${tournament.id}`}>VER TORNEO</Link>
                                            )
                                        }
                                    </>
                                ) : null
                            }
                        </div>
                    ))
                ) : (
                    <p className="self-center">¡No se encontró ningún torneo!</p>
                )
            }
        </div>

    );

}

export default TournamentList;