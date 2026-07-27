import type { BlogListResult, BlogSingleResult } from "@portfolio/types";
import { SERVER_API as API } from "./api-url";

async function fetchJson<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function fetchBlogList(params?: {
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<BlogListResult> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  const result = await fetchJson<BlogListResult>(`/blog${suffix}`);
  return result ?? { posts: [], total: 0, page: 1, totalPages: 1, categories: [] };
}

export async function fetchBlogPost(slug: string, preview = false): Promise<BlogSingleResult | null> {
  const token = preview ? process.env.REVALIDATE_SECRET : undefined;
  const qs = token ? `?token=${encodeURIComponent(token)}` : "";
  return fetchJson<BlogSingleResult>(`/blog/${encodeURIComponent(slug)}${qs}`, preview ? 0 : 60);
}
