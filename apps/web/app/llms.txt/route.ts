import type { BlogListItem } from "@portfolio/types";
import { SERVER_API as API } from "@/lib/api-url";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const INSIGHTS_FALLBACK = "Articles on engineering, ecommerce, and automation.";

async function getPosts(): Promise<BlogListItem[]> {
  try {
    const res = await fetch(`${API}/blog?limit=50`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: BlogListItem[] };
    return data.posts ?? [];
  } catch {
    return [];
  }
}

// Describe Insights from the categories actually published, most frequent first.
function describeInsights(posts: BlogListItem[]): string {
  const counts = new Map<string, number>();
  for (const p of posts) {
    const c = p.category?.trim();
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  const topics = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([c]) => c);
  return topics.length ? `Articles on ${topics.join(", ")}.` : INSIGHTS_FALLBACK;
}

export async function GET() {
  const posts = await getPosts();

  const recent = posts
    .slice(0, 10)
    .map((p) => `- [${p.title}](${SITE_URL}/insights/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const body = `# Nafiz Anam

> Technology & Product Partner for growth-stage businesses and funded founders. Diagnoses the real problem behind a technical bottleneck, decides the right direction, and leads or executes the fix. Services span custom software development, SaaS product engineering, AI automation, technical consulting/architecture, cloud infrastructure/DevOps, and engineering leadership. Based in Khulna, Bangladesh; works with clients worldwide. Founder of Agilo IT; also behind Syrona IT / Servero.io (server-side Google Tag Manager hosting for ecommerce brands).

## Core pages

- [About](${SITE_URL}/about): Background, career timeline, leadership experience, and values.
- [Services](${SITE_URL}/services): Overview of all service lines.
- [How I Work](${SITE_URL}/how-i-work): Engagement process, communication, and delivery approach.
- [Case Studies](${SITE_URL}/case-studies): Real client engagements with measurable business outcomes.
- [Insights](${SITE_URL}/insights): ${describeInsights(posts)}
- [Contact](${SITE_URL}/contact): Get in touch or book a discovery call.

## Services

- [Custom Software Development](${SITE_URL}/services/custom-software-development)
- [SaaS Product Engineering](${SITE_URL}/services/saas-product-engineering)
- [AI Automation & Business Systems](${SITE_URL}/services/ai-automation-business-systems)
- [Technical Consulting & Architecture](${SITE_URL}/services/technical-consulting-architecture)
- [Cloud Infrastructure & DevOps](${SITE_URL}/services/cloud-infrastructure-devops)
- [Engineering Leadership](${SITE_URL}/services/engineering-leadership)
- [Tracking & Analytics](${SITE_URL}/services/tracking-analytics)
- [Ecommerce Engineering](${SITE_URL}/services/ecommerce-engineering)
${recent ? `\n## Recent Insights\n\n${recent}\n` : ""}
## Machine-readable

- [Sitemap](${SITE_URL}/sitemap.xml): Full list of indexable URLs.
- [RSS feed](${SITE_URL}/feed.xml): Latest Insights articles.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
