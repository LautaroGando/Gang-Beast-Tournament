import { NextFunction, Request, Response } from "express";
import { UserTournament } from "../entities/UserTournament";
import { UserTournamentRepository } from "../repositories/UserTournament.Repository";

export const checkAddPoints = async (req: Request, res: Response, next: NextFunction) => {

    const { userId, tournamentId, points } = req.body;

    if (!userId || !points) return next({
        statusCode: 400,
        message: 'Faltan datos.',
    });

    try {

        const userTournament: UserTournament = await UserTournamentRepository.findTournamentIdAndUserId(userId, tournamentId);

        if (userTournament.tournament === null) return next({
            statusCode: 400,
            message: 'Error al asignar puntos, el usuario no esta participando de ningún torneo.',
        });

    } catch (error) {

        return next({
            statusCode: 400,
            message: 'Error al verificar puntos.',
        });

    };

    next();

};