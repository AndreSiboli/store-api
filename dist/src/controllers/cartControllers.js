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
exports.updateHowMany = exports.clearCart = exports.deleteCartItem = exports.updateCart = exports.getCartItems = void 0;
const errors_1 = require("../errors");
const cart_1 = require("../services/cart");
function getCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId } = req.body;
            const response = yield (0, cart_1.getCartItemsDB)(userId);
            if (!response)
                throw new Error();
            res.status(200).json({ data: response, message: "Favorites finded." });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.getCartItems = getCartItems;
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId, productId } = req.body;
            const isThereFavorite = yield (0, cart_1.getCartItemDB)({ userId, productId });
            if (isThereFavorite)
                throw new Error();
            const response = yield (0, cart_1.updateCartDB)({ userId, productId });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Item insert in cart" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.updateCart = updateCart;
function deleteCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId, productId } = req.body;
            const response = yield (0, cart_1.deleteCartItemDB)({ userId, productId });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Item removed from cart" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.deleteCartItem = deleteCartItem;
function clearCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId } = req.body;
            const response = yield (0, cart_1.clearCartDB)(userId);
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Cart cleared" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.clearCart = clearCart;
function updateHowMany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId, productId, howMany } = req.body;
            const isThereInCart = yield (0, cart_1.getCartItemDB)({ userId, productId });
            if (!isThereInCart)
                throw new Error();
            const response = yield (0, cart_1.updateHowManyDB)({ userId, productId, howMany });
            if (!response)
                throw new Error();
            res.status(200).json({ message: "Item insert in cart" });
        }
        catch (error) {
            (0, errors_1.genericError)(res);
        }
    });
}
exports.updateHowMany = updateHowMany;
