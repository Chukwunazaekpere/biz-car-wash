import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config({path: "./backend/src/config/.env"})
// console.log("\n\t JWT in accessTokens file: ", process.env.JWT_SECRET, "\n")

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateAccessToken = async(payload: any) => {
    try {
        let accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1d",
        });
        return accessToken;
    } catch (error) {
        console.log(error);
    }
};

export const generatePasswordResetToken = async() => {
    try {
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetPasswordToken)
            .digest("hex");
        const passwordResetTokenExpires = Date.now() + 30 * 60 * 1000; // pick the current time and add 30 ie(30*60) minutes to it and convert to seconds by multiplying with 1000

        return {
            resetPasswordToken,
            passwordResetTokenExpires,
            passwordResetToken,
        };
    } catch (error) {
        console.log(error);
    }
};