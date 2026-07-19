import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { Response } from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_TTL = (process.env.ACCESS_TOKEN_TTL ?? "7d") as SignOptions["expiresIn"];
const REFRESH_TOKEN_TTL = (process.env.REFRESH_TOKEN_TTL ?? "30d") as SignOptions["expiresIn"];

export const ACCESS_COOKIE_NAME = "portfolio_access";
export const REFRESH_COOKIE_NAME = "portfolio_refresh";

const ACCESS_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface AccessTokenPayload {
  sub: string;
  email: string;
}

export interface RefreshTokenPayload {
  sub: string;
}

function requireSecret(secret: string | undefined, name: string): string {
  if (!secret) throw new Error(`${name} is not set`);
  return secret;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, requireSecret(ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET"), {
    expiresIn: ACCESS_TOKEN_TTL,
  });
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, requireSecret(REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET"), {
    expiresIn: REFRESH_TOKEN_TTL,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, requireSecret(ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET")) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, requireSecret(REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET")) as RefreshTokenPayload;
}

// Refresh tokens are stored server-side only as this hash — the raw JWT never touches the DB,
// so a DB read alone can't be replayed as a session.
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const secure = process.env.NODE_ENV === "production";

  res.cookie(ACCESS_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_COOKIE_MAX_AGE_MS,
  });

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/api/auth/refresh",
    maxAge: REFRESH_COOKIE_MAX_AGE_MS,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE_NAME);
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth/refresh" });
}
