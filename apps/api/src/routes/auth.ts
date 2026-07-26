import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { prisma } from "@portfolio/db";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  setAuthCookies,
  clearAuthCookies,
  REFRESH_COOKIE_NAME,
} from "../lib/auth";

export const authRouter = Router();

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: "Too many login attempts. Try again in 15 minutes.", code: "RATE_LIMITED" } },
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

async function issueTokenPair(userId: string, email: string) {
  const accessToken = signAccessToken({ sub: userId, email });
  const refreshToken = signRefreshToken({ sub: userId });

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  });

  return { accessToken, refreshToken };
}

authRouter.post("/login", loginLimit, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const { email, password } = parsed.data;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: { message: "invalid credentials", code: "INVALID_CREDENTIALS" } });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: { message: "invalid credentials", code: "INVALID_CREDENTIALS" } });

  const { accessToken, refreshToken } = await issueTokenPair(user.id, user.email);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ user: { id: user.id, email: user.email }, accessToken });
});

authRouter.post("/refresh", async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!token) return res.status(401).json({ error: { message: "no refresh token", code: "REFRESH_TOKEN_MISSING" } });

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ error: { message: "invalid refresh token", code: "REFRESH_TOKEN_INVALID" } });
  }

  const tokenHash = hashToken(token);
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });

  if (!stored || stored.expiresAt < new Date()) {
    return res.status(401).json({ error: { message: "refresh token revoked or expired", code: "REFRESH_TOKEN_INVALID" } });
  }

  // Reuse detection: token was already revoked — breach signal, revoke all tokens for this user
  if (stored.revokedAt) {
    console.error(`[Auth] refresh token reuse detected for userId=${stored.userId} — revoking all tokens`);
    await prisma.refreshToken.updateMany({ where: { userId: stored.userId }, data: { revokedAt: new Date() } });
    clearAuthCookies(res);
    return res.status(401).json({ error: { message: "session invalidated — please log in again", code: "REFRESH_TOKEN_REUSE" } });
  }

  const user = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
  if (!user) return res.status(401).json({ error: { message: "user not found", code: "REFRESH_TOKEN_INVALID" } });

  // Rotation: revoke the used token before issuing a new pair
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });

  const { accessToken, refreshToken } = await issueTokenPair(user.id, user.email);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ user: { id: user.id, email: user.email }, accessToken });
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

authRouter.post("/change-password", async (req, res) => {
  const bearer = req.headers.authorization?.match(/^Bearer\s+(.+)$/)?.[1];
  const token = bearer ?? req.cookies?.portfolio_access_pub;
  if (!token) return res.status(401).json({ error: { message: "unauthenticated" } });

  let payload;
  try {
    const { verifyAccessToken } = await import("../lib/auth");
    payload = verifyAccessToken(token);
  } catch {
    return res.status(401).json({ error: { message: "invalid token" } });
  }

  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });
  }

  const user = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
  if (!user) return res.status(404).json({ error: { message: "user not found" } });

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!valid) return res.status(400).json({ error: { message: "current password incorrect", code: "WRONG_PASSWORD" } });

  const newHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: newHash } });

  res.json({ ok: true });
});

authRouter.post("/logout", async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  if (token) {
    await prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  clearAuthCookies(res);
  res.status(204).send();
});
