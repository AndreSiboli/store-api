import express from "express";
import "./src/models/db";
import "dotenv/config";
import auth from "./src/routes/auth";
import users from "./src/routes/users";
import token from "./src/middlewares/token";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.json({ message: "It is on air." });
});

app.use("/", auth);
app.use("/users", token, users);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT);
