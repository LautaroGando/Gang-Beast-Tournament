import LoginForm from "@/components/LoginComponents/LoginForm/LoginForm";
import LoginInfo from "@/components/LoginComponents/LoginInfo/LoginInfo";
import React from "react";

export const Login: React.FC = (): React.ReactElement => {

    return (

        <div className="flex flex-row-reverse items-center p-10 justify-around min-h-[calc(100dvh-120px)]">
            <LoginInfo />
            <LoginForm />
        </div>

    );

};

export default Login;