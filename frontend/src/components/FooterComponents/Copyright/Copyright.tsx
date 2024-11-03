import React from "react";

export const Copyright: React.FC = (): React.ReactElement => {

    const year = new Date().getFullYear();

    return (

        <div className="border-t-[1px] border-black pt-5">
            <p className="font-rajdhani text-xl font-light text-center">&copy; Copyright {year} Gang Beast Tournament</p>
        </div>

    );

};

export default Copyright;