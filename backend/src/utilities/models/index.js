"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locations_1 = __importDefault(require("./Locations"));
const Reviews_1 = __importDefault(require("./Reviews"));
const Services_1 = __importDefault(require("./Services"));
const utilitiesModel = {
    Locations: Locations_1.default,
    Reviews: Reviews_1.default,
    Services: Services_1.default
};
exports.default = utilitiesModel;
