import express from "express";
import "./src/models/db";
import "dotenv/config";
import auth from "./src/routes/auth";
import users from "./src/routes/users";
import favorites from "./src/routes/favorites";
import cart from "./src/routes/cart";
import token from "./src/middlewares/token";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.API_SITE_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.json({ message: "It is on air." });
});

app.use("/", auth);
app.use("/cart", token, cart);
app.use("/favorites", token, favorites);
app.use("/users", token, users);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`API is on port ${PORT}!`);
});
