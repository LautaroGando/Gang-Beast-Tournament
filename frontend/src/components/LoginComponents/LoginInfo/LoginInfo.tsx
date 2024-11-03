import Image from "next/image";
import React from "react";

export const LoginInfo: React.FC = (): React.ReactElement => {

    return (

        <div className="flex flex-col items-center gap-5">
            <h1 className="font-dynapuff text-5xl">Inicia sesión</h1>
            <Image className="w-[450px] h-[450px]" src='/assets/images/characterGreen.svg' alt="Imagen del personaje verde." width={500} height={500} />
        </div>

    );

};

export default LoginInfo;