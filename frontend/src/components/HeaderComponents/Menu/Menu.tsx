import React from "react";
import styles from "./Menu.module.css";
import { useMenu } from "@/context/MenuContext/MenuContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext/UserContext";

export const Menu: React.FC = (): React.ReactElement => {

    const { menu, handleToggleMenu, handleCloseMenu } = useMenu();
    const pathname = usePathname();
    const { user, handleLogout } = useUser();

    const handleCloseAndLogout = () => {

        handleLogout();
        handleCloseMenu();

    };

    return (

        <div>
            <input onChange={handleToggleMenu} className={`${styles.input} hidden`} type="checkbox" name="checkMenu" id="checkMenu" checked={menu} />
            <label className={`${styles.label} ${menu ? 'fixed right-10 top-10 after:bg-white before:bg-white' : 'relative'} flex z-50 cursor-pointer w-[40px] h-[40px] items-center transition-all after:content-[''] after:absolute after:w-full after:h-[2px] ${pathname === '/' ? 'after:bg-white' : 'after:bg-black'} after:translate-y-3 after:transition-all before:transition-all before:content-[''] before:absolute before:w-full before:h-[2px] ${pathname === '/' ? 'before:bg-white' : 'before:bg-black'} before:-translate-y-3`} htmlFor="checkMenu">
                <div className={`${menu ? 'bg-transparent' : 'bg-black'} ${pathname === '/' ? 'bg-white' : 'bg-black'} w-full h-[2px] transition-all`}></div>
            </label>
            <div className={menu ? 'w-full fixed h-full bg-[#000000cc] top-0 left-0 transition-all flex flex-col items-center gap-10 justify-center text-2xl z-40' : 'fixed h-0 overflow-hidden'}>
                {
                    user ? (
                        <Link onClick={handleCloseMenu} className="text-white font-rajdhani font-bold transition-all border-b-[2px] border-transparent hover:border-white" href='/dashboard' >MI CUENTA</Link>
                    ) : (
                        <div className="flex gap-2 text-white font-rajdhani font-bold">
                            <Link onClick={handleCloseMenu} className="transition-all border-b-[2px] border-transparent hover:border-white" href='/login' >INICIAR SESIÓN</Link>
                            <span>/</span>
                            <Link onClick={handleCloseMenu} className="transition-all border-b-[2px] border-transparent hover:border-white" href='/register' >REGISTRARSE</Link>
                        </div>
                    )
                }
                <Link onClick={handleCloseMenu} className="text-white font-rajdhani font-bold transition-all border-b-[2px] border-transparent hover:border-white" href='/tournaments' >TORNEOS</Link>
                {
                    user?.role === 'admin' && (
                        <Link onClick={handleCloseMenu} className="text-white font-rajdhani font-bold transition-all border-b-[2px] border-transparent hover:border-white" href='/admin/users' >ADMINISTRAR USUARIOS</Link>
                    )
                }
                {
                    user?.role === 'admin' && (
                        <Link onClick={handleCloseMenu} className="text-white font-rajdhani font-bold transition-all border-b-[2px] border-transparent hover:border-white" href='/admin/tournaments' >ADMINISTRAR TORNEOS</Link>
                    )
                }
                {
                    user && (
                        <button onClick={handleCloseAndLogout} className="text-red font-rajdhani font-bold transition-all border-b-[2px] border-transparent hover:border-red" type="button">CERRAR SESIÓN</button>
                    )
                }
            </div>
        </div>

    );

};

export default Menu;