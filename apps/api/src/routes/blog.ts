import { Router } from "express";
import { prisma } from "@portfolio/db";
import { createBlogPostSchema, updateBlogPostSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { revalidate } from "../lib/revalidate";

const BLOG_PATHS = ["/", "/insights", "/insights/[slug]", "/feed.xml", "/sitemap.xml"];

export const blogRouter = Router();

const LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImageUrl: true,
  category: true,
  tags: true,
  readTimeMinutes: true,
  status: true,
  publishedAt: true,
  authorName: true,
  updatedAt: true,
};

// Public: list published posts (paginated, filterable)
blogRouter.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
  const category = req.query.category as string | undefined;
  const tag = req.query.tag as string | undefined;
  const skip = (page - 1) * limit;

  const search = req.query.search as string | undefined;

  const where: Record<string, unknown> = { status: "published" };
  if (category) where.category = category;
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total, categories] = await Promise.all([
    prisma.blogPost.findMany({ where, select: LIST_SELECT, orderBy: { publishedAt: "desc" }, skip, take: limit }),
    prisma.blogPost.count({ where }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  res.json({
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    categories: categories.map((c) => c.category).filter(Boolean),
  });
});

// must come before /:slug
blogRouter.get("/admin/list", requireAuth, async (req, res) => {
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  const posts = await prisma.blogPost.findMany({ where, select: LIST_SELECT, orderBy: { updatedAt: "desc" }, take: limit });
  res.json({ posts });
});

blogRouter.get("/id/:id", requireAuth, async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
  if (!post) return res.status(404).json({ error: { message: "not found" } });
  res.json(post);
});

// Public: single post with prev/next/related
// If preview token matches REVALIDATE_SECRET, returns draft posts too
blogRouter.get("/:slug", async (req, res) => {
  const previewToken = req.query.token as string | undefined;
  const isPreview = previewToken && previewToken === process.env.REVALIDATE_SECRET;
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, ...(isPreview ? {} : { status: "published" }) },
  });
  if (!post) return res.status(404).json({ error: { message: "not found" } });

  const [prev, next, related] = await Promise.all([
    prisma.blogPost.findFirst({
      where: { status: "published", publishedAt: { lt: post.publishedAt ?? post.createdAt } },
      select: { slug: true, title: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.blogPost.findFirst({
      where: { status: "published", publishedAt: { gt: post.publishedAt ?? post.createdAt } },
      select: { slug: true, title: true },
      orderBy: { publishedAt: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { status: "published", category: post.category, slug: { not: post.slug } },
      select: LIST_SELECT,
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  res.json({ post, prev, next, related });
});


blogRouter.post("/", requireAuth, async (req, res) => {
  const parsed = createBlogPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const data = parsed.data;
  if (data.status === "published" && !data.publishedAt) {
    (data as Record<string, unknown>).publishedAt = new Date();
  }

  const post = await prisma.blogPost.create({ data: data as Parameters<typeof prisma.blogPost.create>[0]["data"] });
  void revalidate(BLOG_PATHS);
  res.status(201).json(post);
});

blogRouter.patch("/:id", requireAuth, async (req, res) => {
  const parsed = updateBlogPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const data = parsed.data;
  if (data.status === "published") {
    const current = await prisma.blogPost.findUnique({ where: { id: req.params.id }, select: { publishedAt: true } });
    if (!current?.publishedAt) (data as Record<string, unknown>).publishedAt = new Date();
  }

  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data: data as Parameters<typeof prisma.blogPost.update>[0]["data"],
  });
  void revalidate(BLOG_PATHS);
  res.json(post);
});

blogRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  void revalidate(BLOG_PATHS);
  res.status(204).send();
});
