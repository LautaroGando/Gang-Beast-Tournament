import Link from "next/link";
import React from "react";
import { IPropsButtonActionTournament } from "./types";
import { ITournament } from "../TournamentList/types";
import { fetchFinalizeTournament } from "@/services/fetchFinalizeTournament";
import { fetchDeleteTournament } from "@/services/fetchDeleteTournament";
import { fetchActiveTournament } from "@/services/fetchActiveTournament";

export const ButtonActionTournament: React.FC<IPropsButtonActionTournament<ITournament>> = ({ tournament, refresh, setRefresh }: IPropsButtonActionTournament<ITournament>): React.ReactElement => {

    const handleActive = async (id: number) => {

        await fetchActiveTournament(id, refresh, setRefresh);

    };
        
    const handleFinalize = async (id: number) => {

        await fetchFinalizeTournament(id, refresh, setRefresh);

    };

    const handleDelete = async (id: number) => {

        await fetchDeleteTournament(id, refresh, setRefresh);

    };

    return (

        <div className="flex flex-col gap-5 items-start text-lg">
            <Link className="bg-blue w-[200px] h-[40px] flex justify-center items-center text-white" href={`/tournaments/${tournament.id}`} >INGRESAR</Link>
            {tournament.status === 'pending' ? <button onClick={() => handleActive(tournament.id)} className="bg-green text-white w-[200px] h-[40px]">ACTIVAR</button> : tournament.status === 'finalized' ? null : <button onClick={() => handleFinalize(tournament.id)} className="bg-yellow text-black w-[200px] h-[40px]">FINALIZAR</button>}
            <button onClick={() => handleDelete(tournament.id)} className="bg-red w-[200px] h-[40px] text-white">ELIMINAR</button>
        </div>

    );

};

export default ButtonActionTournament;