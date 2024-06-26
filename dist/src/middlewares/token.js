"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const tokenConfig_1 = __importDefault(require("../config/tokenConfig"));
const cookie_1 = require("../lib/cookie");
function validateToken(req, res, next) {
    const token = (0, cookie_1.getTokenFromCookie)(req, res);
    if (!token)
        return (0, errors_1.authorizationFailure)(res);
    jsonwebtoken_1.default.verify(token, tokenConfig_1.default.secret_token, (err, decoded) => {
        if (err)
            return (0, errors_1.authorizationFailure)(res);
        req.body.id = decoded.id;
        next();
    });
}
exports.default = validateToken;
