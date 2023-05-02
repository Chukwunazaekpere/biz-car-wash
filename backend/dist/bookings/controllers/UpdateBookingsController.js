"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { Bookings } = models_1.default;
const date_fran_1 = require("date-fran");
const userActivities_1 = require("../../helpers/userActivities");
const UpdateBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t UpdateBookingController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    try {
        const bookingId = req.params.bookingId;
        const bookingDetails = yield Bookings.findById(bookingId);
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        errorMessage = "Unrecognised booking details";
        if (bookingDetails) {
            statusCode = 200;
            yield Promise.all([
                Bookings.findByIdAndUpdate(Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), updatedBy: req.user._id, stringDate: (0, date_fran_1.todaysDate)().toDateString() })),
                (0, userActivities_1.logUserActivity)(adminUser, `Booking details was successfully updated`, req)
            ]);
            return res.status(statusCode).json({
                status: "Success",
                message: `Booking details was successfully updated`
            });
        }
        throw new Error(errorMessage);
    }
    catch (error) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
});
exports.default = UpdateBookingController;
