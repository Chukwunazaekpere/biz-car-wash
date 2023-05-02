import { Request, Response } from "express";
import bookingsModel from "../models";
import { logUserActivity } from "../../helpers/userActivities";
const { Bookings } = bookingsModel;


const DeleteBookingController = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Promise.all([
            Bookings.findByIdAndDelete(id, {useFindAndModify: false}),
            logUserActivity(req.user, `Deleted booking`, req)
        ]);
        return res.status(200).json({
            status: "Success",
            message: `Booking was deleted successfully.`,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default DeleteBookingController;