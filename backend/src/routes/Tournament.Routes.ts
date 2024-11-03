import { Router } from "express";
import { controllers } from "../controllers/Tournament.Controller";
import { checkCreateTournament } from "../middlewares/checkCreateTournament";

const tournamentRouter: Router = Router();

tournamentRouter.get('/', controllers.getAllTournaments);
tournamentRouter.get('/:id', controllers.getTournamentById);

tournamentRouter.post('/create', checkCreateTournament, controllers.createTournament);

tournamentRouter.put('/active', controllers.activeTournament);
tournamentRouter.put('/finalize', controllers.finalizeTournament);

tournamentRouter.delete('/delete', controllers.deleteTournament);

export default tournamentRouter;