import { Request, Response } from "express";

import bookingsModel from "../models";
const { Bookings } = bookingsModel;

import { todaysDate } from "date-fran";
import { logUserActivity } from "../../helpers/userActivities";


const UpdateBookingController = async(req: Request, res: Response) => {
    console.log("\n\t UpdateBookingController...", req.body)
    const adminUser = req.user;
    let statusCode = 403;
    try {
        const bookingId = req.params.bookingId;
        const bookingDetails = await Bookings.findById(bookingId);
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        errorMessage = "Unrecognised booking details"
        if(bookingDetails){
            statusCode = 200;
            await Promise.all([
                Bookings.findByIdAndUpdate({
                    ...req.body,
                    dateUpdated: todaysDate(),
                    updatedBy: req.user._id,
                    stringDate: todaysDate().toDateString(),
                }),
                logUserActivity(adminUser, `Booking details was successfully updated`, req)
            ]);
            return res.status(statusCode).json({
                status: "Success",
                message: `Booking details was successfully updated`
            });
        }
        throw new Error(errorMessage);
    } catch (error: any) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
};


export default UpdateBookingController;