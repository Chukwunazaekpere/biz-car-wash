import { todaysDate } from "date-fran";
import userModels from "../models";
const { Users, Customers, Employees } = userModels;
const Admins = Users;
import { logUserActivity } from "../../helpers/userActivities";
import { Request, Response } from "express"
import { hashUserPassword } from "../../helpers/passwordManipulation";
import { userTypes } from "../models/Users";


const UpdateUserController = async(req: Request, res: Response) => {
    console.log("\n\t UpdateUserController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const usersId = req.params.usersId;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        const { firstname, lastname, username, password, email, confirmPassword } = req.body;
        if (confirmPassword === password) {
            const [usersFullname, usernameExists, hashedPassword] = await Promise.all([
                Users.findOne({ name: firstname.concat(" ", lastname) }),
                Users.findOne({ email }),
                hashUserPassword(password),
            ]);
            errorMessage = usersFullname ? `A user: ${firstname.concat(" ", lastname)} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                await Promise.all([
                    originalUrl.includes("/admin/employee") ?
                    Employees.findByIdAndUpdate(usersId, {
                        ...req.body, 
                        dateUpdated: todaysDate(), 
                        password: hashedPassword, 
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        updatedBy: req._id, 
                    })
                    :
                    originalUrl.includes("admin") ?
                    Admins.findByIdAndUpdate(usersId, {
                        ...req.body, 
                        dateUpdated: todaysDate(), 
                        password: hashedPassword, 
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        updatedBy: req._id, 
                    })
                    :
                    Customers.findByIdAndUpdate(usersId, {
                        ...req.body, 
                        dateUpdated: todaysDate(), 
                        password: hashedPassword, 
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        updatedBy: req._id, 
                    }),
                    logUserActivity(adminUser, `Registered a new user: ${firstname} ${lastname}`, req)
                ]);
                return res.status(201).json({
                    status: "Success",
                    message: `${firstname} ${lastname} was successfully registered.`,
                });
            };
        }
        throw new Error(errorMessage);
    }catch (error: any) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
};
export default UpdateUserController;
