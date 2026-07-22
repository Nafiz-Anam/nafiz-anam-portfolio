import type { ProjectListResult, ProjectSingleResult } from "@portfolio/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchJson<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function fetchProjectList(params?: {
  industry?: string;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<ProjectListResult> {
  const qs = new URLSearchParams();
  if (params?.industry) qs.set("industry", params.industry);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  const result = await fetchJson<ProjectListResult>(`/projects${suffix}`);
  return result ?? { projects: [], total: 0, page: 1, totalPages: 1, industries: [] };
}

export async function fetchProject(slug: string): Promise<ProjectSingleResult | null> {
  return fetchJson<ProjectSingleResult>(`/projects/${encodeURIComponent(slug)}`);
}
