import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { FounderIntro } from "@/components/sections/about/FounderIntro";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { CompaniesVentures } from "@/components/sections/about/CompaniesVentures";
import { NumbersMatter } from "@/components/sections/about/NumbersMatter";
import { FAQSection } from "@/components/sections/about/FAQSection";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata = {
  title: "About",
  description:
    "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Nafiz Anam",
    description:
      "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
    url: "/about",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Nafiz Anam",
    description:
      "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <AboutHero />
      </div>
      <FounderIntro />
      <CareerTimeline />
      <LeadershipSection />
      <CoreValues />
      <CompaniesVentures />
      <NumbersMatter />
      <FAQSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}
