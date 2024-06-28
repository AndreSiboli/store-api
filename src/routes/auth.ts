import express from "express";
import {
  verifyLogin,
  verifyLogout,
  verifyRefreshToken,
  verifyRegister,
  verifyToken,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/login", verifyLogin);

router.post("/register", verifyRegister);

router.get("/logout", verifyLogout);

router.get("/token", verifyToken);

router.post("/refresh-token", verifyRefreshToken);

export default router;
