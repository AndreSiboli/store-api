import { Request, Response } from "express";
import {
  deleteFavoriteDB,
  getFavoriteDB,
  getFavoritesDB,
  updateFavoritesDB,
} from "../services/favorites";
import { genericError } from "../errors";

export async function getFavorites(req: Request, res: Response) {
  try {
    const { id: userId } = req.body;

    const response = await getFavoritesDB(userId);
    if (!response) throw new Error();

    res.status(200).json({ favorites: response, message: "Items sent" });
  } catch (error) {
    genericError(res);
  }
}

export async function updateFavorites(req: Request, res: Response) {
  try {
    const { id: userId, productId } = req.body;

    const isThereFavorite = await getFavoriteDB({ userId, productId });
    if (isThereFavorite) throw new Error();

    const response = await updateFavoritesDB({ userId, productId });
    if (!response) throw new Error();

    res.status(200).json({ message: "Item insert in favorites" });
  } catch (error) {
    genericError(res);
  }
}

export async function deleteFavorites(req: Request, res: Response) {
  try {
    const { id: userId, productId } = req.body;

    const response = await deleteFavoriteDB({ userId, productId });
    if (!response) throw new Error();

    res.status(200).json({ message: "Item removed from favorites" });
  } catch (error) {
    genericError(res);
  }
}
