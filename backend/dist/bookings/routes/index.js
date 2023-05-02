"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../../helpers/authService");
const controllers_1 = __importDefault(require("../controllers"));
const bookingsRouter = (0, express_1.Router)();
bookingsRouter.use(authService_1.authenticate);
bookingsRouter.use(authService_1.isLoggedIn);
bookingsRouter.get("/", controllers_1.default.AllBookingsController);
bookingsRouter.post("/new-booking", controllers_1.default.CreateBookingController);
bookingsRouter.get("/modify-booking", controllers_1.default.UpdateBookingController);
bookingsRouter.get("/remove-booking", controllers_1.default.DeleteBookingController);
exports.default = bookingsRouter;
