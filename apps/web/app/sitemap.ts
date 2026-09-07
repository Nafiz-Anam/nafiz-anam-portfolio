import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SERVER_API as API } from "@/lib/api-url";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

async function getPublishedSlugs(
  path: string,
  key: "projects" | "posts"
): Promise<{ slug: string; updatedAt: string }[]> {
  // API caps `limit` at 50 per page (see apps/api/src/routes/{projects,blog}.ts),
  // so a single request silently truncates once published count exceeds 50 — paginate.
  const out: { slug: string; updatedAt: string }[] = [];
  let page = 1;
  const limit = 50;
  try {
    for (;;) {
      const res = await fetch(`${API}/${path}?limit=${limit}&page=${page}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;
      const data = (await res.json()) as {
        projects?: { slug: string; updatedAt: string }[];
        posts?: { slug: string; updatedAt: string }[];
        totalPages?: number;
      };
      const items = (data[key] as { slug: string; updatedAt: string }[]) ?? [];
      out.push(...items);
      if (page >= (data.totalPages ?? 1) || items.length === 0) break;
      page++;
    }
    return out;
  } catch {
    return out;
  }
}

async function getServiceSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API}/services?limit=100`, { next: { revalidate: 3600 } });
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
