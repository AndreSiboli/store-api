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
exports.deleteFavorites = exports.updateFavorites = exports.getFavorites = void 0;
const favorites_1 = require("../services/favorites");
const errors_1 = require("../errors");
function getFavorites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId } = req.body;
            const response = yield (0, favorites_1.getFavoritesDB)(userId);
            if (!response)
                throw new Error();
            res.status(200).json({ favorites: response, message: "Items sent" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.getFavorites = getFavorites;
function updateFavorites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId, productId } = req.body;
            const isThereFavorite = yield (0, favorites_1.getFavoriteDB)({ userId, productId });
            if (isThereFavorite)
                throw new Error();
            const response = yield (0, favorites_1.updateFavoritesDB)({ userId, productId });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Item insert in favorites" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.updateFavorites = updateFavorites;
function deleteFavorites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId, productId } = req.body;
            const response = yield (0, favorites_1.deleteFavoriteDB)({ userId, productId });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Item removed from favorites" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.deleteFavorites = deleteFavorites;
