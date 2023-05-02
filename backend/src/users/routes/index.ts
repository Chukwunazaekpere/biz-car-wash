import { Router } from "express";
import { authenticate, isLoggedIn } from "../../helpers/authService";
import usersControllers from "../controllers";
const usersRouter = Router();

// usersRouter.use(authenticate);
// usersRouter.use(isLoggedIn);

usersRouter.get("/", usersControllers.AllUsersController);
usersRouter.post("/new-user", usersControllers.CreateUserController);
usersRouter.get("/modify-user", usersControllers.UpdateUserController);
usersRouter.get("/remove-user", usersControllers.DeleteUserController);
usersRouter.post("/login", usersControllers.LoginController);
usersRouter.get("/initialiser", usersControllers.SystemInitialiserController);
export default usersRouter;