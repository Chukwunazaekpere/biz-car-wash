import { Request, Response } from "express";


import { todaysDate } from "date-fran";
import bookingsModel from "../models";
import { logUserActivity } from "../../helpers/userActivities";
const { Bookings } = bookingsModel;


const CreateBookingController = async(req: Request, res: Response) => {
    console.log("\n\t CreateBookingController...", req.body)
    const adminUser = req.user;
    let statusCode = 403;
    try {
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        const bookingExists = await Bookings.findOne({});
        errorMessage = "Booking already exists."
        if (!bookingExists) {
            statusCode = 0;
            await Promise.all([
                Bookings.create({
                    ...req.body,
                    dateUpdated: todaysDate(),
                    dateCreated: todaysDate(),
                    createdBy: req.user._id,
                    stringDate: todaysDate().toDateString(),
                }),
                logUserActivity(adminUser, `Registered a new booking.`, req)
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