dotenv.config({path: process.env.ENV_PATH as string});
import dotenv from "dotenv";

import carWashServer from "./server";
import dbConnect from "./config/dbConnect";



const PORT = process.env.PORT;
carWashServer.listen(PORT, async() => {
    try {
        await dbConnect();
        console.log(`\n\t Server started on port: ${PORT}`);
    } catch (error) {
        console.log(`\n\t Server did not start on port: ${PORT}`);
        
    }
});
