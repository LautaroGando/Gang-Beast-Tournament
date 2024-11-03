"use client";

import { IUser } from "@/context/UserContext/types";
import { fetchUsers } from "@/services/fetchUsers";
import { useEffect, useState } from "react";

export const useAllUsers = (refresh: boolean) => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const usersData = await fetchUsers();

                setUsers(usersData);

            } catch (error) {

                console.log(error);

            };

        };

        fetchData();

    }, [refresh]);

    return { users };

};