import { NextFunction, Request, Response } from "express";
import { UserTournament } from "../entities/UserTournament";
import { UserTournamentRepository } from "../repositories/UserTournament.Repository";

export const checkRemovePoints = async (req: Request, res: Response, next: NextFunction) => {

    const { userId, tournamentId, points } = req.body;

    if (!userId || !points || !tournamentId) return next({
        statusCode: 400,
        message: 'Faltan datos.',
    });

    try {

        const userTournament: UserTournament = await UserTournamentRepository.findTournamentIdAndUserId(userId, tournamentId);

        if (userTournament.tournament === null) return next({
            statusCode: 400,
            message: 'Error al asignar puntos, el usuario no esta participando de ningún torneo.',
        });

        if (userTournament.points <= 0) return next({
            statusCode: 400,
            message: 'Error al eliminar puntos, el usuario no puede tener menos de cero puntos.',
        });

    } catch (error) {

        return next({
            statusCode: 400,
            message: 'Error al verificar puntos.',
        });

    };

    next();

};