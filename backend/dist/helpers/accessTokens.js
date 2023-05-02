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
exports.generatePasswordResetToken = exports.generateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config({ path: "./backend/src/config/.env" });
// console.log("\n\t JWT in accessTokens file: ", process.env.JWT_SECRET, "\n")
const JWT_SECRET = process.env.JWT_SECRET;
const generateAccessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: "1d",
        });
        return accessToken;
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateAccessToken = generateAccessToken;
const generatePasswordResetToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetPasswordToken = crypto_1.default.randomBytes(32).toString("hex");
        const passwordResetToken = crypto_1.default
            .createHash("sha256")
            .update(resetPasswordToken)
            .digest("hex");
        const passwordResetTokenExpires = Date.now() + 30 * 60 * 1000; // pick the current time and add 30 ie(30*60) minutes to it and convert to seconds by multiplying with 1000
        return {
            resetPasswordToken,
            passwordResetTokenExpires,
            passwordResetToken,
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.generatePasswordResetToken = generatePasswordResetToken;
