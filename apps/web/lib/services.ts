import type { Service, ServiceContentJson } from "@portfolio/types";
import { getServiceBySlug as getStaticService, SERVICE_PAGES, type ServicePageData } from "./service-pages";
import { SERVER_API as API } from "./api-url";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

function dbToPageData(s: Service): ServicePageData {
  const c = (s.contentJson ?? {}) as Partial<ServiceContentJson>;
  return {
    slug: s.slug,
    metaTitle: s.metaTitle || s.title,
    metaDescription: s.metaDescription || "",
    tagline: s.tagline,
    headline: s.headline,
    headlineAccent: s.headlineAccent,
    description: s.description,
    problems: c.problems ?? [],
    deliverables: c.deliverables ?? [],
    process: c.process ?? [],
    idealFor: c.idealFor ?? [],
    technologies: c.technologies ?? [],
    faqs: c.faqs ?? [],
  };
}

export async function getServicePageData(slug: string): Promise<ServicePageData | null> {
  const fromDb = await fetchJson<{ service: Service }>(`/services/${encodeURIComponent(slug)}`);
  if (fromDb?.service) return dbToPageData(fromDb.service);
  return getStaticService(slug) ?? null;
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const fromDb = await fetchJson<{ services: Pick<Service, "slug">[] }>("/services");
  if (fromDb?.services?.length) return fromDb.services.map((s) => s.slug);
  return SERVICE_PAGES.map((s) => s.slug);
}
