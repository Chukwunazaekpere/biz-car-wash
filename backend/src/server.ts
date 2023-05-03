//imports
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import carWashRouters from "./routes";
const carWashServer: Application = express(); //carWashServer initialization;

carWashServer.enable("trust proxy");
carWashServer.use(cookieParser());

// middlewares  
carWashServer.use(express.json());
carWashServer.use('/uploads', express.static(path.join(__dirname, 'public')));
carWashServer.use(cors()); 
carWashServer.use(express.static("files"));

// Routes
carWashServer.use("/biz-car-wash/api", carWashRouters);
export default carWashServer;

