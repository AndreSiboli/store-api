import { Response } from "express";

export function badRequestError(res: Response) {
  return res.status(400).json({
    message: `It was not possible to procced.`,
  });
}

export function authorizationFailure(res: Response) {
  return res.status(401).json({
    message: `Access Denied.`,
  });
}

export function notFoundError(res: Response, username: string) {
  return res.status(404).json({
    message: `The user ${username} was not found.`,
  });
}

export function alredyExists(res: Response, name: string) {
  return res.status(409).json({
    message: `This ${name} already exists.`,
  });
}

export function genericError(res: Response, err?: Error) {
  return res.status(500).json({
    message: err?.message || `An error has occurred.`,
  });
}
