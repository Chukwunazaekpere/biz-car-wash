dotenv.config({path: "./backend/src/config/.env"});

import mongoose from "mongoose";
import dotenv from "dotenv";


const DB_URL = process.env.NODE_ENV === "development" ? process.env.LOCAL_DB_URL as string
                : process.env.NODE_ENV === "production_test" ? process.env.PRODUCTION_TEST_DB_URL as string
                : process.env.LIVE_DB_URL as string;

// console.log("\n\t NODE_ENV: ", process.env.NODE_ENV);
export const MAXIMUM_DAILY_RECORD = process.env.MAXIMUM_DAILY_RECORD;
const dbConnect = async () => {
    try {
        // console.log("\n\t todaysDate: ", todaysDate())
        console.log(`\n\t Initiating database connection: ${DB_URL}`);
        await mongoose.connect(DB_URL);
        // await Promise.all([]);
        console.log(`\n\t Successfully connected to the database....`,);
    } catch (error: any) {
        console.log(`Error in database connection: ${error.message}`);
    }
};

export default dbConnect;



