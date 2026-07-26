import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/lib/service-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getPublishedSlugs(
  path: string,
  key: "projects" | "posts"
): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API}/api/${path}?limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      projects?: { slug: string; updatedAt: string }[];
      posts?: { slug: string; updatedAt: string }[];
    };
    return (data[key] as { slug: string; updatedAt: string }[]) ?? [];
  } catch {
    return [];
  }
}

async function getServiceSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API}/api/services?limit=100`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error();
    const data = (await res.json()) as { services?: { slug: string; updatedAt: string }[] };
    if (data.services?.length) return data.services;
    throw new Error("empty");
  } catch {
    return SERVICE_PAGES.map((s) => ({ slug: s.slug, updatedAt: new Date().toISOString() }));
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, services] = await Promise.all([
    getPublishedSlugs("projects", "projects"),
    getPublishedSlugs("blog", "posts"),
    getServiceSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/insights`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/case-studies/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/insights/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
