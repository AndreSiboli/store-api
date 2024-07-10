import { Request, Response } from "express";
import { compare, encrypt } from "../lib/encrypt";
import { checkPassword } from "../utils/verifyCredentials";
import { alredyExists, genericError, notFoundError } from "../errors";
import {
  deleteUserDB,
  getPasswordDB,
  getUserByIdDB,
  getUserDB,
  getUsernameDB,
  updatePasswordDB,
  updateUsernameDB,
} from "../services/users";
import { getIdFromRefreshToken, getRefreshTokenFromCookie } from "../lib/cookie";
import { deleteRefreshTokenDB } from "../services/auth";

export async function getUser(req: Request, res: Response) {
  try {
    const { user } = req.params;
    const response = await getUserDB(user);
    if (!response) throw new Error();

    return res.status(200).json(response);
  } catch (err) {
    notFoundError(res, req.params.user);
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const response = await getUserByIdDB(id);
    if (!response) throw new Error();

    res.status(200).json({ user: response });
  } catch (err) {
    genericError(res);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const response = await deleteUserDB(id);
    if (!response) throw new Error();

    const refresh = getRefreshTokenFromCookie(req, res);

    if (refresh) {
      deleteRefreshTokenDB({
        user_id: getIdFromRefreshToken(refresh),
        refresh_token: refresh,
      });
    }

    res.clearCookie("auth");
    res.clearCookie("refresh_auth");

    res.status(200).json({ message: "The user was deleted." });
  } catch (err) {
    genericError(res);
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const { id, password, repassword, lastPassword } = req.body;
    const lastHash = await getPasswordDB(id);
    if (!lastHash) throw new Error();

    const isEqual = await compare(lastPassword, lastHash);
    if (!isEqual) throw new Error("Your last password is wrong.");

    if (!checkPassword(password, repassword))
      throw new Error("Your new passoword doesn't match");

    const encryptedPass = await encrypt(password);

    const response = await updatePasswordDB({ id, password: encryptedPass });
    if (!response) throw new Error();

    res.status(200).json({ message: "Updated successfully." });
  } catch (err) {
    genericError(res, err as Error);
  }
}

export async function updateUsername(req: Request, res: Response) {
  try {
    const { username, id } = req.body;

    if (!username) throw new Error();
    if (await getUsernameDB(username)) return alredyExists(res, "username");

    const response = await updateUsernameDB({ username, id });
    if (!response) throw new Error();

    res.status(200).json({ message: "Update successfully." });
  } catch (err) {
    genericError(res);
  }
}
