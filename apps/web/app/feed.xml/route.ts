import type { BlogListItem } from "@portfolio/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  let posts: BlogListItem[] = [];
  try {
    const res = await fetch(`${API}/api/blog?limit=50`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = (await res.json()) as { posts: BlogListItem[] };
      posts = data.posts ?? [];
    }
  } catch {
    // return empty feed on API failure
  }

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/insights/${post.slug}`;
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : "";
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.excerpt)}</description>
      <category>${escape(post.category)}</category>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nafiz Anam — Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Practical engineering insights, architecture lessons, and technical leadership perspectives.</description>
    <language>en-us</language>
    <managingEditor>ashiqur.marketer@gmail.com (Nafiz Anam)</managingEditor>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
