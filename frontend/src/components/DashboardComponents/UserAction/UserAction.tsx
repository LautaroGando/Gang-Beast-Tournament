import { useUser } from "@/context/UserContext/UserContext";
import React from "react";

export const UserAction: React.FC = (): React.ReactElement => {

    const { handleLogout } = useUser();

    return (

        <div className="flex gap-5">
            <button className="flex justify-center items-center w-[250px] h-[50px] text-black font-rajdhani font-bold text-xl bg-yellow rounded-sm transition-all hover:bg-[#f3cb2c]">MODIFICAR DATOS</button>
            <button className="w-[250px] h-[50px] text-white font-rajdhani font-bold text-xl bg-red rounded-sm transition-all hover:bg-[#ff5d48]" onClick={handleLogout} type="button">CERRAR SESIÓN</button>
        </div>

    );

};

export default UserAction;