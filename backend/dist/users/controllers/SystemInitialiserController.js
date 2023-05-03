"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fran_1 = require("date-fran");
const Users_1 = __importStar(require("../models/Users"));
const Admins = Users_1.default;
const userActivities_1 = require("../../helpers/userActivities");
const passwordManipulation_1 = require("../../helpers/passwordManipulation");
const SystemInitialiserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [defaultUser, hashedPassword] = yield Promise.all([
            Admins.findOne({
                firstname: initializer.firstname,
                lastname: initializer.lastname,
                email: initializer.email,
            }),
            (0, passwordManipulation_1.hashUserPassword)(process.env.COMPANY_DEVELOPER_PASSWORD),
        ]);
        // console.log("\n\t Creating Defaults-2...", defaultUser);
        if (!defaultUser) {
            yield Promise.all([
                Admins.create({
                    email: initializer.email,
                    username: initializer.username,
                    dateUpdated: (0, date_fran_1.todaysDate)(),
                    password: hashedPassword,
                    userType: Users_1.userTypes.Admin,
                    phone: initializer.phone,
                    dateCreated: (0, date_fran_1.todaysDate)(),
                    lastSeen: (0, date_fran_1.todaysDate)(),
                    name: initializer.firstname.concat(" ", initializer.lastname),
                    stringDate: (0, date_fran_1.todaysDate)().toDateString(),
                }),
                (0, userActivities_1.logUserActivity)(initializer, `System initialization`, req)
            ]);
            return true;
        }
        ;
        throw new Error("Users exist.");
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
});
exports.default = SystemInitialiserController;
