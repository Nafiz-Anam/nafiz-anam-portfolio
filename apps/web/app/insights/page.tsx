import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { ArticlesSection } from "@/components/sections/insights/ArticlesSection";
import { InsightsFAQ } from "@/components/sections/insights/InsightsFAQ";
import { fetchBlogList } from "@/lib/blog";

const TITLE = "Insights | Nafiz Anam — Engineering Leadership & Technical Notes";
const DESCRIPTION =
  "Practical lessons on software architecture, engineering leadership, and building technology that businesses can actually depend on.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/insights" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Insights | Nafiz Anam",
    description: DESCRIPTION,
    url: "/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Nafiz Anam",
    description: DESCRIPTION,
  },
};

export default async function InsightsPage() {
  const { posts, categories, total } = await fetchBlogList({ limit: 12 });

  const avgReadTime =
    posts.length > 0
      ? `${Math.round(posts.reduce((sum, p) => sum + p.readTimeMinutes, 0) / posts.length)} min`
      : "—";

  const insightsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/insights#blog`,
        url: `${SITE_URL}/insights`,
        name: "Insights — Nafiz Anam",
        description: DESCRIPTION,
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
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How often do you publish?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No fixed schedule. I write when I have something genuinely useful to say, not to hit a quota.",
            },
          },
          {
            "@type": "Question",
            name: "What topics do you cover?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mostly software architecture, engineering leadership, and the technical decisions founders and growing businesses get wrong most often. Occasionally, lessons from running Agilo IT and Syrona IT directly.",
            },
          },
          {
            "@type": "Question",
            name: "Can I suggest a topic?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. If there's a technical problem you're wrestling with and can't find a clear answer to, send it through the contact page. It's often exactly the kind of thing worth writing about.",
            },
          },
          {
            "@type": "Question",
            name: "Are these articles technical, or written for business readers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both, depending on the piece. Some go deep on architecture for other engineers. Others are written for founders and business leaders who need to understand a technical tradeoff without needing to implement it themselves.",
            },
          },
        ],
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
      <Nav />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <InsightsHero
          articlesPublished={total}
          topicCount={categories.length}
          avgReadTime={avgReadTime}
        />
      </div>
      <ArticlesSection posts={posts} categories={categories} total={total} initialLimit={12} />
      <InsightsFAQ />
      <Footer />
    </main>
  );
}
