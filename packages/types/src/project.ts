import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().default(""),
  coverImageUrl: z.string().nullable(),
  industry: z.string().default(""),
  tags: z.array(z.string()).default([]),
  contentJson: z.any().nullable(),
  contentHtml: z.string().default(""),
  client: z.string().default(""),
  role: z.string().default(""),
  outcome: z.string().default(""),
  year: z.string().default(""),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.coerce.date().nullable(),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Project = z.infer<typeof projectSchema>;

export const createProjectSchema = projectSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export const projectListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  coverImageUrl: z.string().nullable(),
  industry: z.string(),
  tags: z.array(z.string()),
  client: z.string(),
  role: z.string(),
  outcome: z.string(),
  year: z.string(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date(),
});

export type ProjectListItem = z.infer<typeof projectListItemSchema>;

export type ProjectListResult = {
  projects: ProjectListItem[];
  total: number;
  page: number;
  totalPages: number;
  industries: string[];
};

export type ProjectSingleResult = {
  project: Project;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  related: ProjectListItem[];
};
