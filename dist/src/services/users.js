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
exports.createUserDB = exports.getUserById = exports.getUsernameDB = exports.getPasswordDB = exports.updateUsernameDB = exports.updatePasswordDB = exports.deleteUserDB = exports.getUserDB = void 0;
const users_1 = __importDefault(require("../models/users"));
const encrypt_1 = require("../lib/encrypt");
function getUserDB(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findOne({ username })
            .select("-password -__v")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getUserDB = getUserDB;
function deleteUserDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndDelete(id)
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.deleteUserDB = deleteUserDB;
function updatePasswordDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, password } = data;
        return yield users_1.default
            .findByIdAndUpdate(id, { password })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updatePasswordDB = updatePasswordDB;
function updateUsernameDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, username } = data;
        return yield users_1.default
            .findByIdAndUpdate(id, { username })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updateUsernameDB = updateUsernameDB;
function getPasswordDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(id)
            .then((res) => (res ? res.password : null))
            .catch((err) => null);
    });
}
exports.getPasswordDB = getPasswordDB;
function getUsernameDB(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findOne({ username })
            .then((res) => (res ? res.username : null))
            .catch((err) => null);
    });
}
exports.getUsernameDB = getUsernameDB;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(id)
            .select("-password -__v")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getUserById = getUserById;
function createUserDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = data;
        const hashing = yield (0, encrypt_1.encrypt)(password);
        return yield new users_1.default({
            username,
            email,
            password: hashing,
            createdAt: Date.now(),
        })
            .save()
            .then((res) => res)
            .catch((err) => false);
    });
}
exports.createUserDB = createUserDB;
