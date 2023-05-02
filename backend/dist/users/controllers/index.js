"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AllUsersController_1 = __importDefault(require("./AllUsersController"));
const CreateUserController_1 = __importDefault(require("./CreateUserController"));
const DeleteUserController_1 = __importDefault(require("./DeleteUserController"));
const UpdateUserController_1 = __importDefault(require("./UpdateUserController"));
const LoginController_1 = __importDefault(require("./LoginController"));
const SystemInitialiserController_1 = __importDefault(require("./SystemInitialiserController"));
const userControllers = {
    AllUsersController: AllUsersController_1.default,
    CreateUserController: CreateUserController_1.default,
    DeleteUserController: DeleteUserController_1.default,
    UpdateUserController: UpdateUserController_1.default,
    LoginController: LoginController_1.default,
    SystemInitialiserController: SystemInitialiserController_1.default
};
exports.default = userControllers;
