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
exports.updateHowManyDB = exports.clearCartDB = exports.deleteCartItemDB = exports.updateCartDB = exports.getCartItemsDB = exports.getCartItemDB = void 0;
const users_1 = __importDefault(require("../models/users"));
function getCartItemDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(data.userId)
            .where({ "cart._id": data.productId })
            .select("cart")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getCartItemDB = getCartItemDB;
function getCartItemsDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findById(id)
            .select("cart")
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.getCartItemsDB = getCartItemsDB;
function updateCartDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndUpdate(data.userId, {
            $push: { cart: { _id: data.productId } },
        }, { new: true })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updateCartDB = updateCartDB;
function deleteCartItemDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndUpdate(data.userId, {
            $pull: { cart: { _id: data.productId } },
        }, { new: true })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.deleteCartItemDB = deleteCartItemDB;
function clearCartDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .findByIdAndUpdate(data, {
            $set: { cart: [] },
        }, { new: true })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.clearCartDB = clearCartDB;
function updateHowManyDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.default
            .updateOne({ _id: data.userId, "cart._id": data.productId }, {
            $set: { "cart.$.how_many": data.howMany },
        })
            .then((res) => res)
            .catch((err) => null);
    });
}
exports.updateHowManyDB = updateHowManyDB;
