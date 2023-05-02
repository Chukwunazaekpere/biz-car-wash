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
const { Customers, Employees, Admins } = models_1.default;
const UserDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\t UserDetailsController...");
    try {
        const { usersId } = req.params;
        const userExists = (yield Admins.findById(usersId)) || (yield Customers.findById(usersId)) || (yield Employees.findById(usersId));
        // console.log("\n\t UserDetailsController-licenseDetails: ", userExists, licenseDetails)
        if (userExists) {
            return res.status(200).json({
                status: "Success",
                data: userExists,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Network error"
        });
    }
});
exports.default = UserDetailsController;
