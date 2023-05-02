import { logUserActivity } from "../../helpers/userActivities";
import userModels from "../models";
const { Customers, Admins, Employees } = userModels;
import { Request, Response } from "express"

const DeleteUserController = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Promise.all([
            Admins.findByIdAndDelete(id, { useFindAndModify: false }),
            Customers.findByIdAndDelete(id, { useFindAndModify: false }),
            Employees.findByIdAndDelete(id, { useFindAndModify: false }),
            logUserActivity(req.user, `Deleted user`, req)
        ]);
        return res.status(200).json({
            status: "Success",
            message: `User was deleted successfully.`,
        });
    }catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export default DeleteUserController;
