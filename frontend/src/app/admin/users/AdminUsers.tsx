"use client";

import UserList from "@/components/AdminUserComponents/UserList/UserList";
import React, { useState } from "react";

export const AdminUsers: React.FC = (): React.ReactElement => {

    const [refresh, setRefresh] = useState<boolean>(false);

    return (

        <div className="w-full p-10 min-h-[calc(100dvh-120px)] flex flex-col gap-10">
            <h1 className="font-dynapuff text-5xl">Administrar usuarios</h1>
            <UserList refresh={refresh} setRefresh={setRefresh} />
        </div>

    );

};

export default AdminUsers;