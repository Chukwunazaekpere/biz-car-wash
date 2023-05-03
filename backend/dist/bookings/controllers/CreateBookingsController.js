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
const date_fran_1 = require("date-fran");
const models_1 = __importDefault(require("../models"));
const userActivities_1 = require("../../helpers/userActivities");
const Bookings_1 = require("../models/Bookings");
const Customers_1 = __importDefault(require("../../users/models/Customers"));
const Employees_1 = __importDefault(require("../../users/models/Employees"));
const { Bookings } = models_1.default;
const CreateBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t CreateBookingController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    try {
        const { paymentMethod, date, time } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        const user = (yield Customers_1.default.findById(req._id)) || (yield Employees_1.default.findById(req._id)) || (yield Customers_1.default.findById(req._id));
        errorMessage = "Booking already exists.";
        if (user) {
            statusCode = 0;
            yield Promise.all([
                Bookings.create(Object.assign(Object.assign({}, req.body), { customerId: user._id, payment: req.body['paymentMethod'], dateUpdated: (0, date_fran_1.todaysDate)(), dateCreated: (0, date_fran_1.todaysDate)(), createdBy: req._id, date: (0, date_fran_1.givenDateAndCurrentTime)(date), status: Bookings_1.bookingStatus.Pending, stringDate: (0, date_fran_1.todaysDate)().toDateString() })),
                (0, userActivities_1.logUserActivity)(user, `Registered a new booking.`, req)
            ]);
            return res.status(201).json({
                status: "Success",
                message: `Boking was successfully registered.`,
            });
        }
        ;
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
exports.default = CreateBookingController;
