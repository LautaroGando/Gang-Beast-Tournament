import React from "react";
import { IPropsButtonCreateTournament } from "./types";

export const ButtonCreateTournament: React.FC<IPropsButtonCreateTournament> = ({ handleOpenModal }: IPropsButtonCreateTournament): React.ReactElement => {

    return <button onClick={handleOpenModal} className="bg-white h-[50px] font-rajdhani text-2xl font-bold border-green border-[2px] text-green rounded-lg transition-all hover:text-white hover:bg-green">CREAR TORNEO</button>;

};

export default ButtonCreateTournament;