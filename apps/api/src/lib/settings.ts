import { prisma } from "@portfolio/db";
import { decrypt } from "./crypto";

/** Admin-managed secret (CMS Settings → Integrations), falling back to an env var. */
export async function getSetting(key: string, envFallback?: string): Promise<string | undefined> {
  const row = await prisma.siteSecret.findUnique({ where: { key } });
  if (row?.value) return decrypt(row.value);
  return envFallback ? process.env[envFallback] : undefined;
}
