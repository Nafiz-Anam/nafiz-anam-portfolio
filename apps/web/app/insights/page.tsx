const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { ArticlesSection } from "@/components/sections/insights/ArticlesSection";
import { fetchBlogList } from "@/lib/blog";

export const metadata = {
  title: "Insights",
  description:
    "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — Nafiz Anam",
    description:
      "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
    url: "/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — Nafiz Anam",
    description:
      "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
  },
};

export default async function InsightsPage() {
  const { posts, categories, total } = await fetchBlogList({ limit: 12 });

  const insightsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/insights#blog`,
        url: `${SITE_URL}/insights`,
        name: "Insights — Nafiz Anam",
        description: "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
        author: { "@id": `${SITE_URL}/#person` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/insights/${p.slug}`,
          headline: p.title,
          url: `${SITE_URL}/insights/${p.slug}`,
          description: p.excerpt,
          ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <InsightsHero />
      </div>
      <ArticlesSection posts={posts} categories={categories} total={total} initialLimit={12} />
      <Footer />
    </main>
  );
}
