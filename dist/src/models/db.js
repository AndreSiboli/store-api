"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectingDB = mongoose_1.default.connect(process.env.API_DB_URL);
connectingDB
    .then(() => {
    console.log("Database connected!");
})
    .catch((err) => {
    console.log("Database NOT conected!");
});
