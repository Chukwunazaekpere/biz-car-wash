import { Request, Response } from "express"
import userModels from "../models";
import { decryptPassword } from "../../helpers/passwordManipulation";
import { generateAccessToken } from "../../helpers/accessTokens";
import { todaysDate } from "date-fran";
import { logUserActivity } from "../../helpers/userActivities";
const { Users } = userModels;

const LoginController = async(req: Request, res: Response) => {
    // console.log("\n\t LoginController: ", req.body);
    const { email, password } = req.body;
    let statusCode = 400
    // console.log("\n\t Request-body-user-all: ", await Users.find())
    try{
        const user = await Users.findOne({ email });
        let errorMessage = "Invalid user credentials"
        if (user) {
            const passwordPass = await decryptPassword(password, user.password);
            let statusCode = 403;
            if (passwordPass) {
                const payLoad = {
                    user: {
                        id: user.id,
                    },
                };
                const accessToken = await generateAccessToken(payLoad);
                await Promise.all([
                    Users.findByIdAndUpdate(user._id, {
                        lastSeen: todaysDate(),
                        dateUpdated: todaysDate()
                    }, { useFindAndModify: false }),
                    logUserActivity(user, `Logged in`, req)
                ]);
                //  to send token as cookie to the browser  use the code below
                res.cookie("accessToken", accessToken, {
                    expires: new Date(Date.now() + +`${process.env.NODE_ENV == "development" ? 2 : 90}` * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https', //used only in production
                });
                //end of code to send token as cookie
                res.locals.user = user;
                return res.status(200).json({
                    status: "Success",
                    message: "Login successful",
                    data: {
                        accessToken,
                        user,
                    },
                });
            }
        };  
    }catch (error:any) {
        console.log("\n\t Login error: ", error.message);
        return res.status(statusCode).json({
            status: "Error",
            message: error.message
        });
    }
};

export default LoginController;


