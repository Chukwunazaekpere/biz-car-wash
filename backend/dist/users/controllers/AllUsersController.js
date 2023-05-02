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
const { Customers, Employees } = models_1.default;
const AllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("\n\t AllUsersController...", req.body)
    try {
        const originalUrl = req.originalUrl;
        const requiredUsers = originalUrl.includes('employees') ? yield Employees.find() : yield Customers.find();
        const utils = {};
        const actualData = [];
        for (let user of requiredUsers) {
            const { createdBy, _doc } = user;
            // const userDetails = await Users.findById(createdBy);
            let userDetails = utils[String(createdBy)];
            if (!userDetails) {
                const user = (yield Customers.findById(createdBy)) || (yield Employees.findById(createdBy));
                userDetails = user ? user.name : "--";
                utils[String(createdBy)] = userDetails;
            }
            ;
            const data = Object.assign(Object.assign({}, _doc), { lastSeen: user.lastSeen ? user.lastSeen.toDateString() : "--", createdBy: userDetails });
            actualData.push(data);
        }
        ;
        return res.status(200).json({
            status: "Success",
            data: actualData
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.default = AllUsersController;
