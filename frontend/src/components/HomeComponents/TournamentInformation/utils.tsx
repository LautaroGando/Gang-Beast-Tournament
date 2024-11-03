import React from "react";
import { IStage } from "./types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

export const stages: IStage[] = [
    {
        id: 1,
        title: 'ETAPA 1:',
        description: 'En esta etapa, jugarán todos los participantes, se jugará por semana una ronda a puntos, depende la cantidad de participantes serán los puntos a repartir, el precio por partida será de $1000, esos mismos, serán transformados en dólares para mantener su valor. Por mes, depende la posición del jugador, se le repartirá su correspondiente premio. Terminando el primer cuarto del año, se conocerán los clasificados a la siguiente etapa del torneo, clasificarán el 80% de los jugadores registrados.',
        image: '/assets/images/characterGreen.svg'
    },
    {
        id: 2,
        title: 'ETAPA 2:',
        description: 'En la segunda etapa, también se jugará por puntos, a diferencia de la anterior etapa, depende la posición en la partida, se le sumará o se le restará puntaje, el precio por partida será de $2000, esos mismos, serán transformados en dólares para mantener su valor. Por mes, depende la posición del jugador, se le repartirá su correspondiente premio. Terminando el segundo cuarto del año, se conocerán los clasificados a la siguiente etapa del torneo, clasificarán el 50% de los jugadores registrados.',
        image: '/assets/images/characterYellow.svg'
    },
    {
        id: 3,
        title: 'ETAPA 3:',
        description: 'En la tercera y última etapa, también se jugará por puntos, a diferencia de las dos anteriores etapas, dependiendo la cantidad de participantes, por mes se irán eliminando del torneo, el precio por partida será de $3000, esos mismos, serán transformados en dólares para mantener su valor. En esta etapa no se recibirá premio por mes, ya que se compite por el premio final, este será muchísimo más grande que cualquier anterior premio. El ganador del torneo se dará a conocer en la gran final, en la última semana del mes de diciembre.',
        image: '/assets/images/characterRed.svg'
    },
];

export const renderStages = (stage: IStage): React.ReactElement => {

    return (

        <div>
            {
                stage.id === 1 ? (
                    <div id="stage1" className="relative w-full min-h-[100dvh] flex pt-20 px-20 justify-between items-center">
                        <div className="absolute w-[200px] h-[200px] bg-green top-0 right-0 rounded-bl-[1000px]"></div>
                        <div className="w-1/2 flex flex-col gap-10 bg-green text-white p-10 rounded-xl shadow-xl shadow-[#00000057]">
                            <h2 className="font-dynapuff text-5xl font-medium">{stage.title}</h2>
                            <p className="font-rajdhani text-2xl">{stage.description}</p>
                        </div>
                        <Image className="w-[400px] h-auto self-end" src={stage.image} alt="Imagen del personaje verde." width={500} height={0} />
                        <Link className="absolute w-10 h-10 text-black left-1/2 bottom-5 animate-bounce text-3xl" href='#stage2' >
                            <FontAwesomeIcon icon={faArrowDownLong} />
                        </Link>
                    </div>
                ) : stage.id === 2 ? (
                    <div id="stage2" className="relative w-full min-h-[100dvh] flex flex-row-reverse pt-20 px-20 justify-between items-center">
                        <div className="absolute w-[200px] h-[200px] bg-yellow top-0 left-0 rounded-br-[1000px]"></div>
                        <div className="w-1/2 flex flex-col gap-10 bg-yellow text-black p-10 rounded-xl shadow-xl shadow-[#00000057]">
                            <h2 className="font-dynapuff text-5xl font-medium">{stage.title}</h2>
                            <p className="font-rajdhani text-2xl">{stage.description}</p>
                        </div>
                        <Image className="w-[400px] h-auto self-end" src={stage.image} alt="Imagen del personaje verde." width={500} height={0} />
                        <Link className="absolute w-10 h-10 text-black left-1/2 bottom-5 animate-bounce text-3xl" href='#stage3' >
                            <FontAwesomeIcon icon={faArrowDownLong} />
                        </Link>
                    </div>
                ) : (
                    <div id="stage3" className="relative w-full min-h-[100dvh] flex pt-20 px-20 justify-between items-center">
                        <div className="absolute w-[200px] h-[200px] bg-red top-0 right-0 rounded-bl-[1000px]"></div>
                        <div className="w-1/2 flex flex-col gap-10 bg-red text-white p-10 rounded-xl shadow-xl shadow-[#00000057]">
                            <h2 className="font-dynapuff text-5xl font-medium">{stage.title}</h2>
                            <p className="font-rajdhani text-2xl">{stage.description}</p>
                        </div>
                        <Image className="w-[400px] h-auto self-end" src={stage.image} alt="Imagen del personaje verde." width={500} height={0} />
                        <Link className="absolute text-black left-1/2 -translate-x-1/2 bottom-5 flex flex-col items-center animate-pulse text-3xl" href='#inscription' >
                            <h2 className="font-dynapuff text-xl">Inscribirse</h2>
                            <FontAwesomeIcon icon={faArrowDownLong} width={30} />
                        </Link>
                    </div>
                )
            }
        </div>

    );

};