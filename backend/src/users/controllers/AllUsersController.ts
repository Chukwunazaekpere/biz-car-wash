import { Request, Response } from "express";
import userModels from "../models";
const { Customers, Employees } = userModels;


const AllUsersController = async(req: Request, res: Response) => {
    // console.log("\n\t AllUsersController...", req.body)
    try {

        const originalUrl = req.originalUrl;
        const requiredUsers = originalUrl.includes('employees') ? await Employees.find() : await Customers.find();
        const utils = {}as any;
        const actualData = []as any[];
        for(let user of requiredUsers){
            const { createdBy, _doc } = user as any;
            // const userDetails = await Users.findById(createdBy);
            let userDetails: string | undefined = utils[String(createdBy)];
            if(!userDetails){
                const user = await Customers.findById(createdBy) || await Employees.findById(createdBy);
                userDetails = user ? user.name : "--";
                utils[String(createdBy)] = userDetails;
            };
            const data = {
                ..._doc as any,
                lastSeen: user.lastSeen ? user.lastSeen.toDateString() : "--",
                createdBy: userDetails
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



export default AllUsersController;