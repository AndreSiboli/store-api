"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateToken = exports.createRefreshToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenConfig_1 = __importDefault(require("../config/tokenConfig"));
const cookie_1 = require("./cookie");
function createToken(id) {
    const token = jsonwebtoken_1.default.sign({ id }, tokenConfig_1.default.secret_token, {
        expiresIn: tokenConfig_1.default.expires_in_token,
    });
    return token;
}
exports.createToken = createToken;
function createRefreshToken(id) {
    const refreshToken = jsonwebtoken_1.default.sign({ id }, tokenConfig_1.default.secret_refresh_token, {
        expiresIn: tokenConfig_1.default.expires_in_refresh_token,
    });
    return refreshToken;
}
exports.createRefreshToken = createRefreshToken;
function validateToken(req, res) {
    const token = (0, cookie_1.getTokenFromCookie)(req, res);
    if (!token)
        return false;
    return jsonwebtoken_1.default.verify(token, tokenConfig_1.default.secret_token, (err, decoded) => {
        if (err)
            return false;
        return true;
    });
}
exports.validateToken = validateToken;
function validateRefreshToken(req, res) {
    const refresh = (0, cookie_1.getRefreshTokenFromCookie)(req, res);
    if (!refresh)
        return null;
    return jsonwebtoken_1.default.verify(refresh, tokenConfig_1.default.secret_refresh_token, (err, decoded) => {
        if (err)
            return false;
        req.body.id = decoded.id;
        return true;
    });
}
exports.validateRefreshToken = validateRefreshToken;
