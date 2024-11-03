"use client";

import { fetchDeleteUser } from "@/services/fetchDeleteUser";
import React from "react";
import { IPropsButtonActionUser } from "./types";

export const ButtonActionUser: React.FC<IPropsButtonActionUser> = ({ userId, refresh, setRefresh }: IPropsButtonActionUser): React.ReactElement => {

    const handleDeleteUser = async (id: number) => {

        await fetchDeleteUser(id, refresh, setRefresh);

    };

    return (

        <div className="flex justify-between gap-10">
            <button className="bg-yellow w-full py-2 rounded-md transition-all hover:bg-[#f3cb2c]">MODIFICAR</button>
            <button onClick={() => handleDeleteUser(userId)} className="bg-red text-white w-full py-2 rounded-md transition-all hover:bg-[#ff5d48]">ELIMINAR</button>
        </div>

    );

};

export default ButtonActionUser;