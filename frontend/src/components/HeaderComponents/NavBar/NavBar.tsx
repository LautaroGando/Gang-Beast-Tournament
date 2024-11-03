import Menu from "@/components/HeaderComponents/Menu/Menu";
import { useMenu } from "@/context/MenuContext/MenuContext";
import { useUser } from "@/context/UserContext/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavBar: React.FC = (): React.ReactElement => {

    const { menu } = useMenu();
    const pathname = usePathname();
    const { user } = useUser();

    return (

        <nav className="w-full h-[120px] flex items-center px-10 justify-between">
            <Link href='/' >
                <Image className={`${menu ? 'opacity-0' : 'opacity-100'} transition-all`} src='/assets/icons/icon.svg' alt="Logo del sitio" width={100} height={100} />
            </Link>
            <div className="flex items-center gap-5">
                {
                    user ? (
                        null
                    ) : (
                        <div className="flex gap-2">
                            <Link className={`${menu ? 'opacity-0' : 'opacity-100'} transition-all font-rajdhani text-md ${pathname === '/' ? 'text-white' : 'text-black'}`} href='/login' >INICIAR SESIÓN</Link>
                            <span className={`${menu ? 'opacity-0' : 'opacity-100'} transition-all font-rajdhani text-md ${pathname === '/' ? 'text-white' : 'text-black'}`}>/</span>
                            <Link className={`${menu ? 'opacity-0' : 'opacity-100'} transition-all font-rajdhani text-md ${pathname === '/' ? 'text-white' : 'text-black'}`} href='/register' >REGISTRARSE</Link>
                        </div>
                    )
                }
                <Menu />
            </div>
        </nav>

    );

};

export default NavBar;