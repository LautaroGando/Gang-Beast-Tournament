import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export const BackToTop: React.FC = (): React.ReactElement => {

    return (

        <Link className="fixed right-5 bottom-5 text-white bg-red p-5 rounded-full w-16 h-16 flex justify-center items-center text-4xl" href='#top' >
            <FontAwesomeIcon icon={faChevronUp} />
        </Link>

    );

};

export default BackToTop;