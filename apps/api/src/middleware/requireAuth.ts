import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, ACCESS_COOKIE_NAME, type AccessTokenPayload } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      session?: AccessTokenPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[ACCESS_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: { message: "unauthenticated", code: "ACCESS_TOKEN_MISSING" } });
  }

  try {
    req.session = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ error: { message: "access token expired or invalid", code: "ACCESS_TOKEN_EXPIRED" } });
  }
}
