import { Router } from "express";
import { prisma } from "@portfolio/db";
import { upsertSiteSecretSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { encrypt, decrypt } from "../lib/crypto";

export const siteSecretsRouter = Router();

// Admin-only: unlike /site-config, these values are sensitive (SMTP creds, OAuth secrets).
siteSecretsRouter.get("/", requireAuth, async (_req, res) => {
  const rows = await prisma.siteSecret.findMany();
  const secrets = Object.fromEntries(rows.map((r) => [r.key, decrypt(r.value)]));
  res.json({ secrets });
});

siteSecretsRouter.put("/:key", requireAuth, async (req, res) => {
  const parsed = upsertSiteSecretSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const row = await prisma.siteSecret.upsert({
    where: { key: req.params.key },
    update: { value: encrypt(parsed.data.value) },
    create: { key: req.params.key!, value: encrypt(parsed.data.value) },
  });
  res.json({ key: row.key, updatedAt: row.updatedAt });
});
