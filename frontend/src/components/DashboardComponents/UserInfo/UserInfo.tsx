"use client";

import { useUser } from "@/context/UserContext/UserContext";
import React from "react";
import UserAction from "../UserAction/UserAction";

export const UserInfo: React.FC = (): React.ReactElement => {

    const { user } = useUser();
    
    return (

        <div>
            <div className="flex flex-col gap-10 w-1/2">
                <h2 className="font-rajdhani text-xl font-bold">Nombre completo: <span className="font-light">{user?.name}</span></h2>
                <h2 className="font-rajdhani text-xl font-bold">Correo electrónico: <span className="font-light">{user?.credentials?.email}</span></h2>
                <h2 className="font-rajdhani text-xl font-bold">Número de documento: <span className="font-light">{user?.dni}</span></h2>
                <h2 className="font-rajdhani text-xl font-bold">Teléfono: <span className="font-light">{user?.phone}</span></h2>
                <h2 className="font-rajdhani text-xl font-bold">Dirección: <span className="font-light">{user?.address}</span></h2>
                <UserAction />
            </div>
        </div>

    );

};

export default UserInfo;