const WEB_URL = process.env.WEB_URL;
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function revalidate(paths: string[]): Promise<void> {
  if (!WEB_URL || !REVALIDATE_SECRET) return;
  try {
    await fetch(`${WEB_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATE_SECRET)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[Revalidate] failed", err);
  }
}
