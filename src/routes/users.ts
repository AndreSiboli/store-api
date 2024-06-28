import express from "express";
import {
  deleteUser,
  getUser,
  updateUsername,
  updatePassword,
  getUserById,
} from "../controllers/usersControllers";

const router = express.Router();

router.get("/", getUserById);

router.get("/user/:user", getUser);

router.delete("/", deleteUser);

router.patch("/password", updatePassword);

router.patch("/name", updateUsername);

export default router;
