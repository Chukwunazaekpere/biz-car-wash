import { todaysDate } from "date-fran";
import userModels from "../models";
const { Users, Customers, Employees } = userModels;
const Admins = Users;
import { logUserActivity } from "../../helpers/userActivities";
import { Request, Response } from "express"
import { hashUserPassword } from "../../helpers/passwordManipulation";
import { userTypes } from "../models/Users";


const CreateUserController = async(req: Request, res: Response) => {
    console.log("\n\t CreateUserController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const { firstname, lastname, username, password, userType, confirmPassword } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        if (confirmPassword === password) {
            const [usersFullname, usernameExists, hashedPassword] = await Promise.all([
                Users.findOne({ name: firstname.concat(" ", lastname) }),
                Users.findOne({ userName: username }),
                hashUserPassword(password),
            ]);
            errorMessage = usersFullname ? `A user: ${firstname.concat(" ", lastname)} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                await Promise.all([
                    originalUrl.includes("admin") && userType.toLowerCase() !== "admin" ?
                    Employees.create({
                        ...req.body, 
                        userType: userTypes.Employee,
                        dateUpdated: todaysDate(), 
                        password: hashedPassword, 
                        dateCreated: todaysDate(), 
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        createdBy: req.user._id, 
                        stringDate: todaysDate().toDateString()
                    })
                    :
                    originalUrl.includes("admin") && userType.toLowerCase() === "admin" ?
                    Admins.create({
                        ...req.body, 
                        dateUpdated: todaysDate(), 
                        userType: userTypes.Admin,
                        password: hashedPassword, 
                        dateCreated: todaysDate(), 
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        createdBy: req.user._id, 
                        stringDate: todaysDate().toDateString(),
                    })
                    :
                    Customers.create({
                        ...req.body, 
                        dateUpdated: todaysDate(), 
                        password: hashedPassword, 
                        dateCreated: todaysDate(), 
                        userType: userTypes.Customer,
                        lastSeen: todaysDate(), 
                        name: firstname.concat(" ", lastname), 
                        createdBy: req.user._id, 
                        stringDate: todaysDate().toDateString()
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
    }
    catch (error: any) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
};
export default CreateUserController;
