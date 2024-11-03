import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User.Repository";

export const checkLoginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const user: User | null = await UserRepository.findOne({
        where: {
            credentials: {
                email,
            },
        },
        relations: {
            credentials: true,
        },
    });

    if (user?.credentials.email !== email) return next({
        statusCode: 400,
        message: 'Correo electrónico incorrecto.',
    });

    if (user?.credentials.password !== password) return next({
        statusCode: 400,
        message: 'Contraseña incorrecta.',
    });

    if (!email || !password) return next({
        statusCode: 400,
        message: 'Faltan datos.',
    });

    next();

};