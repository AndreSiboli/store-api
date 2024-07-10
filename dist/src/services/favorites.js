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
exports.deleteFavoriteDB = exports.updateFavoritesDB = exports.getFavoritesDB = exports.getFavoriteDB = void 0;
const users_1 = __importDefault(require("../models/users"));
function getFavoriteDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(data.userId)
            .where({ favorites: { _id: data.productId } })
            .select("favorites")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getFavoriteDB = getFavoriteDB;
function getFavoritesDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(id)
            .select("favorites")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getFavoritesDB = getFavoritesDB;
function updateFavoritesDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndUpdate(data.userId, {
            $push: { favorites: { _id: data.productId } },
        }, { new: true })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updateFavoritesDB = updateFavoritesDB;
function deleteFavoriteDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndUpdate(data.userId, {
            $pull: { favorites: { _id: data.productId } },
        }, { new: true })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.deleteFavoriteDB = deleteFavoriteDB;
