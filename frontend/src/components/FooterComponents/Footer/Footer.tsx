import Image from "next/image";
import React from "react";
import Copyright from "../Copyright/Copyright";
import FooterLink from "../FooterLink/FooterLink";
import FooterInformation from "../FooterInformation/FooterInformation";

export const Footer: React.FC = (): React.ReactElement => {

    return (

        <footer className="w-full h-[70dvh] flex flex-col px-20 py-5 justify-between">
            <div className="flex h-full justify-between p-10">
                <Image className="self-center" src='/assets/icons/icon.svg' alt="Icono del sitio" width={150} height={150} />
                <FooterLink />
                <FooterInformation />
            </div>
            <Copyright />
        </footer>

    );

};

export default Footer;