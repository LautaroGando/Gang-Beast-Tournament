'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IPropsUserContext, IUser } from "./types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const UserContext = createContext<IPropsUserContext | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {

        const user = localStorage.getItem('userData');

        const verifyUser = user ? JSON.parse(user) : null;

        if (verifyUser) setUser(verifyUser);

        setLoading(false);

    }, []);

    const handleLogout = () => {

        Swal.fire({
            title: "¿Seguro desea cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, cerrar sesión!",
            cancelButtonText: "¡No!"
        }).then((result) => {

            if (result.isConfirmed) {

                localStorage.removeItem("userData");

                Cookies.remove("userData");

                setUser(null);

                router.push("/");

            };

        });

    };

    if (loading) return;

    return (

        <UserContext.Provider value={{ user, setUser, handleLogout }} >
            {children}
        </UserContext.Provider>

    );

};

export const useUser = () => {

    const context = useContext(UserContext);

    if (context === null) throw new Error("El contexto debe ser utilizado dentro de un UserProvider.");

    return context;

};