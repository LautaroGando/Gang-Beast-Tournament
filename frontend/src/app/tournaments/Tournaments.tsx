import TournamentList from "@/components/TournamentComponents/TournamentList/TournamentList";
import React from "react";

export const Tournaments: React.FC = (): React.ReactElement => {

    return (

        <div className="w-full p-10 min-h-[calc(100dvh-120px)] flex flex-col gap-20">
            <h1 className="font-dynapuff text-5xl">Torneos</h1>
            <TournamentList />
        </div>

    );

};

export default Tournaments;