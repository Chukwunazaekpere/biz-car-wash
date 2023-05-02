"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AllBookingsController_1 = __importDefault(require("./AllBookingsController"));
const CreateBookingsController_1 = __importDefault(require("./CreateBookingsController"));
const DeleteBookingsController_1 = __importDefault(require("./DeleteBookingsController"));
const UpdateBookingsController_1 = __importDefault(require("./UpdateBookingsController"));
const bookingControllers = {
    AllBookingsController: AllBookingsController_1.default,
    CreateBookingController: CreateBookingsController_1.default,
    DeleteBookingController: DeleteBookingsController_1.default,
    UpdateBookingController: UpdateBookingsController_1.default
};
exports.default = bookingControllers;
