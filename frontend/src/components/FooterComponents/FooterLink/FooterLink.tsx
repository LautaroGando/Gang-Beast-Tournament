'use client';

import { useUser } from "@/context/UserContext/UserContext";
import Link from "next/link";
import React from "react";

export const FooterLink: React.FC = (): React.ReactElement => {

    const { user } = useUser();

    return (

        <div className="flex flex-col gap-5">
            <h2 className="font-dynapuff text-3xl font-bold">LINKS</h2>
            <Link className="font-rajdhani text-xl font-light" href='/' >Inicio</Link>
            <Link className="font-rajdhani text-xl font-light" href='/tournaments' >Torneos</Link>
            {
                user && (
                    <Link className="font-rajdhani text-xl font-light" href='/dashboard' >Mi cuenta</Link>
                )
            }
            {
                user?.role === 'admin' && (
                    <Link className="font-rajdhani text-xl font-light" href='/admin/users' >Administrar usuarios</Link>
                )
            }
            {
                user?.role === 'admin' && (
                    <Link className="font-rajdhani text-xl font-light" href='/admin/tournaments' >Administrar torneos</Link>
                )
            }
        </div>

    );

};

export default FooterLink;