import { Router } from "express";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";

export const blogCategoriesRouter = Router();

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

blogCategoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.blogCategory.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
  res.json({ categories });
});

blogCategoriesRouter.post("/", requireAuth, async (req, res) => {
  const { name, sortOrder } = req.body as { name?: string; sortOrder?: number };
  if (!name?.trim()) return res.status(400).json({ error: { message: "name required" } });
  const category = await prisma.blogCategory.create({
    data: { name: name.trim(), slug: slugify(name), sortOrder: sortOrder ?? 0 },
  });
  res.status(201).json(category);
});

blogCategoriesRouter.patch("/:id", requireAuth, async (req, res) => {
  const { name, sortOrder } = req.body as { name?: string; sortOrder?: number };
  const data: Record<string, unknown> = {};
  if (name?.trim()) { data.name = name.trim(); data.slug = slugify(name); }
  if (sortOrder !== undefined) data.sortOrder = sortOrder;
  const category = await prisma.blogCategory.update({ where: { id: req.params.id }, data });
  res.json(category);
});

blogCategoriesRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.blogCategory.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
