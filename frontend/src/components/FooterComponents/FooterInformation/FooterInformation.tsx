import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export const FooterInformation: React.FC = (): React.ReactElement => {

    return (

        <div className="flex flex-col gap-5">
            <h2 className="font-dynapuff text-3xl font-bold">MÁS INFORMACIÓN</h2>
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} width={20} />
                <Link className="font-rajdhani text-xl font-light" href="https://www.google.com/maps/search/?api=1&query=Av.+Juan+B.+Justo+9100,+Liniers,+CABA,+1408" target="_blank"rel="noopener noreferrer"
                >Av. Juan B. Justo 9100, Liniers, CABA, 1408</Link>
            </div>
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} width={20} />
                <Link className="font-rajdhani text-xl font-light" href='tel:+541132692245' >11-3269-2245</Link>
            </div>
        </div>

    );

};

export default FooterInformation;