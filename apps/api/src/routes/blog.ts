import { Router } from "express";
import { prisma } from "@portfolio/db";
import { createBlogPostSchema, updateBlogPostSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";

export const blogRouter = Router();

blogRouter.get("/", async (_req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  res.json(posts);
});

blogRouter.get("/:slug", async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ error: { message: "not found" } });
  res.json(post);
});

blogRouter.post("/", requireAuth, async (req, res) => {
  const parsed = createBlogPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const post = await prisma.blogPost.create({ data: parsed.data });
  res.status(201).json(post);
});

blogRouter.patch("/:id", requireAuth, async (req, res) => {
  const parsed = updateBlogPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json(post);
});

blogRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
