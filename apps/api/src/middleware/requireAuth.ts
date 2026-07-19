import type { Request, Response, NextFunction } from "express";
import { verifySession, COOKIE_NAME, type SessionPayload } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      session?: SessionPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "unauthenticated" });

  try {
    req.session = verifySession(token);
    next();
  } catch {
    res.status(401).json({ error: "unauthenticated" });
  }
}
