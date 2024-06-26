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
exports.getIdFromRefreshToken = exports.getRefreshTokenFromCookie = exports.getTokenFromCookie = exports.createRefreshTokenCookie = exports.createTokenCookie = void 0;
const token_1 = require("./token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createTokenCookie(id, res) {
    const obj2Str = JSON.stringify({ token: (0, token_1.createToken)(id) });
    res.cookie("auth", obj2Str, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000,
    });
}
exports.createTokenCookie = createTokenCookie;
function createRefreshTokenCookie(id, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refresh = (0, token_1.createRefreshToken)(id);
        const obj2Str = JSON.stringify({ refreshToken: refresh });
        res.cookie("refresh_auth", obj2Str, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return refresh;
    });
}
exports.createRefreshTokenCookie = createRefreshTokenCookie;
function getTokenFromCookie(req, res) {
    try {
        return JSON.parse(req.cookies.auth).token;
    }
    catch (error) {
        return null;
    }
}
exports.getTokenFromCookie = getTokenFromCookie;
function getRefreshTokenFromCookie(req, res) {
    var _a;
    try {
        return (_a = JSON.parse(req.cookies.refresh_auth)) === null || _a === void 0 ? void 0 : _a.refreshToken;
    }
    catch (error) {
        return null;
    }
}
exports.getRefreshTokenFromCookie = getRefreshTokenFromCookie;
function getIdFromRefreshToken(refresh) {
    const token = jsonwebtoken_1.default.decode(refresh, { complete: true });
    return (token === null || token === void 0 ? void 0 : token.payload).id;
}
exports.getIdFromRefreshToken = getIdFromRefreshToken;
