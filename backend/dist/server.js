"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const carWashServer = (0, express_1.default)(); //carWashServer initialization;
// middlewares  
carWashServer.use(express_1.default.json());
carWashServer.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'public')));
carWashServer.use((0, cors_1.default)());
carWashServer.use(express_1.default.static("files"));
// Routes
carWashServer.use("/biz-car-wash/api", routes_1.default);
exports.default = carWashServer;
