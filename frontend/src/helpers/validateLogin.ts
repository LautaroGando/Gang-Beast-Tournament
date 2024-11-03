export interface IUserLogin {
    email: string;
    password: string;
};

export interface IError {
    email ?: string;
    password?: string;
};

export const validateLogin = (input: IUserLogin) => {

    const errors: IError = {};

    if (input.email === '') errors.email = 'Este campo no puede estar vacío.';

    if (input.password === '') errors.password = 'Este campo no puede estar vacío.';

    return errors;

};