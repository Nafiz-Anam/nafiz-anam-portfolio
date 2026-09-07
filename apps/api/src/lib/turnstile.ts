import { getSetting } from "./settings";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** CMS-managed (SiteSecret), falling back to env — see getSetting(). */
export async function verifyTurnstile(token: unknown, remoteIp?: string): Promise<boolean> {
  if (typeof token !== "string" || !token) return false;

  const secret = await getSetting("turnstile_secret_key", "TURNSTILE_SECRET_KEY");
  if (!secret) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[Turnstile] verification request failed:", err);
    return false;
  }
}
