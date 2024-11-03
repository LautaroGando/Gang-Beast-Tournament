import RegisterForm from "@/components/RegisterComponents/RegisterForm/RegisterForm";
import RegisterInfo from "@/components/RegisterComponents/RegisterInfo/RegisterInfo";
import React from "react";

export const Register: React.FC = (): React.ReactElement => {

    return (

        <div className="flex p-10 justify-around items-center min-h-[calc(100dvh-120px)]">
            <RegisterInfo />
            <RegisterForm />
        </div>

    );

};

export default Register;