"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./src/models/db");
require("dotenv/config");
const auth_1 = __importDefault(require("./src/routes/auth"));
const users_1 = __importDefault(require("./src/routes/users"));
const favorites_1 = __importDefault(require("./src/routes/favorites"));
const cart_1 = __importDefault(require("./src/routes/cart"));
const token_1 = __importDefault(require("./src/middlewares/token"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.get("/", (req, res) => {
    console.log('papel');
    return res.json({ message: "It is on air." });
});
app.use("/", auth_1.default);
app.use("/cart", token_1.default, cart_1.default);
app.use("/favorites", token_1.default, favorites_1.default);
app.use("/users", token_1.default, users_1.default);
const PORT = process.env.API_PORT || 8080;
app.listen(PORT);
