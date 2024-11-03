"use client";

import { useUser } from "@/context/UserContext/UserContext";
import { IUserLogin, validateLogin } from "@/helpers/validateLogin";
import { fetchLoginUser } from "@/services/fetchLoginUser";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

export const LoginForm: React.FC = (): React.ReactElement => {

    const { setUser } = useUser();
    const router = useRouter();

    return (

        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={validateLogin}
            onSubmit={async (userData, { resetForm }) => {

                const user = await fetchLoginUser(userData);

                resetForm();

                if (user.user.name) {

                    setUser(user.user);

                    router.push('/');

                };

            }}
        >
            {
                ({ errors, touched }: FormikProps<IUserLogin>) => (
                    <Form className="flex flex-col gap-10">
                        <div className="flex flex-col w-[350px] gap-3 relative">
                            <Field className={`input border-black ${errors.email && touched.email ? 'border-red' : !errors.email && touched.email ? 'border-green' : ''}`} type='email' name='email' placeholder='Correo electrónico' />
                            <span className="inputError"><ErrorMessage name="email" /></span>
                        </div>
                        <div className="flex flex-col w-[350px] gap-3 relative">
                            <Field className={`input border-black ${errors.password && touched.password ? 'border-red' : !errors.password && touched.password ? 'border-green' : ''}`} type='password' name='password' placeholder='Contraseña' />
                            <span className="inputError"><ErrorMessage name="password" /></span>
                        </div>
                        <button className="w-[350px] h-[50px] px-5 font-rajdhani bg-red text-white font-bold" type="submit">INICIAR SESIÓN</button>
                    </Form>
                )
            }
        </Formik>

    );

};

export default LoginForm;