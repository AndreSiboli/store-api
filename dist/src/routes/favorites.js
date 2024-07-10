"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favoritesControllers_1 = require("../controllers/favoritesControllers");
const router = express_1.default.Router();
router.get("/", favoritesControllers_1.getFavorites);
router.post("/", favoritesControllers_1.updateFavorites);
router.delete("/", favoritesControllers_1.deleteFavorites);
exports.default = router;
