import { z } from "zod";

export const serviceProblemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const serviceDeliverableSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const serviceProcessStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
});

export const serviceIdealForSchema = z.object({
  type: z.string(),
  description: z.string(),
});

export const serviceFaqSchema = z.object({
  q: z.string(),
  a: z.string(),
});

export const serviceContentJsonSchema = z.object({
  problems: z.array(serviceProblemSchema).default([]),
  deliverables: z.array(serviceDeliverableSchema).default([]),
  process: z.array(serviceProcessStepSchema).default([]),
  idealFor: z.array(serviceIdealForSchema).default([]),
  technologies: z.array(z.string()).default([]),
  faqs: z.array(serviceFaqSchema).default([]),
});

export const createServiceSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "slug must be lowercase-kebab"),
  title: z.string().min(1).max(200),
  tagline: z.string().max(300).default(""),
  status: z.enum(["published", "draft"]).default("published"),
  sortOrder: z.number().int().default(0),
  metaTitle: z.string().max(200).default(""),
  metaDescription: z.string().max(500).default(""),
  headline: z.string().max(300).default(""),
  headlineAccent: z.string().max(300).default(""),
  description: z.string().default(""),
  contentJson: serviceContentJsonSchema.optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const serviceSchema = createServiceSchema.extend({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ServiceContentJson = z.infer<typeof serviceContentJsonSchema>;
export type CreateService = z.infer<typeof createServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
export type Service = z.infer<typeof serviceSchema>;
