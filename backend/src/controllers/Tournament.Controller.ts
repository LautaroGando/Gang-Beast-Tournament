import { Request, Response } from "express";
import checkAsync from "../utils/checkAsync";
import { Tournament } from "../entities/Tournament";
import { activeTournamentService, createTournamentService, deleteTournamentService, finalizeTournamentService, getAllTournamentsService, getTournamentByIdService } from "../services/Tournament.Service";

const getAllTournaments = async (req: Request, res: Response) => {

    const tournaments: Tournament[] = await getAllTournamentsService();

    res.status(200).json(tournaments);

};

const getTournamentById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const tournament: Tournament = await getTournamentByIdService(+id);

    res.status(200).json(tournament);

};

const createTournament = async (req: Request, res: Response) => {

    const { name, duration } = req.body;

    const newTournament: Tournament = await createTournamentService({ name, duration });

    res.status(201).json(newTournament);

};

const activeTournament = async (req: Request, res: Response) => {

    const { id } = req.body;

    await activeTournamentService(id);

    res.status(200).json({
        message: '¡Torneo activado!',
    });

};

const finalizeTournament = async (req: Request, res: Response) => {

    const { id } = req.body;

    await finalizeTournamentService(id);

    res.status(200).json({
        message: '¡Torneo finalizado!',
    });

};

const deleteTournament = async (req: Request, res: Response) => {

    const { id } = req.body;

    await deleteTournamentService(id);

    res.status(200).json({
        message: '¡Torneo eliminado!',
    });

};

export const controllers = {
    getAllTournaments: checkAsync(getAllTournaments),
    getTournamentById: checkAsync(getTournamentById),
    createTournament: checkAsync(createTournament),
    finalizeTournament: checkAsync(finalizeTournament),
    deleteTournament: checkAsync(deleteTournament),
    activeTournament: checkAsync(activeTournament),
};