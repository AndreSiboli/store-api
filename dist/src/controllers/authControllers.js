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
exports.verifyToken = exports.verifyLogout = exports.verifyRefreshToken = exports.verifyRegister = exports.verifyLogin = void 0;
const encrypt_1 = require("../lib/encrypt");
const users_1 = require("../services/users");
const errors_1 = require("../errors");
const token_1 = require("../lib/token");
const cookie_1 = require("../lib/cookie");
const auth_1 = require("../services/auth");
const verifyCredentials_1 = require("../utils/verifyCredentials");
function verifyLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, auth_1.getAuthUserDB)(email);
            if (!user)
                throw new Error();
            if (!(yield (0, encrypt_1.compare)(password, user.password)))
                throw new Error();
            (0, cookie_1.createTokenCookie)(user.id, res);
            const refreshToken = yield (0, cookie_1.createRefreshTokenCookie)(user.id, res);
            if (!refreshToken)
                throw new Error();
            const saveInDB = yield (0, auth_1.saveRefreshTokenDB)({
                user_id: user.id,
                refresh_token: refreshToken,
            });
            if (!saveInDB)
                throw new Error();
            const userData = user.toObject({
                transform: (doc, ret) => {
                    delete ret.password;
                    delete ret.__v;
                    return ret;
                },
            });
            res.status(200).json({ user: userData, messeage: "Login successfully" });
        }
        catch (err) {
            (0, errors_1.authorizationFailure)(res);
        }
    });
}
exports.verifyLogin = verifyLogin;
function verifyRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, password, repassword } = req.body;
            if (yield (0, users_1.getUsernameDB)(username))
                throw new Error("This user already exists");
            if (yield (0, users_1.getUserByEmailDB)(email))
                throw new Error("This email already exists");
            if (!(0, verifyCredentials_1.checkEmail)(email))
                throw new Error();
            if (!(0, verifyCredentials_1.checkUsername)(username))
                throw new Error();
            if (!(0, verifyCredentials_1.checkPassword)(password, repassword))
                throw new Error();
            const response = yield (0, users_1.createUserDB)(Object.assign({}, req.body));
            if (!response)
                throw new Error();
            return res.status(201).json({ message: "User registered successfully" });
        }
        catch (err) {
            (0, errors_1.genericError)(res, err);
        }
    });
}
exports.verifyRegister = verifyRegister;
function verifyRefreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isValidToken = (0, token_1.validateRefreshToken)(req, res);
            if (!isValidToken)
                throw new Error();
            const user = yield (0, users_1.getUserByIdDB)(req.body.id);
            if (!user)
                throw new Error();
            const old_refresh_token = (0, cookie_1.getRefreshTokenFromCookie)(req, res);
            if (!old_refresh_token)
                throw new Error();
            (0, cookie_1.createTokenCookie)(user.id, res);
            const refreshToken = yield (0, cookie_1.createRefreshTokenCookie)(user.id, res);
            if (!refreshToken)
                throw new Error();
            const response = yield (0, auth_1.updateRefreshTokenDB)({
                user_id: user.id,
                refresh_token: refreshToken,
                old_refresh_token,
            });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Refresh token created successfully." });
        }
        catch (err) {
            (0, errors_1.authorizationFailure)(res);
        }
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
function verifyLogout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refresh = (0, cookie_1.getRefreshTokenFromCookie)(req, res);
        if (refresh) {
            (0, auth_1.deleteRefreshTokenDB)({
                user_id: (0, cookie_1.getIdFromRefreshToken)(refresh),
                refresh_token: refresh,
            });
        }
        res.clearCookie("auth");
        res.clearCookie("refresh_auth");
        res.status(200).json({ message: "You were disconected." });
    });
}
exports.verifyLogout = verifyLogout;
function verifyToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(0, token_1.validateToken)(req, res))
                throw new Error();
            res.status(200).json({ message: "User is authenticated" });
        }
        catch (err) {
            (0, errors_1.authorizationFailure)(res);
        }
    });
}
exports.verifyToken = verifyToken;
