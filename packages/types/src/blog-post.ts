import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string(),
  coverImageUrl: z.string().nullable(),
  category: z.string().default(""),
  tags: z.array(z.string()).default([]),
  contentJson: z.any().nullable(),
  contentHtml: z.string().default(""),
  readTimeMinutes: z.number().int().min(1).default(1),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.coerce.date().nullable(),
  authorName: z.string().default("Nafiz Anam"),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
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

export const blogListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  coverImageUrl: z.string().nullable(),
  category: z.string(),
  tags: z.array(z.string()),
  readTimeMinutes: z.number(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.coerce.date().nullable(),
  authorName: z.string(),
  updatedAt: z.coerce.date(),
});

export type BlogListItem = z.infer<typeof blogListItemSchema>;

export type BlogListResult = {
  posts: BlogListItem[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
};

export type BlogSingleResult = {
  post: BlogPost;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  related: BlogListItem[];
};

export const blogCategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(80),
  slug: z.string().min(1).max(80),
  sortOrder: z.number().int().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BlogCategory = z.infer<typeof blogCategorySchema>;
