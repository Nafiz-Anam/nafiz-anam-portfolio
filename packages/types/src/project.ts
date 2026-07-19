import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(120),
  slug: z.string().min(1).max(140),
  summary: z.string().max(280),
  content: z.string(),
  coverImageUrl: z.string().url().nullable(),
  published: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Project = z.infer<typeof projectSchema>;

export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
