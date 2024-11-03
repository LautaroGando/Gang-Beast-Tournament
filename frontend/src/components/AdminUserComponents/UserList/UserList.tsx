"use client";

import { IUser } from "@/context/UserContext/types";
import { useAllUsers } from "@/hooks/useAllUsers";
import React, { ChangeEvent, useEffect, useState } from "react";
import ButtonActionUser from "../ButtonActionUser/ButtonActionUser";
import SearchUser from "../SearchUser/SearchUser";
import { IPropsUserList } from "./types";

export const UserList: React.FC<IPropsUserList> = ({ refresh, setRefresh }: IPropsUserList): React.ReactElement => {

    const { users } = useAllUsers(refresh);
    const [filterUsers, setFilterUsers] = useState<IUser[]>(users);

    useEffect(() => {

        setFilterUsers(users);

    }, [users, refresh]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;

        const filter = users.filter((user: IUser) => user.name.toLowerCase().startsWith(value.toLowerCase()));

        setFilterUsers(filter);

    };

    return (

        <div className="flex flex-col gap-10">
            <SearchUser handleSearch={handleSearch} />
            <div className="flex gap-5 flex-wrap justify-center">
                {
                    filterUsers.length > 0 ? (
                        filterUsers.map((user: IUser) => (
                            <div className={`w-[450px] h-[250px] rounded-lg shadow-lg shadow-gray-400 p-3 flex flex-col justify-between ${user.role === 'admin' ? 'bg-blue' : 'bg-green'}`} key={user.id}>
                                <div className="text-white font-rajdhani flex flex-col gap-[2px]">
                                    <h2 className="text-3xl font-bold">Nombre: <span className="font-normal">{user.name}</span></h2>
                                    <h3 className="text-xl font-bold">Correo electrónico: <span className="font-normal">{user.credentials.email}</span></h3>
                                    <h3 className="text-xl font-bold">Número de documento: <span className="font-normal">{user.dni}</span></h3>
                                    <h3 className="text-xl font-bold">Teléfono: <span className="font-normal">{user.phone}</span></h3>
                                    <h3 className="text-xl font-bold">Dirección: <span className="font-normal">{user.address}</span></h3>
                                </div>
                                <ButtonActionUser userId={user.id} refresh={refresh} setRefresh={setRefresh} />
                            </div>
                        ))
                    ) : (
                        <p className="self-center">¡No se encontró ningún usuario!</p>
                    )
                }
            </div>
        </div>

    )

};

export default UserList;