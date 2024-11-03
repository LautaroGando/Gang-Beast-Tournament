import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TournamentInscription: React.FC = (): React.ReactElement => {

    return (

        <div id="inscription" className="w-full h-[100dvh] flex pt-20 px-20 justify-between items-center bg-blue">
            <Image className="w-[300px] h-auto self-end" src="/assets/images/characterBlue.svg" alt="Imagen del personaje verde." width={500} height={0} />
            <div className="w-1/2 flex flex-col gap-40 items-center">
                <h2 className="font-dynapuff text-8xl text-white text-center">¿Qué estás esperando?</h2>
                <Link className="w-[350px] h-[80px] bg-white border-[3px] rounded-md font-rajdhani font-bold transition-all text-4xl text-blue flex justify-center items-center hover:bg-transparent hover:text-white" href='/tournaments' >INSCRIBIRSE</Link>
            </div>
        </div>

    );

};

export default TournamentInscription;