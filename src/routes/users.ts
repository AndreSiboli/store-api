import express from "express";
import {
  deleteUser,
  getUser,
  updateUsername,
  updatePassword,
} from "../controllers/usersControllers";

const router = express.Router();

router.get("/:user", getUser);

router.delete("/", deleteUser);

router.patch("/password", updatePassword);

router.patch("/name", updateUsername);

export default router;
