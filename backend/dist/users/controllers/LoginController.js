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
const models_1 = __importDefault(require("../models"));
const passwordManipulation_1 = require("../../helpers/passwordManipulation");
const accessTokens_1 = require("../../helpers/accessTokens");
const date_fran_1 = require("date-fran");
const userActivities_1 = require("../../helpers/userActivities");
const { Users } = models_1.default;
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("\n\t LoginController: ", req.body);
    const { email, password } = req.body;
    let statusCode = 400;
    // console.log("\n\t Request-body-user-all: ", await Users.find())
    try {
        const user = yield Users.findOne({ email });
        let errorMessage = "Invalid user credentials";
        if (user) {
            const passwordPass = yield (0, passwordManipulation_1.decryptPassword)(password, user.password);
            let statusCode = 403;
            if (passwordPass) {
                const payLoad = {
                    user: {
                        id: user.id,
                    },
                };
                const accessToken = yield (0, accessTokens_1.generateAccessToken)(payLoad);
                yield Promise.all([
                    Users.findByIdAndUpdate(user._id, {
                        lastSeen: (0, date_fran_1.todaysDate)(),
                        dateUpdated: (0, date_fran_1.todaysDate)()
                    }, { useFindAndModify: false }),
                    (0, userActivities_1.logUserActivity)(user, `Logged in`, req)
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
        }
        ;
    }
    catch (error) {
        console.log("\n\t Login error: ", error.message);
        return res.status(statusCode).json({
            status: "Error",
            message: error.message
        });
    }
});
exports.default = LoginController;
