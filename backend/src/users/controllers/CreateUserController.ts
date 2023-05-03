import { todaysDate } from "date-fran";
import userModels from "../models";
const { Users, Customers, Employees } = userModels;
const Admins = Users;
import { logUserActivity } from "../../helpers/userActivities";
import { Request, Response } from "express"
import { hashUserPassword } from "../../helpers/passwordManipulation";
import { userTypes } from "../models/Users";
import { generateAccessToken } from "../../helpers/accessTokens";


const CreateUserController = async(req: Request, res: Response) => {
    console.log("\n\t CreateUserController...", req.body);
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const { firstname, lastname, username, password, userType, confirmPassword } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
      
        if (confirmPassword === password) {
            const name = firstname.concat(" ", lastname);
            const [usersFullname, usernameExists, hashedPassword] = await Promise.all([
                Users.findOne({name}),
                Users.findOne({ username }),
                hashUserPassword(password),
            ]);
            errorMessage = usersFullname ? `A user: ${name} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                const name = firstname.concat(" ", lastname);
                const user = originalUrl.includes("admin") && userType.toLowerCase() !== "admin" ?
                await Employees.create({
                    ...req.body, 
                    userType: userTypes.Employee,
                    dateUpdated: todaysDate(), 
                    password: hashedPassword, 
                    dateCreated: todaysDate(), 
                    lastSeen: todaysDate(), 
                    name, 
                    stringDate: todaysDate().toDateString()
                })
                :
                originalUrl.includes("admin") && userType.toLowerCase() === "admin" ?
                await Admins.create({
                    ...req.body, 
                    dateUpdated: todaysDate(), 
                    userType: userTypes.Admin,
                    password: hashedPassword, 
                    dateCreated: todaysDate(), 
                    lastSeen: todaysDate(), 
                    name, 
                    stringDate: todaysDate().toDateString(),
                })
                :
                await Customers.create({
                    ...req.body, 
                    dateUpdated: todaysDate(), 
                    password: hashedPassword, 
                    dateCreated: todaysDate(), 
                    userType: userTypes.Customer,
                    lastSeen: todaysDate(), 
                    name, 
                    stringDate: todaysDate().toDateString()
                });
                const payLoad = {
                    user: {
                        id: user._id,
                    },
                };
                const [accessToken, log] = await Promise.all([
                    generateAccessToken(payLoad),
                    logUserActivity({...req.body, userType: user.userType}, `Registered a new user: ${firstname} ${lastname}`, req)
                ]) 
                // console.log("\n\t CreateUserController-userDetails...",userDetails);
                return res.status(201).json({
                    status: "Success",
                    message: `${firstname} ${lastname} was successfully registered.`,
                    data: {
                        accessToken,
                        user: {
                            // ...user,
                            name,
                            _id: user._id,
                        },
                    },
                });
            };
        };
        // console.log("\n\t CreateUserController-errorMessage...",req.user);
        // console.log("\n\t CreateUserController-errorMessage...", errorMessage);
        // console.log("\n\t CreateUserController-errorMessage...",req.user._id);
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
