import { ITournament } from "./types";
import { fetchGetAllTournaments } from "@/services/fetchGetAllTournaments";
import React, { useEffect, useState } from "react";
import { IPropsTournamentList } from "./types";
import ButtonActionTournament from "../ButtonActionTournament/ButtonActionTournament";

export const TournamentList: React.FC<IPropsTournamentList> = ({ refresh, setRefresh }: IPropsTournamentList): React.ReactElement => {

    const [tournaments, setTournaments] = useState<ITournament[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const tournamentsData = await fetchGetAllTournaments();

            setTournaments(tournamentsData);

        };

        fetchData();

    }, [refresh]);

    return (

        <div className="flex flex-col gap-5">
            {
                tournaments.length > 0 ? (
                    tournaments.map((tournament: ITournament) => (
                        <div className={`font-rajdhani font-bold text-2xl flex justify-between h-[200px] items-center p-5 rounded-xl ${tournament.status === 'pending' ? 'bg-yellow text-black' : tournament.status === 'active' ? 'bg-green text-white' : 'bg-red text-white'}`} key={tournament.id}>
                            <h2 className="w-[300px]">Nombre: <span className="font-light">{tournament.name}</span></h2>
                            <h2 className="w-[300px]">Duración: <span className="font-light">{tournament.duration} días</span></h2>
                            <ButtonActionTournament tournament={tournament} refresh={refresh} setRefresh={setRefresh} />
                        </div>
                    ))
                ) : (
                    <p className="self-center">¡No se encontró ningún torneo!</p>
                )
            }
        </div>

    );

};

export default TournamentList;