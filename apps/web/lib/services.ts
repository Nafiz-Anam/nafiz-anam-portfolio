import { getServiceBySlug as getStaticService, SERVICE_PAGES, type ServicePageData } from "./service-pages";

export async function getServicePageData(slug: string): Promise<ServicePageData | null> {
  return getStaticService(slug) ?? null;
}

export async function getAllServiceSlugs(): Promise<string[]> {
  return SERVICE_PAGES.map((s) => s.slug);
}

export type { ServicePageData };
