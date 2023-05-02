"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customers_1 = __importDefault(require("./Customers"));
const Employees_1 = __importDefault(require("./Employees"));
const Users_1 = __importDefault(require("./Users"));
const UserLogs_1 = __importDefault(require("./UserLogs"));
const Users_2 = __importDefault(require("./Users"));
const userModels = {
    Users: Users_2.default,
    Admins: Users_1.default,
    Employees: Employees_1.default,
    Customers: Customers_1.default,
    UserLog: UserLogs_1.default
};
exports.default = userModels;
