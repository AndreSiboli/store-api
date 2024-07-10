import express from "express";
import {
  getFavorites,
  updateFavorites,
  deleteFavorites,
} from "../controllers/favoritesControllers";

const router = express.Router();

router.get("/", getFavorites);
router.post("/", updateFavorites);
router.delete("/", deleteFavorites);

export default router;
