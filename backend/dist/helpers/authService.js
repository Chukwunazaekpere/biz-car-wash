"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.isLoggedIn = exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: "./backend/src/config/.env" });
const models_1 = __importDefault(require("../users/models"));
const { Customers, Employees, Admins } = models_1.default;
const JWT_SECRET = process.env.JWT_SECRET;
const apiError = {};
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else if (req.cookies && req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        }
        //check if the access token actually exist
        if (!accessToken)
            return `Acesss denied, No authorization token`;
        //decode the acesss token
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        console.log("\n\t Server-decodedToken: ", decodedToken);
        const user = (yield Admins.findById(decodedToken.user.id)) || (yield Employees.findById(decodedToken.user.id)) || (yield Customers.findById(decodedToken.user.id));
        console.log("\n\t Server-user: ", user);
        if (user) {
            // Check license details
            // console.log("\n\t Server-user.name: ", user.name);
            req._id = String(user._id);
            res.locals.user = decodedToken.user.id;
            return next();
        }
        ;
        throw new Error("Access denied.");
    }
    catch (error) {
        console.log(error);
        if (error.message.includes("jwt expired")) {
            return `Token expired. Please login again.`;
        }
        return `Invalid accessToken`;
    }
});
exports.authenticate = authenticate;
/**
 * A middleware for validating that a user is logged-in,
 * before being allowed to perform an operation
 * @param req
 * @param res
 * @param next
 * @returns
 */
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken;
    // console.log("\n\t Users in isLoggedIn...", req.cookies);
    if (req.cookies.accessToken) {
        try {
            accessToken = req.cookies.accessToken;
            //decode the acesss token
            const decodedToken = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
            //check if user exist just to be sure the user had not been deleted
            const user = (yield Admins.findById(decodedToken.user.id)) || (yield Employees.findById(decodedToken.user.id)) || (yield Customers.findById(decodedToken.user.id));
            if (user) {
                // (req.user as any)._id = decodedToken.user.id;
                // req.user.userType = user.userType
                // console.log("\n\t Users in isLoggedIn...", req.cookies);
                req._id = String(user._id);
                return next();
            }
            ;
            throw new Error("Unrecognised user.");
        }
        catch (error) {
            return next();
        }
    }
    return next();
});
exports.isLoggedIn = isLoggedIn;
const authorize = (userType) => {
    // console.log("\n\t Request in authorize: ",);
    return (req, res, next) => {
        if (!userType.includes(req.user.userType)) {
            apiError.message = `Sorry you are forbidden to carry out this operation`;
            apiError.success = false;
            console.log("apiError", apiError);
            return res.status(403).json(apiError);
        }
        next();
    };
};
exports.authorize = authorize;
