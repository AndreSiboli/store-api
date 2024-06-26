import { Request, Response } from "express";
import { compare } from "../lib/encrypt";
import { createUserDB, getUserById } from "../services/users";
import { authorizationFailure, genericError } from "../errors";
import { validateRefreshToken } from "../lib/token";
import {
  createTokenCookie,
  createRefreshTokenCookie,
  getRefreshTokenFromCookie,
  getIdFromRefreshToken,
} from "../lib/cookie";
import {
  deleteRefreshTokenDB,
  getAuthUserDB,
  getRefreshTokenDB,
  saveRefreshTokenDB,
  updateRefreshTokenDB,
} from "../services/auth";
import {
  checkEmail,
  checkUsername,
  checkPassword,
} from "../utils/verifyCredentials";

export async function verifyLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await getAuthUserDB(email);
    if (!user) throw new Error();

    if (!(await compare(password, user.password))) throw new Error();

    createTokenCookie(user.id, res);
    const refreshToken = await createRefreshTokenCookie(user.id, res);
  
    if (!refreshToken) throw new Error();

    const saveInDB = await saveRefreshTokenDB({
      user_id: user.id,
      refresh_token: refreshToken,
    });
    if (!saveInDB) throw new Error();

    res.status(200).json({ messeage: "Login successfully" });
  } catch (err) {
    authorizationFailure(res);
  }
}

export async function verifyRegister(req: Request, res: Response) {
  try {
    const { email, username, password, repassword } = req.body;

    if (!checkEmail(email)) throw new Error();
    if (!checkUsername(username)) throw new Error();
    if (!checkPassword(password, repassword)) throw new Error();

    const response = await createUserDB({ ...req.body });
    if (!response) throw new Error();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    genericError(res);
  }
}

export async function verifyRefreshToken(req: Request, res: Response) {
  try {
    const isValidToken = validateRefreshToken(req, res);
    if (!isValidToken) throw new Error();

    const user = await getUserById(req.body.id);
    if (!user) throw new Error();

    const old_refresh_token = getRefreshTokenFromCookie(req, res);
    if (!old_refresh_token) throw new Error();

    createTokenCookie(user.id, res);
    const refreshToken = await createRefreshTokenCookie(user.id, res);
    if (!refreshToken) throw new Error();

    const response = await updateRefreshTokenDB({
      user_id: user.id,
      refresh_token: refreshToken,
      old_refresh_token,
    });
    if (!response) throw new Error();

    res.status(200).json({ message: "Refresh token created successfully." });
  } catch (err) {
    authorizationFailure(res);
  }
}

export async function verifyLogout(req: Request, res: Response) {
  const refresh = getRefreshTokenFromCookie(req, res);

  if (refresh) {
    deleteRefreshTokenDB({
      user_id: getIdFromRefreshToken(refresh),
      refresh_token: refresh,
    });
  }

  res.clearCookie("auth");
  res.clearCookie("refresh_auth");

  res.status(200).json({ message: "You were disconected." });
}
