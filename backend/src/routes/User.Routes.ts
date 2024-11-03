import { Router } from "express";
import { controllers } from "../controllers/User.Controller";
import { checkRegisterUser } from "../middlewares/checkRegisterUser";
import { checkLoginUser } from "../middlewares/checkLoginUser";
import { checkAddPoints } from "../middlewares/checkAddPoints";
import { checkRemovePoints } from "../middlewares/checkRemovePoints";

const userRouter: Router =  Router();

userRouter.get('/', controllers.getAllUsers);
userRouter.get('/:id', controllers.getUserById);

userRouter.post('/register', checkRegisterUser, controllers.registerUser);
userRouter.post('/login', checkLoginUser, controllers.loginUser);
userRouter.post('/inscription', controllers.inscriptionUserTournament);

userRouter.patch('/addPoints', checkAddPoints, controllers.addPoints);
userRouter.patch('/removePoints', checkRemovePoints, controllers.removePoints);

userRouter.put('/update', );

userRouter.delete('/delete', controllers.deleteUser);

export default userRouter;