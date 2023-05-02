"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../../helpers/authService");
const controllers_1 = __importDefault(require("../controllers"));
const usersRouter = (0, express_1.Router)();
usersRouter.use(authService_1.authenticate);
usersRouter.use(authService_1.isLoggedIn);
usersRouter.get("/", controllers_1.default.AllUsersController);
usersRouter.post("/new-user", controllers_1.default.CreateUserController);
usersRouter.get("/modify-user", controllers_1.default.UpdateUserController);
usersRouter.get("/remove-user", controllers_1.default.DeleteUserController);
exports.default = usersRouter;
