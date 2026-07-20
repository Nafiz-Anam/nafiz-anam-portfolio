import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { ArticlesSection } from "@/components/sections/insights/ArticlesSection";
import { PopularGuides } from "@/components/sections/insights/PopularGuides";
import { SeriesSection } from "@/components/sections/insights/SeriesSection";
import { NewsletterSection } from "@/components/sections/insights/NewsletterSection";

export const metadata = {
  title: "Insights — Nafiz Anam",
  description:
    "Practical engineering insights, architecture lessons, and technical leadership perspectives from Lead Software Engineer and Founder Nafiz Anam.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <InsightsHero />
      </div>
      <ArticlesSection />
      <PopularGuides />
      <SeriesSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
