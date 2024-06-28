import { Request, Response } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import config from "../config/tokenConfig";
import { getRefreshTokenFromCookie, getTokenFromCookie } from "./cookie";

interface JwtPayload extends DefaultJwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export function createToken(id: string) {
  const token = jwt.sign({ id }, config.secret_token, {
    expiresIn: config.expires_in_token,
  });
  return token;
}

export function createRefreshToken(id: string) {
  const refreshToken = jwt.sign({ id }, config.secret_refresh_token, {
    expiresIn: config.expires_in_refresh_token,
  });

  return refreshToken;
}

export function validateToken(req: Request, res: Response) {
  const token = getTokenFromCookie(req, res);
  if (!token) return false;

  return jwt.verify(token, config.secret_token, (err, decoded) => {
    if (err) return false;
    return true;
  });
}

export function validateRefreshToken(req: Request, res: Response) {
  const refresh = getRefreshTokenFromCookie(req, res);

  if (!refresh) return null;

  return jwt.verify(refresh, config.secret_refresh_token, (err, decoded) => {
    if (err) return false;
    req.body.id = (decoded as JwtPayload).id;
    return true;
  });
}
