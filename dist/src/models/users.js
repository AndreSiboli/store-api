"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const favoriteObj = {
    _id: {
        type: Number,
        required: true,
    },
};
const cartObj = {
    _id: {
        type: Number,
        required: true,
    },
    how_many: {
        type: Number,
        default: 1,
    },
};
const users = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    favorites: {
        type: [favoriteObj],
    },
    cart: {
        type: [cartObj],
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
exports.default = mongoose_1.default.model("users", users);
