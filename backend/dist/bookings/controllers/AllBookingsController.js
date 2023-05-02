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
const { Bookings } = models_1.default;
const models_2 = __importDefault(require("../../users/models"));
const { Customers } = models_2.default;
const AllBookingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("\n\t AllBookingsController...", req.body)
    try {
        const bookings = yield Bookings.find().select("-__v").select("-companyId").select("-password").select("-dateUpdated").select("-updatedBy");
        const actualData = [];
        const utils = {};
        for (let user of bookings) {
            const { createdBy, _doc } = user;
            let customerDetails = utils[String(createdBy)];
            if (!customerDetails) {
                const user = yield Customers.findById(createdBy);
                customerDetails = user ? user.name : "--";
                utils[String(createdBy)] = customerDetails;
            }
            ;
            const data = Object.assign(Object.assign({}, _doc), { createdBy: customerDetails });
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
exports.default = AllBookingsController;
