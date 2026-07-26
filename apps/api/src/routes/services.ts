import { Router } from "express";
import { prisma } from "@portfolio/db";
import { createServiceSchema, updateServiceSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { revalidate } from "../lib/revalidate";

export const servicesRouter = Router();

const SERVICE_PATHS = ["/services", "/services/[slug]", "/sitemap.xml"];

const LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  tagline: true,
  status: true,
  sortOrder: true,
  updatedAt: true,
};

// Public: list published services
servicesRouter.get("/", async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { status: "published" },
    select: LIST_SELECT,
    orderBy: { sortOrder: "asc" },
  });
  res.json({ services });
});

// Admin: full list (all statuses)
servicesRouter.get("/admin/list", requireAuth, async (_req, res) => {
  const services = await prisma.service.findMany({
    select: { ...LIST_SELECT, metaTitle: true },
    orderBy: { sortOrder: "asc" },
  });
  res.json({ services });
});

// Public: single service by slug
servicesRouter.get("/:slug", async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { slug: req.params.slug },
  });
  if (!service || service.status !== "published") {
    res.status(404).json({ error: { message: "Not found" } });
    return;
  }
  res.json({ service });
});

// Admin: get single for editing (any status)
servicesRouter.get("/admin/:id", requireAuth, async (req, res) => {
  const service = await prisma.service.findUnique({ where: { id: req.params.id } });
  if (!service) { res.status(404).json({ error: { message: "Not found" } }); return; }
  res.json({ service });
});

// Admin: create
servicesRouter.post("/", requireAuth, async (req, res) => {
  const parsed = createServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: { message: "Invalid input", details: parsed.error.flatten() } });
    return;
  }
  const service = await prisma.service.create({ data: parsed.data as Parameters<typeof prisma.service.create>[0]["data"] });
  void revalidate(SERVICE_PATHS);
  res.status(201).json({ service });
});

// Admin: update
servicesRouter.patch("/:id", requireAuth, async (req, res) => {
  const parsed = updateServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: { message: "Invalid input", details: parsed.error.flatten() } });
    return;
  }
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: parsed.data as Parameters<typeof prisma.service.update>[0]["data"],
  });
  void revalidate(SERVICE_PATHS);
  res.json({ service });
});

// Admin: delete
servicesRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  void revalidate(SERVICE_PATHS);
  res.status(204).send();
});
