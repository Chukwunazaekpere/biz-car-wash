"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const usersRouter = (0, express_1.Router)();
// usersRouter.use(authenticate);
// usersRouter.use(isLoggedIn);
usersRouter.get("/", controllers_1.default.AllUsersController);
usersRouter.post("/register", controllers_1.default.CreateUserController);
usersRouter.get("/modify-user", controllers_1.default.UpdateUserController);
usersRouter.get("/remove-user", controllers_1.default.DeleteUserController);
usersRouter.post("/login", controllers_1.default.LoginController);
usersRouter.get("/initialiser", controllers_1.default.SystemInitialiserController);
exports.default = usersRouter;
