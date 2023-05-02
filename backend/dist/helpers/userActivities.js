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
exports.generateUsernameFromRequest = exports.logUserActivity = void 0;
const models_1 = __importDefault(require("../users/models"));
const date_fran_1 = require("date-fran");
const { UserLog, Users } = models_1.default;
const logUserActivity = (userData, operation, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, userType } = userData;
        const [user] = yield Promise.all([
            Users.findOne({ firstname } && { lastname })
        ]);
        const savingname = `${firstname} ${lastname}`;
        if (user) {
            yield UserLog.create({
                name: savingname,
                userFullname: `${(firstname).concat(" ", lastname)}`,
                userType: userType,
                operation,
                stringDate: (0, date_fran_1.todaysDate)().toDateString(),
                monthRecord: (0, date_fran_1.getMonth)((0, date_fran_1.todaysDate)()),
                yearRecord: (0, date_fran_1.todaysDate)().getFullYear(),
                dateCreated: (0, date_fran_1.todaysDate)()
            });
        }
    }
    catch (error) {
        console.log("\n\t logUserActivity: ", error);
    }
});
exports.logUserActivity = logUserActivity;
const generateUsernameFromRequest = (user) => {
    try {
        const { firstname, lastname } = user;
        const fullname = firstname.concat(" ", lastname);
        return fullname;
    }
    catch (error) {
        return "";
    }
};
exports.generateUsernameFromRequest = generateUsernameFromRequest;
