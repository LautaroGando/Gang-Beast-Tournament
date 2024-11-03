import Image from "next/image";
import React from "react";

export const RegisterInfo: React.FC = (): React.ReactElement => {

    return (

        <div className="flex flex-col items-center gap-5">
            <h1 className="font-dynapuff text-5xl">Registrate</h1>
            <Image className="w-[450px] h-[450px]" src='/assets/images/characterYellow.svg' alt="Imagen del personaje amarillo." width={500} height={500} />
        </div>

    );

};

export default RegisterInfo;