import express from "express";
import {
  clearCart,
  deleteCartItem,
  getCartItems,
  updateCart,
  updateHowMany,
} from "../controllers/cartControllers";

const router = express.Router();

router.get("/", getCartItems);
router.post("/", updateCart);
router.patch('/',  updateHowMany)
router.delete("/", deleteCartItem);
router.delete('/clear', clearCart)

export default router;
