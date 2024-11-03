import { NextFunction, Request, Response } from "express";

export const checkCreateTournament = (req: Request, res: Response, next: NextFunction) => {

    const { name, duration } = req.body;

    if (duration < 1) return next({
        statusCode: 400,
        message: 'La duración del torneo no puede ser menor a 1 día.',
    });

    if (!name || !duration) return next({
        statusCode: 400,
        message: 'Faltan datos.',
    });

    next();

};