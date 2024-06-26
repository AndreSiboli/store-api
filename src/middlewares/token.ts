import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import { authorizationFailure } from "../errors";
import config from "../config/tokenConfig";
import { getTokenFromCookie } from "../lib/cookie";

interface JwtPayload extends DefaultJwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromCookie(req, res);
  if (!token) return authorizationFailure(res);

  jwt.verify(token, config.secret_token, (err, decoded) => {
    if (err) return authorizationFailure(res);
    req.body.id = (decoded as JwtPayload).id;
    next();
  });
}
