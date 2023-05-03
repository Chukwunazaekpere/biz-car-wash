import { Request } from "express"
import usersModels from "../users/models";
import { getMonth, todaysDate } from "date-fran";

const { UserLog, Users } = usersModels;


export const logUserActivity = async(userData: any, operation: string, req: Request) => {
    try {
        const { firstname, lastname, userType } = userData;
        const [user] = await Promise.all([
            Users.findOne({firstname} && {lastname})
        ]);
        const savingname = `${firstname} ${lastname}`
        if(user){
            await UserLog.create({
                userFullname: savingname,
                userType: userType,
                operation,
                stringDate: todaysDate().toDateString(),
                monthRecord: getMonth(todaysDate()),
                yearRecord: todaysDate().getFullYear(),
                dateCreated: todaysDate()
            });
        }
    } catch (error) {
        console.log("\n\t logUserActivity: ", error);
    }
};

export const generateUsernameFromRequest = (user: any): string => {
    try {
        const { firstname, lastname } = user;
        const fullname = (firstname as string).concat(" ", lastname);
        return fullname;
    } catch (error) {
        return ""
    }
};
