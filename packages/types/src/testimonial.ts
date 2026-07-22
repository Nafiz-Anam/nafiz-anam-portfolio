import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string().cuid(),
  quote: z.string().min(1),
  name: z.string().min(1).max(120),
  role: z.string().max(200),
  company: z.string().default(""),
  photoUrl: z.string().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

export const createTestimonialSchema = testimonialSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;

export const updateTestimonialSchema = createTestimonialSchema.partial();
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
