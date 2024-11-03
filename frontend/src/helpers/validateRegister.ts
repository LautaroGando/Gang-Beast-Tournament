const regex = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    dni: /^\d{7,8}$/,
    address: /^[a-zA-Z\s.]+ \d+$/,
    phone: /^(11|15)\d{8}$/,
};

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    dni: string;
    phone: string;
    address: string;
};

interface IError {
    name?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
    dni?: string;
    phone?: string;
    address?: string;
};

export const validateRegister = (input: IUserRegister) => {

    const errors: IError = {};

    if (!input.name.trim().includes(' ')) errors.name = 'El nombre completo ingresado no es válido. Asegúrate de que contenga al menos 2 palabras (por ejemplo, "Juan Pérez").';

    if (!regex.email.test(input.email)) errors.email = 'La dirección de correo ingresada no es válida. Asegúrate de que contenga un nombre de usuario, el símbolo "@" y un dominio';

    if (!regex.password.test(input.password)) errors.password = 'La contraseña ingresada no cumple con los requisitos. Debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un símbolo especial (por ejemplo, !@#$%).';

    if (!regex.password.test(input.repeatPassword) || input.repeatPassword !== input.password) errors.repeatPassword = 'Las contraseñas no coinciden o no cumple con los requisitos.';

    if (!regex.dni.test(input.dni)) errors.dni = 'El número de documento ingresado no es válido. Debe contener solo números y tener entre 7 y 8 dígitos.';

    if (!regex.address.test(input.address)) errors.address = 'La dirección ingresada no es válida. Asegúrate de que siga el formato: "Nombre de la calle" seguido de un número (por ejemplo, "Calle Ejemplo 123").';

    if (!regex.phone.test(input.phone)) errors.phone = 'El número de teléfono proporcionado no es válido. Debe comenzar con "11" o "15" y tener un total de 10 dígitos (por ejemplo, 1151234567).';

    return errors;

};