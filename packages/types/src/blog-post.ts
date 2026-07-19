import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(160),
  slug: z.string().min(1).max(180),
  excerpt: z.string().max(280),
  contentHtml: z.string(),
  coverImageUrl: z.string().url().nullable(),
  published: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export const createBlogPostSchema = blogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
