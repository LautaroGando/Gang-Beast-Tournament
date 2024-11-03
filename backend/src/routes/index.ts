import { Router } from "express";
import userRouter from "./User.Routes";
import tournamentRouter from "./Tournament.Routes";

const router: Router = Router();

router.use('/users', userRouter);
router.use('/tournaments', tournamentRouter);

export default router;