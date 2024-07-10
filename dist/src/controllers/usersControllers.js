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
exports.updateUsername = exports.updatePassword = exports.deleteUser = exports.getUserById = exports.getUser = void 0;
const encrypt_1 = require("../lib/encrypt");
const verifyCredentials_1 = require("../utils/verifyCredentials");
const errors_1 = require("../errors");
const users_1 = require("../services/users");
const cookie_1 = require("../lib/cookie");
const auth_1 = require("../services/auth");
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req.params;
            const response = yield (0, users_1.getUserDB)(user);
            if (!response)
                throw new Error();
            return res.status(200).json(response);
        }
        catch (err) {
            (0, errors_1.notFoundError)(res, req.params.user);
        }
    });
}
exports.getUser = getUser;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const response = yield (0, users_1.getUserByIdDB)(id);
            if (!response)
                throw new Error();
            res.status(200).json({ user: response });
        }
        catch (err) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.getUserById = getUserById;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const response = yield (0, users_1.deleteUserDB)(id);
            if (!response)
                throw new Error();
            const refresh = (0, cookie_1.getRefreshTokenFromCookie)(req, res);
            if (refresh) {
                (0, auth_1.deleteRefreshTokenDB)({
                    user_id: (0, cookie_1.getIdFromRefreshToken)(refresh),
                    refresh_token: refresh,
                });
            }
            res.clearCookie("auth");
            res.clearCookie("refresh_auth");
            res.status(200).json({ message: "The user was deleted." });
        }
        catch (err) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.deleteUser = deleteUser;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, password, repassword, lastPassword } = req.body;
            const lastHash = yield (0, users_1.getPasswordDB)(id);
            if (!lastHash)
                throw new Error();
            const isEqual = yield (0, encrypt_1.compare)(lastPassword, lastHash);
            if (!isEqual)
                throw new Error("Your last password is wrong.");
            if (!(0, verifyCredentials_1.checkPassword)(password, repassword))
                throw new Error("Your new passoword doesn't match");
            const encryptedPass = yield (0, encrypt_1.encrypt)(password);
            const response = yield (0, users_1.updatePasswordDB)({ id, password: encryptedPass });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Updated successfully." });
        }
        catch (err) {
            (0, errors_1.genericError)(res, err);
        }
    });
}
exports.updatePassword = updatePassword;
function updateUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, id } = req.body;
            if (!username)
                throw new Error();
            if (yield (0, users_1.getUsernameDB)(username))
                return (0, errors_1.alredyExists)(res, "username");
            const response = yield (0, users_1.updateUsernameDB)({ username, id });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Update successfully." });
        }
        catch (err) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.updateUsername = updateUsername;
