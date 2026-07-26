import { Router } from "express";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";

export const statsRouter = Router();

statsRouter.get("/", requireAuth, async (_req, res) => {
  const [
    totalPosts, publishedPosts,
    totalProjects, publishedProjects,
    totalTestimonials, publishedTestimonials,
    totalLeads, newLeads,
    recentLeads,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "published" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { published: true } }),
    prisma.contactLead.count(),
    prisma.contactLead.count({ where: { status: "new" } }),
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  res.json({
    posts: { total: totalPosts, published: publishedPosts, draft: totalPosts - publishedPosts },
    projects: { total: totalProjects, published: publishedProjects, draft: totalProjects - publishedProjects },
    testimonials: { total: totalTestimonials, published: publishedTestimonials },
    leads: { total: totalLeads, new: newLeads },
    recentLeads,
  });
});
