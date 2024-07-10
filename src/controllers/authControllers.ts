import { Request, Response } from "express";
import "dotenv/config";
import { compare } from "../lib/encrypt";
import {
  createUserDB,
  getUserByEmailDB,
  getUserByIdDB,
  getUsernameDB,
} from "../services/users";
import { authorizationFailure, genericError } from "../errors";
import { validateRefreshToken, validateToken } from "../lib/token";
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

    const userData = user.toObject({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    });

    res.status(200).json({ user: userData, messeage: "Login successfully" });
  } catch (err) {
    authorizationFailure(res);
  }
}

export async function verifyRegister(req: Request, res: Response) {
  try {
    const { email, username, password, repassword } = req.body;

    if (await getUsernameDB(username))
      throw new Error("This user already exists");
    if (await getUserByEmailDB(email))
      throw new Error("This email already exists");

    if (!checkEmail(email)) throw new Error();
    if (!checkUsername(username)) throw new Error();
    if (!checkPassword(password, repassword)) throw new Error();

    const response = await createUserDB({ ...req.body });
    if (!response) throw new Error();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    genericError(res, err as Error);
  }
}

export async function verifyRefreshToken(req: Request, res: Response) {
  try {
    const isValidToken = validateRefreshToken(req, res);
    if (!isValidToken) throw new Error();

    const user = await getUserByIdDB(req.body.id);
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

  res.clearCookie("auth", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("refresh_auth", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "You were disconected." });
}

export async function verifyToken(req: Request, res: Response) {
  try {
    if (!validateToken(req, res)) throw new Error();
    res.status(200).json({ message: "User is authenticated" });
  } catch (err) {
    authorizationFailure(res);
  }
}
