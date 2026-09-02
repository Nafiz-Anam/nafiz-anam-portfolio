import { Router } from "express";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";
import { getAuthUrl, exchangeCode, encrypt, decrypt } from "../lib/googleCalendar";
import { getSetting } from "../lib/settings";

export const googleAuthRouter = Router();

const CMS_URL = process.env.CORS_ORIGIN_CMS ?? "http://localhost:3001";

/** GET /api/google-calendar/connect — admin-only, redirects to Google OAuth */
googleAuthRouter.get("/connect", requireAuth, async (_req, res) => {
  const clientId = await getSetting("google_client_id", "GOOGLE_CLIENT_ID");
  if (!clientId) {
    res.status(503).json({ error: { message: "Google Calendar not configured" } });
    return;
  }
  const url = await getAuthUrl("portfolio-admin");
  res.redirect(url);
});

/** GET /api/google-calendar/callback — Google redirects here after consent */
googleAuthRouter.get("/callback", async (req, res) => {
  const { code, error } = req.query as { code?: string; error?: string };
  const redirectBase = `${CMS_URL}/settings`;

  if (error || !code) {
    res.redirect(`${redirectBase}?cal=error`);
    return;
  }

  try {
    const { refreshToken, email } = await exchangeCode(code);
    const encrypted = encrypt(refreshToken);

    await prisma.googleCalendarToken.deleteMany({});
    await prisma.googleCalendarToken.create({
      data: { refreshToken: encrypted, email },
    });

    res.redirect(`${redirectBase}?cal=connected`);
  } catch (err) {
    console.error("[GoogleAuth] callback error", err);
    res.redirect(`${redirectBase}?cal=error`);
  }
});

/** GET /api/google-calendar/status — admin: is calendar connected? */
googleAuthRouter.get("/status", requireAuth, async (_req, res) => {
  const token = await prisma.googleCalendarToken.findFirst({
    select: { email: true, updatedAt: true },
  });
  res.json({ connected: !!token, email: token?.email ?? null, updatedAt: token?.updatedAt ?? null });
});

/** DELETE /api/google-calendar/disconnect — admin: remove stored token */
googleAuthRouter.delete("/disconnect", requireAuth, async (_req, res) => {
  await prisma.googleCalendarToken.deleteMany({});
  res.json({ connected: false });
});

/** GET /api/google-calendar/refresh-token — internal helper to get decrypted token */
export async function getStoredRefreshToken(): Promise<string | null> {
  const row = await prisma.googleCalendarToken.findFirst();
  if (!row) return null;
  try {
    return decrypt(row.refreshToken);
  } catch {
    return null;
  }
}

export async function getStoredEmail(): Promise<string> {
  const row = await prisma.googleCalendarToken.findFirst({ select: { email: true } });
  return row?.email ?? "";
}
