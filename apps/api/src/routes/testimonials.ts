import { Router } from "express";
import { prisma } from "@portfolio/db";
import { createTestimonialSchema, updateTestimonialSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";

export const testimonialsRouter = Router();

// Public: published testimonials (optionally featured only)
testimonialsRouter.get("/", async (req, res) => {
  const featured = req.query.featured === "true";
  const where = featured
    ? { published: true, featured: true }
    : { published: true };
  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  res.json({ testimonials });
});

// Admin: all testimonials
testimonialsRouter.get("/admin/list", requireAuth, async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  res.json({ testimonials });
});

testimonialsRouter.get("/:id", requireAuth, async (req, res) => {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: req.params.id } });
  if (!testimonial) return res.status(404).json({ error: { message: "not found" } });
  res.json(testimonial);
});

testimonialsRouter.post("/", requireAuth, async (req, res) => {
  const parsed = createTestimonialSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });
  const testimonial = await prisma.testimonial.create({ data: parsed.data });
  res.status(201).json(testimonial);
});

testimonialsRouter.patch("/:id", requireAuth, async (req, res) => {
  const parsed = updateTestimonialSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });
  const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(testimonial);
});

testimonialsRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
