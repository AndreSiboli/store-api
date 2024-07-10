"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartControllers_1 = require("../controllers/cartControllers");
const router = express_1.default.Router();
router.get("/", cartControllers_1.getCartItems);
router.post("/", cartControllers_1.updateCart);
router.patch('/', cartControllers_1.updateHowMany);
router.delete("/", cartControllers_1.deleteCartItem);
router.delete('/clear', cartControllers_1.clearCart);
exports.default = router;
