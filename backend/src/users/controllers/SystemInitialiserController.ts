import { todaysDate } from "date-fran";
import Users from "../models/Users";
const Admins = Users;
import { logUserActivity } from "../../helpers/userActivities";
import { Request, Response } from "express"
import { hashUserPassword } from "../../helpers/passwordManipulation";


const SystemInitialiserController = async(req: Request, res: Response) => {
    console.log("\n\t SystemInitialiserController---", "\n");
    console.log("\n\t Creating Defaults...");
    try {
        const initializer = {
            firstname: String(process.env.COMPANY_DEVELOPER_FIRSTNAME),
            lastname: String(process.env.COMPANY_DEVELOPER_LASTNAME),
            username: process.env.COMPANY_DEVELOPER_FIRSTNAME,
            email: process.env.COMPANY_DEVELOPER_EMAIL,
            phone: process.env.COMPANY_DEVELOPER_PHONE,
            userType: process.env.COMPANY_DEVELOPER_USER_TYPE
        };
        const [defaultUser, hashedPassword] = await Promise.all([
            Admins.findOne({
                firstname: initializer.firstname,
                lastname: initializer.lastname,
                email: initializer.email,
            }),
            hashUserPassword(process.env.COMPANY_PASSWORD),
        ]);
        // console.log("\n\t Creating Defaults-2...", defaultUser);
        if (!defaultUser) {
            await Promise.all([
                Admins.create({
                    email: initializer.email,
                    username: initializer.username,
                    dateUpdated: todaysDate(),
                    password: hashedPassword,
                    // userType: initializer.userType,
                    phone: initializer.phone,
                    dateCreated: todaysDate(),
                    lastSeen: todaysDate(),
                    name: initializer.firstname.concat(" ", initializer.lastname),
                    stringDate: todaysDate().toDateString(),
                }),
                logUserActivity(initializer, `System initialization`, req)
            ]);
            return true;
        }
        throw new Error("Users exist.");
    }
    catch (error: any) {
        console.log(error);
        return error.message;
    }
};
export default SystemInitialiserController;
