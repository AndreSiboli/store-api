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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefreshTokenOnDB = exports.isRefreshTokenExpired = void 0;
const auth_1 = require("../services/auth");
function isRefreshTokenExpired(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, auth_1.getRefreshTokenDB)(data);
        const expiresIn = (response === null || response === void 0 ? void 0 : response.expiresIn) || 0;
        const tokenDate = new Date(expiresIn);
        const currentDate = new Date();
        return currentDate.getTime() > tokenDate.getTime();
    });
}
exports.isRefreshTokenExpired = isRefreshTokenExpired;
function isRefreshTokenOnDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return !!(yield (0, auth_1.getRefreshTokenDB)(data));
    });
}
exports.isRefreshTokenOnDB = isRefreshTokenOnDB;
