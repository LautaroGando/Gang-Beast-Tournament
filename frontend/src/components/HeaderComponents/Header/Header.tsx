"use client";

import React from "react";
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = (): React.ReactElement => {

    const pathname = usePathname();

    return (

        <header id="top" className={`w-full ${pathname === '/' ? "bg-[url('/assets/images/background.png')] h-[100dvh] bg-center bg-cover" : 'h-auto'}`}>
            <div className={`${pathname === '/' ? 'relative w-full h-full bg-[#000000aa]' : ''}`}>
                <NavBar />
                {
                    pathname === '/' && (
                        <Link className="absolute text-white left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center animate-pulse text-3xl" href='#stage1' >
                            <h2 className="font-dynapuff text-xl">Información del torneo</h2>
                            <FontAwesomeIcon icon={faArrowDownLong} width={30} />
                        </Link>
                    )
                }
            </div>
        </header>

    );

};

export default Header;