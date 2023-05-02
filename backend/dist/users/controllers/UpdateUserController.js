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
const UpdateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t UpdateUserController...", req.body);
    const adminUser = req.user;
    let statusCode = 403;
    const originalUrl = req.originalUrl;
    try {
        const usersId = req.params.usersId;
        let errorMessage = `Both password and confirm-password must be same`;
        statusCode = 400;
        const { firstname, lastname, username, password, email, confirmPassword } = req.body;
        if (confirmPassword === password) {
            const [usersFullname, usernameExists, hashedPassword] = yield Promise.all([
                Users.findOne({ name: firstname.concat(" ", lastname) }),
                Users.findOne({ email }),
                (0, passwordManipulation_1.hashUserPassword)(password),
            ]);
            errorMessage = usersFullname ? `A user: ${firstname.concat(" ", lastname)} already exists. Please choose another name` : `The username: ${username} already exists. Please choose another username`;
            if (!usersFullname && !usernameExists) {
                statusCode = 0;
                yield Promise.all([
                    originalUrl.includes("/admin/employee") ?
                        Employees.findByIdAndUpdate(usersId, Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), updatedBy: req.user._id }))
                        :
                            originalUrl.includes("admin") ?
                                Admins.findByIdAndUpdate(usersId, Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), updatedBy: req.user._id }))
                                :
                                    Customers.findByIdAndUpdate(usersId, Object.assign(Object.assign({}, req.body), { dateUpdated: (0, date_fran_1.todaysDate)(), password: hashedPassword, lastSeen: (0, date_fran_1.todaysDate)(), name: firstname.concat(" ", lastname), updatedBy: req.user._id })),
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
exports.default = UpdateUserController;
