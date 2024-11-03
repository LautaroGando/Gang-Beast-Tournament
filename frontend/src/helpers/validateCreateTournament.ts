import { fetchGetAllTournaments } from "@/services/fetchGetAllTournaments";

export interface ICreateTournament {
    name: string;
    duration: string;
};

interface IError {
    name?: string;
    duration?: string;
};

export const validateCreateTournament = async (input: ICreateTournament) => {

    const errors: IError = {};

    const tournaments = await fetchGetAllTournaments();

    if (!input.name) errors.name = 'El campo no puede estar vacío.';

    if (+input.duration < 1) errors.duration = 'La duración del torneo no puede ser menor a 1 día.';

    for await (const tournament of tournaments) {

        if (input.name.toLowerCase() === tournament.name.toLowerCase()) errors.name = 'El nombre del torneo ya existe.'

    };

    return errors;

};