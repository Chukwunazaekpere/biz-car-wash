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
const date_fran_1 = require("date-fran");
const models_1 = __importDefault(require("../models"));
const { Users, Customers, Employees } = models_1.default;
const Admins = Users;
const userActivities_1 = require("../../helpers/userActivities");
const passwordManipulation_1 = require("../../helpers/passwordManipulation");
const Users_1 = require("../models/Users");
const accessTokens_1 = require("../../helpers/accessTokens");
const CreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t CreateUserController...", req.body);
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const { firstname, lastname, username, password, userType, confirmPassword } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        if (confirmPassword === password) {
            const name = firstname.concat(" ", lastname);
            const [usersFullname, usernameExists, hashedPassword] = yield Promise.all([
                Users.findOne({ name }),
                Users.findOne({ username }),
                (0, passwordManipulation_1.hashUserPassword)(password),
            ]);
            errorMessage = usersFullname ? `A user: ${name} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                const name = firstname.concat(" ", lastname);
                const user = originalUrl.includes("admin") && userType.toLowerCase() !== "admin" ?
                    yield Employees.create(Object.assign(Object.assign({}, req.body), { userType: Users_1.userTypes.Employee, dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), lastSeen: (0, date_fran_1.todaysDate)(), name, stringDate: (0, date_fran_1.todaysDate)().toDateString() }))
                    :
                        originalUrl.includes("admin") && userType.toLowerCase() === "admin" ?
                            yield Admins.create(Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), userType: Users_1.userTypes.Admin, password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), lastSeen: (0, date_fran_1.todaysDate)(), name, stringDate: (0, date_fran_1.todaysDate)().toDateString() }))
                            :
                                yield Customers.create(Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), userType: Users_1.userTypes.Customer, lastSeen: (0, date_fran_1.todaysDate)(), name, stringDate: (0, date_fran_1.todaysDate)().toDateString() }));
                const payLoad = {
                    user: {
                        id: user._id,
                    },
                };
                const [accessToken, log] = yield Promise.all([
                    (0, accessTokens_1.generateAccessToken)(payLoad),
                    (0, userActivities_1.logUserActivity)(Object.assign(Object.assign({}, req.body), { userType: user.userType }), `Registered a new user: ${firstname} ${lastname}`, req)
                ]);
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
            }
            ;
        }
        ;
        // console.log("\n\t CreateUserController-errorMessage...",req.user);
        // console.log("\n\t CreateUserController-errorMessage...", errorMessage);
        // console.log("\n\t CreateUserController-errorMessage...",req.user._id);
        throw new Error(errorMessage);
    }
    catch (error) {
        console.log(error);
        return res.status(statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
});
exports.default = CreateUserController;
