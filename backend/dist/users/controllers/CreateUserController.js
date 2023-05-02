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
const CreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t CreateUserController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const { firstname, lastname, username, password, userType, confirmPassword } = req.body;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        if (confirmPassword === password) {
            const [usersFullname, usernameExists, hashedPassword] = yield Promise.all([
                Users.findOne({ name: firstname.concat(" ", lastname) }),
                Users.findOne({ userName: username }),
                (0, passwordManipulation_1.hashUserPassword)(password),
            ]);
            errorMessage = usersFullname ? `A user: ${firstname.concat(" ", lastname)} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                yield Promise.all([
                    originalUrl.includes("admin") && userType.toLowerCase() !== "admin" ?
                        Employees.create(Object.assign(Object.assign({}, req.body), { userType: Users_1.userTypes.Employee, dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), createdBy: req.user._id, stringDate: (0, date_fran_1.todaysDate)().toDateString() }))
                        :
                            originalUrl.includes("admin") && userType.toLowerCase() === "admin" ?
                                Admins.create(Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), userType: Users_1.userTypes.Admin, password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), createdBy: req.user._id, stringDate: (0, date_fran_1.todaysDate)().toDateString() }))
                                :
                                    Customers.create(Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, dateCreated: (0, date_fran_1.todaysDate)(), userType: Users_1.userTypes.Customer, lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), createdBy: req.user._id, stringDate: (0, date_fran_1.todaysDate)().toDateString() })),
                    (0, userActivities_1.logUserActivity)(adminUser, `Registered a new user: ${firstname} ${lastname}`, req)
                ]);
                return res.status(201).json({
                    status: "Success",
                    message: `${firstname} ${lastname} was successfully registered.`,
                });
            }
            ;
        }
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
