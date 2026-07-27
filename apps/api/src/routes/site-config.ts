import { Router } from "express";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";
import { revalidate } from "../lib/revalidate";

const CONFIG_PATHS = ["/", "/contact", "/sitemap.xml"];

export const siteConfigRouter = Router();

// Public: read all config (safe to expose — no secrets stored here)
siteConfigRouter.get("/", async (_req, res) => {
  const rows = await prisma.siteConfig.findMany();
  const config = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json({ config });
});

// Admin: upsert a key
siteConfigRouter.put("/:key", requireAuth, async (req, res) => {
  const { value, label } = req.body as { value?: string; label?: string };
  if (value === undefined) return res.status(400).json({ error: { message: "value required" } });

  const row = await prisma.siteConfig.upsert({
    where: { key: req.params.key },
    update: { value, ...(label !== undefined && { label }) },
    create: { key: req.params.key!, value, label: label ?? req.params.key! },
  });
  void revalidate(CONFIG_PATHS);
  res.json(row);
});

siteConfigRouter.delete("/:key", requireAuth, async (req, res) => {
  await prisma.siteConfig.delete({ where: { key: req.params.key } });
  void revalidate(CONFIG_PATHS);
  res.status(204).send();
});
