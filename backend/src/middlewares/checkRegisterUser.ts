import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User.Repository";

const regex = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    dni: /^\d{7,8}$/,
    address: /^[a-zA-Z\s.]+ \d+$/,
    phone: /^(11|15)\d{8}$/,
};

export const checkRegisterUser = async (req: Request, res: Response, next: NextFunction) => {

    const { name, dni, phone, address, email, password } = req.body;

    const users: User[] = await UserRepository.find({
        relations: {
            credentials: true,
        },
    });

    for await (const user of users) {

        if (user.credentials.email === email) return next({
            statusCode: 400,
            message: 'El correo electrónico ya se encuentra registrado.',
        });

        if (user.dni === dni) return next({
            statusCode: 400,
            message: 'El número de documento ya se encuentra registrado.',
        });

        if (user.phone === phone) return next({
            statusCode: 400,
            message: 'El número de teléfono ya se encuentra registrado.',
        });

    };

    if (!name || !dni || !phone || !address || !email || !password) return next({
        statusCode: 400,
        message: 'Faltan datos.',
    });

    if (!name.trim().includes(' ')) return next({
        statusCode: 400,
        message: 'El nombre completo ingresado no es válido. Asegúrate de que contenga al menos 2 palabras (por ejemplo, "Juan Pérez").',
    });

    if (!regex.dni.test(dni)) return next({
        statusCode: 400,
        message: 'El número de documento ingresado no es válido. Debe contener solo números y tener entre 7 y 8 dígitos.',
    });

    if (!regex.phone.test(phone)) return next({
        statusCode: 400,
        message: 'El número de teléfono proporcionado no es válido. Debe comenzar con "11" o "15" y tener un total de 10 dígitos (por ejemplo, 1151234567).',
    });

    if (!regex.address.test(address)) return next({
        statusCode: 400,
        message: 'La dirección ingresada no es válida. Asegúrate de que siga el formato: "Nombre de la calle" seguido de un número (por ejemplo, "Calle Ejemplo 123").',
    });

    if (!regex.email.test(email)) return next({
        statusCode: 400,
        message: 'La dirección de correo ingresada no es válida. Asegúrate de que contenga un nombre de usuario, el símbolo "@" y un dominio',
    });

    if (!regex.password.test(password)) return next({
        statusCode: 400,
        message: 'La contraseña ingresada no cumple con los requisitos. Debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un símbolo especial (por ejemplo, !@#$%).',
    });

    next();

};