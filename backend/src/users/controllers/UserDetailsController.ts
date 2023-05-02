import { Request, Response } from "express";
import userModels from "../models";
const { Customers, Employees, Admins } = userModels;

const UserDetailsController = async(req: Request, res: Response) =>  {
    console.log("\n\t UserDetailsController...");
    try {
        const { usersId } = req.params;
        const userExists = await Admins.findById(usersId) || await Customers.findById(usersId) || await Employees.findById(usersId);
        // console.log("\n\t UserDetailsController-licenseDetails: ", userExists, licenseDetails)
        if (userExists) {
            return res.status(200).json({
                status: "Success",
                data: userExists,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Network error"
        });
    }
};
export default UserDetailsController;
