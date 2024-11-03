"use client";

import { IUserRegister, validateRegister } from "@/helpers/validateRegister";
import { fetchRegisterUser } from "@/services/fetchRegisterUser";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

export const RegisterForm: React.FC = (): React.ReactElement => {

    const router = useRouter();

    return (

        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
                dni: '',
                phone: '',
                address: '',
            }}
            validate={validateRegister}
            onSubmit={async (userData, { resetForm }) => {

                const user = await fetchRegisterUser(userData);

                resetForm();

                if (user.name) router.push('/login');

            }}
        >
            {
                ({ errors, touched }: FormikProps<IUserRegister>) => (
                    <Form className="flex gap-10">
                        <div className="flex flex-col gap-16">
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.name && touched.name ? 'border-red' : !errors.name && touched.name ? 'border-green' : ''}`} type='text' name='name' placeholder='Nombre completo' />
                                <span className="inputError"><ErrorMessage name="name" /></span>
                            </div>
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.email && touched.email ? 'border-red' : !errors.email && touched.email ? 'border-green' : ''}`} type='email' name='email' placeholder='Correo electrónico' />
                                <span className="inputError"><ErrorMessage name="email" /></span>
                            </div>
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.password && touched.password ? 'border-red' : !errors.password && touched.password ? 'border-green' : ''}`} type='password' name='password' placeholder='Contraseña' />
                                <span className="inputError"><ErrorMessage name="password" /></span>
                            </div>
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.repeatPassword && touched.repeatPassword ? 'border-red' : !errors.repeatPassword && touched.repeatPassword ? 'border-green' : ''}`} type='password' name='repeatPassword' placeholder='Repetir contraseña' />
                                <span className="inputError"><ErrorMessage name="repeatPassword" /></span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-16">
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.dni && touched.dni ? 'border-red' : !errors.dni && touched.dni ? 'border-green' : ''}`} type='number' name='dni' placeholder='Número de documento' />
                                <span className="inputError"><ErrorMessage name="dni" /></span>
                            </div>
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.phone && touched.phone ? 'border-red' : !errors.phone && touched.phone ? 'border-green' : ''}`} type='number' name='phone' placeholder='Teléfono' />
                                <span className="inputError"><ErrorMessage name="phone" /></span>
                            </div>
                            <div className="flex flex-col w-[350px] gap-3 relative">
                                <Field className={`input border-black ${errors.address && touched.address ? 'border-red' : !errors.address && touched.address ? 'border-green' : ''}`} type='text' name='address' placeholder='Dirección' />
                                <span className="inputError"><ErrorMessage name="address" /></span>
                            </div>
                            <button className="w-[350px] h-[50px] px-5 font-rajdhani bg-red text-white font-bold" type="submit">REGISTRARSE</button>
                        </div>
                    </Form>
                )
            }
        </Formik>

    );

};

export default RegisterForm;