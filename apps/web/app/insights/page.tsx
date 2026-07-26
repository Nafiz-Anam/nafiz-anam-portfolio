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
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — Nafiz Anam",
    description:
      "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
    images: ["/opengraph-image"],
  },
};

export default async function InsightsPage() {
  const { posts, categories, total } = await fetchBlogList({ limit: 12 });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <InsightsHero />
      </div>
      <ArticlesSection posts={posts} categories={categories} total={total} initialLimit={12} />
      <Footer />
    </main>
  );
}
