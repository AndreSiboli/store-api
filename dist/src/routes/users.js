"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const router = express_1.default.Router();
router.get("/:user", usersControllers_1.getUser);
router.delete("/", usersControllers_1.deleteUser);
router.patch("/password", usersControllers_1.updatePassword);
router.patch("/name", usersControllers_1.updateUsername);
exports.default = router;
