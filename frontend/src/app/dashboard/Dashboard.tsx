import UserInfo from "@/components/DashboardComponents/UserInfo/UserInfo";
import React from "react";

export const Dashboard: React.FC = (): React.ReactElement => {

    return (

        <div className="w-full p-10 min-h-[calc(100dvh-120px)] flex flex-col gap-20">
            <h1 className="font-dynapuff text-5xl">Mis datos</h1>
            <UserInfo />
        </div>

    );

};

export default Dashboard;