import dotenv from "dotenv";
import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
dotenv.config({path: "./backend/src/config/.env"});

import usersModels from "../users/models";
const { Customers, Employees, Admins } = usersModels;

const JWT_SECRET = process.env.JWT_SECRET as string;

import APIErrorInterface from "../types/apiError";
const apiError = {} as APIErrorInterface;

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    // console.log("\n\t authenticate middlewware-user: ", req.headers);
    try {
        //more robust implementation
        let accessToken;
        //check if token was sent along with the request and also that the user 
        // used the right authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            accessToken = req.headers.authorization.split(" ")[1];
            console.log("\n\t Server-accessToken: ", accessToken);
            console.log("\n\t Server-req.cookies.accessToken: ", req.cookies);
        } else if (req.cookies && req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        }
        //check if the access token actually exist
        if(!accessToken) return `Acesss denied, No authorization token`;
        //decode the acesss token
        const decodedToken = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;
        console.log("\n\t Server-decodedToken: ", decodedToken);
        const user = await Admins.findById(decodedToken.user.id) || await Employees.findById(decodedToken.user.id) || await Customers.findById(decodedToken.user.id);
        console.log("\n\t Server-user: ", user);
        if(user){
            // Check license details
            // console.log("\n\t Server-user.name: ", user.name);
            req._id = String(user._id);
            res.locals.user = decodedToken.user.id;
            return next();
        };
        throw new Error("Access denied.");
    } catch (error: any) {
        console.log(error);
        if (error.message.includes("jwt expired")) {
            return `Token expired. Please login again.`
        }
        return `Invalid accessToken`;
    }
};


/**
 * A middleware for validating that a user is logged-in,
 * before being allowed to perform an operation
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    let accessToken: string;
    // console.log("\n\t Users in isLoggedIn...", req.cookies);
    if (req.cookies.accessToken) {
        try {
            accessToken = req.cookies.accessToken;
            //decode the acesss token
            const decodedToken = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;
            //check if user exist just to be sure the user had not been deleted
            const user = await Admins.findById(decodedToken.user.id) || await Employees.findById(decodedToken.user.id) || await Customers.findById(decodedToken.user.id);
            if(user){
                // (req.user as any)._id = decodedToken.user.id;
                // req.user.userType = user.userType
                // console.log("\n\t Users in isLoggedIn...", req.cookies);
                req._id = String(user._id);
                return next();
            };
            throw new Error("Unrecognised user.")
        } catch (error) {
            return next()
        }
    }
    return next()
};

export const authorize = (userType: string[]) => {
    // console.log("\n\t Request in authorize: ",);
    return(req: Request, res: Response, next: NextFunction) => {
        if(!userType.includes(req.user.userType)) {
            apiError.message = `Sorry you are forbidden to carry out this operation`;
            apiError.success = false;
            console.log("apiError", apiError);
            return res.status(403).json(apiError);
        }
        next();
    }
};


