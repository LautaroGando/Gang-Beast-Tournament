import React from "react";
import { IPropsInfoTournament } from "./types";
import Table from "@/components/InfoTournamentComponents/Table/Table";

export const InfoTournament: React.FC<IPropsInfoTournament> = ({ params }: IPropsInfoTournament): React.ReactElement => {

    return (

        <div className="w-full p-10 min-h-[calc(100dvh-120px)] flex flex-col gap-20">
            <h1 className="font-dynapuff text-5xl">Tabla de posiciones</h1>
            <Table params={params} />
        </div>

    );

};

export default InfoTournament;