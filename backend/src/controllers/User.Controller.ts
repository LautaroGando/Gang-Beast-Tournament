import { Request, Response } from "express";
import { User } from "../entities/User";
import { addPointsService, deleteUserService, getAllUsersService, getUserByIdService, inscriptionUserTournamentService, loginUserService, registerUserService, removePointsService } from "../services/User.Service";
import checkAsync from "../utils/checkAsync";
import { ILogin } from "../interfaces/ILogin";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {

    const users: User[] = await getAllUsersService();

    res.status(200).json(users);

};

const getUserById = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    const user: User = await getUserByIdService(+id);

    res.status(200).json(user);

};

const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { name, dni, phone, address, email, password } = req.body;

    const newUser: User = await registerUserService({ name, dni, phone, address }, { email, password });

    res.status(201).json(newUser);

};

const loginUser = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    const loginUser: ILogin = await loginUserService({ email, password });

    res.status(200).json(loginUser);

};

const inscriptionUserTournament = async (req: Request, res: Response): Promise<void> => {

    const { userId, tournamentId } = req.body;

    await inscriptionUserTournamentService(userId, tournamentId);

    res.status(200).json({
        message: '¡Te has inscripto exitósamente al torneo!',
    });

};

const addPoints = async (req: Request, res: Response): Promise<void> => {

    const { userId, tournamentId, points } = req.body;

    const user = await addPointsService(userId, tournamentId, points);

    res.status(200).json(user);

};

const removePoints = async (req: Request, res: Response): Promise<void> => {

    const { userId, tournamentId, points } = req.body;

    const user = await removePointsService(userId, tournamentId, points);

    res.status(200).json(user);

};

const deleteUser = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.body;

    await deleteUserService(id);

    res.status(200).json({
        message: '¡Usuario eliminado con éxito!',
    });

};

export const controllers = {
    getAllUsers: checkAsync(getAllUsers),
    getUserById: checkAsync(getUserById),
    registerUser: checkAsync(registerUser),
    loginUser: checkAsync(loginUser),
    inscriptionUserTournament: checkAsync(inscriptionUserTournament),
    addPoints: checkAsync(addPoints),
    removePoints: checkAsync(removePoints),
    deleteUser: checkAsync(deleteUser),
};