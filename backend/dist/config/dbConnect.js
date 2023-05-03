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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./backend/src/config/.env" });
const DB_URL = process.env.NODE_ENV === "development" ? process.env.LOCAL_DB_URL
    : process.env.NODE_ENV === "production_test" ? process.env.PRODUCTION_TEST_DB_URL
        : process.env.LIVE_DB_URL;
console.log("\n\t NODE_ENV: ", process.env.NODE_ENV);
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`\n\t Initiating database connection: ${DB_URL}`);
        yield mongoose_1.default.connect(DB_URL);
        yield Promise.all([
        // mongoose.connection.collection("users").drop(),
        // mongoose.connection.collection("admins").drop(),
        // mongoose.connection.collection("customers").drop(),
        // mongoose.connection.collection("employees").drop(),
        ]);
        console.log(`\n\t Successfully connected to the database....`);
    }
    catch (error) {
        console.log(`Error in database connection: ${error.message}`);
    }
});
exports.default = dbConnect;
