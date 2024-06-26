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
exports.manageTokenExpirationDB = exports.deleteRefreshTokenDB = exports.updateRefreshTokenDB = exports.saveRefreshTokenDB = exports.getRefreshTokenDB = exports.getAuthUserDB = void 0;
const users_1 = __importDefault(require("../models/users"));
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
function getAuthUserDB(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findOne({ email })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getAuthUserDB = getAuthUserDB;
function getRefreshTokenDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshToken_1.default
            .findOne({ user_id: data.user_id, refresh_token: data.refresh_token })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getRefreshTokenDB = getRefreshTokenDB;
function saveRefreshTokenDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dayInMill = 24 * 60 * 60 * 1000;
        return yield new refreshToken_1.default({
            refresh_token: data.refresh_token,
            user_id: data.user_id,
            expiresIn: Date.now() + dayInMill,
            updatedIn: Date.now(),
        })
            .save()
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.saveRefreshTokenDB = saveRefreshTokenDB;
function updateRefreshTokenDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dayInMill = 24 * 60 * 60 * 1000;
        return yield refreshToken_1.default
            .findOneAndUpdate({ user_id: data.user_id, refresh_token: data.old_refresh_token }, {
            refresh_token: data.refresh_token,
            expiresIn: Date.now() + dayInMill,
            updatedIn: Date.now(),
        })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updateRefreshTokenDB = updateRefreshTokenDB;
function deleteRefreshTokenDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshToken_1.default
            .findOneAndDelete({
            user_id: data.user_id,
            refresh_token: data.refresh_token,
        })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.deleteRefreshTokenDB = deleteRefreshTokenDB;
function manageTokenExpirationDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshToken_1.default
            .deleteMany()
            .where("expiresIn")
            .lt(Date.now())
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.manageTokenExpirationDB = manageTokenExpirationDB;
