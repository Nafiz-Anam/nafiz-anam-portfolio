import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { ArticlesSection } from "@/components/sections/insights/ArticlesSection";
import { NewsletterSection } from "@/components/sections/insights/NewsletterSection";
import { fetchBlogList } from "@/lib/blog";

export const metadata = {
  title: "Insights — Nafiz Anam",
  description:
    "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
};

export default async function InsightsPage() {
  const { posts, categories } = await fetchBlogList({ limit: 50 });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <InsightsHero />
      </div>
      <ArticlesSection posts={posts} categories={categories} />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
