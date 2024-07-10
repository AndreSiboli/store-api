import { Request, Response } from "express";
import { genericError } from "../errors";
import {
  clearCartDB,
  deleteCartItemDB,
  getCartItemDB,
  getCartItemsDB,
  updateCartDB,
  updateHowManyDB,
} from "../services/cart";

export async function getCartItems(req: Request, res: Response) {
  try {
    const { id: userId } = req.body;

    const response = await getCartItemsDB(userId);
    if (!response) throw new Error();

    res.status(200).json({ data: response, message: "Favorites finded." });
  } catch (error) {
    genericError(res);
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { id: userId, productId } = req.body;

    const isThereFavorite = await getCartItemDB({ userId, productId });
    if (isThereFavorite) throw new Error();

    const response = await updateCartDB({ userId, productId });
    if (!response) throw new Error();

    res.status(200).json({ message: "Item insert in cart" });
  } catch (error) {
    genericError(res);
  }
}

export async function deleteCartItem(req: Request, res: Response) {
  try {
    const { id: userId, productId } = req.body;

    const response = await deleteCartItemDB({ userId, productId });
    if (!response) throw new Error();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    genericError(res);
  }
}

export async function clearCart(req: Request, res: Response) {
  try {
    const { id: userId } = req.body;

    const response = await clearCartDB(userId);
    if (!response) throw new Error();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    genericError(res);
  }
}

export async function updateHowMany(req: Request, res: Response) {
  try {
    const { id: userId, productId, howMany } = req.body;

    const isThereInCart = await getCartItemDB({ userId, productId });
    if (!isThereInCart) throw new Error();

    const response = await updateHowManyDB({ userId, productId, howMany });
    if (!response) throw new Error();

    res.status(200).json({ message: "Item insert in cart" });
  } catch (error) {
    genericError(res);
  }
}
