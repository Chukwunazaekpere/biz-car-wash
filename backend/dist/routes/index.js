"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../bookings/routes"));
const routes_2 = __importDefault(require("../users/routes"));
const carWashRouters = (0, express_1.Router)();
carWashRouters.use("/bookings", routes_1.default);
carWashRouters.use("/users", routes_2.default);
exports.default = carWashRouters;
