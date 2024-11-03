import { ICreateTournament, validateCreateTournament } from "@/helpers/validateCreateTournament";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import { IPropsModalCreateTournament } from "./types";
import { fetchCreateTournament } from "@/services/fetchCreateTournament";

export const ModalCreateTournament: React.FC<IPropsModalCreateTournament> = ({ modal, handleCloseModal }: IPropsModalCreateTournament): React.ReactElement => {

    return (

        <>
            {
                modal && (
                    <Formik
                        initialValues={{
                            name: '',
                            duration: '',
                        }}
                        validate={validateCreateTournament}
                        onSubmit={async (tournamentData, { resetForm }) => {

                            await fetchCreateTournament(tournamentData);

                            resetForm();

                            handleCloseModal();

                        }}
                    >
                        {
                            ({ errors, touched }: FormikProps<ICreateTournament>) => (
                                <div className="fixed top-0 left-0 w-full h-full bg-[#000000aa] flex justify-center items-center">
                                    <Form className="w-[500px] bg-white p-10 flex flex-col items-center gap-10">
                                        <div className="flex flex-col w-[350px] gap-3 relative">
                                            <Field className={`input border-black ${errors.name && touched.name ? 'border-red' : !errors.name && touched.name ? 'border-green' : ''}`} type='text' name='name' placeholder='Nombre del torneo' />
                                            <span className="inputError"><ErrorMessage name="name" /></span>
                                        </div>
                                        <div className="flex flex-col w-[350px] gap-3 relative">
                                            <Field className={`input border-black ${errors.duration && touched.duration ? 'border-red' : !errors.duration && touched.duration ? 'border-green' : ''}`} type='number' name='duration' placeholder='Duración del torneo' />
                                            <span className="inputError"><ErrorMessage name="duration" /></span>
                                        </div>
                                        <div className="text-white font-rajdhani font-bold flex justify-between w-full">
                                            <button onClick={handleCloseModal} className="bg-red w-[200px] h-[50px] transition-all hover:bg-[#ff5d48]" type="button">CANCELAR</button>
                                            <button className="bg-green w-[200px] h-[50px] transition-all hover:bg-[#69c161]" type="submit">CREAR</button>
                                        </div>
                                    </Form>
                                </div>
                            )
                        }
                    </Formik>
                )
            }
        </>

    );

};

export default ModalCreateTournament;