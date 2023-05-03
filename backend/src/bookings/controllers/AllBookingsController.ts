import { Request, Response } from "express";
import bookingsModel from "../models";
const { Bookings } = bookingsModel;
import userModels from "../../users/models";
const { Customers } = userModels;


const AllBookingsController = async(req: Request, res: Response) => {
    // console.log("\n\t AllBookingsController...", req.body)
    try {

        const bookings = await Bookings.find().sort({dateCreated: "desc"}).select("-__v").select("-customerId").select("-createdBy");
        const actualData = [] as any[];
        const utils = {}as any;
        for(let user of bookings){
            const { createdBy, _doc } = user as any;
            let customerDetails: string | undefined = utils[String(createdBy)];
            if(!customerDetails){
                const user = await Customers.findById(createdBy);
                customerDetails = user ? user.name : "--";
                utils[String(createdBy)] = customerDetails;
            };
            const data = {
                ..._doc as any,
                createdBy: customerDetails
            };
            actualData.push(data);
        };
        return res.status(200).json({
            status: "Success",
            data: actualData
        });
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};



export default AllBookingsController;