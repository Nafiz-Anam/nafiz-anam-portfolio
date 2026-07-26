import { Router } from "express";
import { prisma } from "@portfolio/db";
import { createProjectSchema, updateProjectSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { revalidate } from "../lib/revalidate";

const PROJECT_PATHS = ["/", "/case-studies", "/case-studies/[slug]", "/sitemap.xml"];

export const projectsRouter = Router();

const LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImageUrl: true,
  industry: true,
  tags: true,
  client: true,
  role: true,
  outcome: true,
  year: true,
  status: true,
  publishedAt: true,
  updatedAt: true,
};

// Public: list published projects
projectsRouter.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
  const industry = req.query.industry as string | undefined;
  const tag = req.query.tag as string | undefined;
  const skip = (page - 1) * limit;

  const search = req.query.search as string | undefined;

  const where: Record<string, unknown> = { status: "published" };
  if (industry) where.industry = industry;
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { client: { contains: search, mode: "insensitive" } },
      { industry: { contains: search, mode: "insensitive" } },
    ];
  }

  const [projects, total, industries] = await Promise.all([
    prisma.project.findMany({ where, select: LIST_SELECT, orderBy: { publishedAt: "desc" }, skip, take: limit }),
    prisma.project.count({ where }),
    prisma.project.findMany({
      where: { status: "published" },
      select: { industry: true },
      distinct: ["industry"],
      orderBy: { industry: "asc" },
    }),
  ]);

  res.json({
    projects,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    industries: industries.map((p) => p.industry).filter(Boolean),
  });
});

// Admin list — must come before /:slug
projectsRouter.get("/admin/list", requireAuth, async (req, res) => {
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { client: { contains: search, mode: "insensitive" } },
    ];
  }

  const projects = await prisma.project.findMany({ where, select: LIST_SELECT, orderBy: { updatedAt: "desc" }, take: limit });
  res.json({ projects });
});

// must come before /:slug
projectsRouter.get("/id/:id", requireAuth, async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!project) return res.status(404).json({ error: { message: "not found" } });
  res.json(project);
});

// Public: single project with prev/next/related
// Preview token bypasses published filter
projectsRouter.get("/:slug", async (req, res) => {
  const previewToken = req.query.token as string | undefined;
  const isPreview = previewToken && previewToken === process.env.REVALIDATE_SECRET;
  const project = await prisma.project.findFirst({
    where: { slug: req.params.slug, ...(isPreview ? {} : { status: "published" }) },
  });
  if (!project) return res.status(404).json({ error: { message: "not found" } });

  const [prev, next, related] = await Promise.all([
    prisma.project.findFirst({
      where: { status: "published", publishedAt: { lt: project.publishedAt ?? project.createdAt } },
      select: { slug: true, title: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.project.findFirst({
      where: { status: "published", publishedAt: { gt: project.publishedAt ?? project.createdAt } },
      select: { slug: true, title: true },
      orderBy: { publishedAt: "asc" },
    }),
    prisma.project.findMany({
      where: { status: "published", industry: project.industry, slug: { not: project.slug } },
      select: LIST_SELECT,
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  res.json({ project, prev, next, related });
});

projectsRouter.post("/", requireAuth, async (req, res) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const data = parsed.data;
  if (data.status === "published" && !data.publishedAt) {
    (data as Record<string, unknown>).publishedAt = new Date();
  }

  const project = await prisma.project.create({ data: data as Parameters<typeof prisma.project.create>[0]["data"] });
  void revalidate(PROJECT_PATHS);
  res.status(201).json(project);
});

projectsRouter.patch("/:id", requireAuth, async (req, res) => {
  const parsed = updateProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });

  const data = parsed.data;
  if (data.status === "published") {
    const current = await prisma.project.findUnique({ where: { id: req.params.id }, select: { publishedAt: true } });
    if (!current?.publishedAt) (data as Record<string, unknown>).publishedAt = new Date();
  }

  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: data as Parameters<typeof prisma.project.update>[0]["data"],
  });
  void revalidate(PROJECT_PATHS);
  res.json(project);
});

projectsRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  void revalidate(PROJECT_PATHS);
  res.status(204).send();
});
