import { Request, Response } from "express";
import { ObjectId} from "mongoose";

import { givenDateAndCurrentTime, todaysDate } from "date-fran";
import bookingsModel from "../models";
import { logUserActivity } from "../../helpers/userActivities";
import { bookingStatus } from "../models/Bookings";
import Customers from "../../users/models/Customers";
import Employees from "../../users/models/Employees";
import User from "../../users/models/Users";
const { Bookings } = bookingsModel;


const CreateBookingController = async(req: Request, res: Response) => {
    console.log("\n\t CreateBookingController...", req.body)
    const adminUser = req.user;
    let statusCode = 403;
    try {
        const { paymentMethod, date, time } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        const user = await Customers.findById(req._id) || await Employees.findById(req._id) || await Customers.findById(req._id);
        errorMessage = "Booking already exists."
        if (user) {
            statusCode = 0;
            await Promise.all([
                Bookings.create({
                    ...req.body,
                    customerId: user._id,
                    payment: req.body['paymentMethod'],
                    dateUpdated: todaysDate(),
                    dateCreated: todaysDate(),
                    createdBy: req._id,
                    date: givenDateAndCurrentTime(date),
                    status: bookingStatus.Pending,
                    stringDate: todaysDate().toDateString(),
                }),
                logUserActivity(user, `Registered a new booking.`, req)
            ]);
            return res.status(201).json({
                status: "Success",
                message: `Boking was successfully registered.`,
            });
        };
        throw new Error(errorMessage);
    } catch (error: any) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
};


export default CreateBookingController;