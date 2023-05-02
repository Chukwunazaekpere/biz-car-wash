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
dotenv_1.default.config({ path: process.env.ENV_PATH });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const PORT = process.env.PORT;
server_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.default)();
        console.log(`\n\t Server started on port: ${PORT}`);
    }
    catch (error) {
        console.log(`\n\t Server did not start on port: ${PORT}`);
    }
}));
