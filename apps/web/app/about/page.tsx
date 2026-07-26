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

function tryParseJSON<T>(value: string | undefined): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

export default async function AboutPage() {
  let config: Record<string, string> = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/site-config`,
      { next: { revalidate: 300 } }
    );
    if (res.ok) {
      const data = await res.json() as { config: Record<string, string> };
      config = data.config ?? {};
    }
  } catch {
    // fall back to hardcoded data in each component
  }

  const milestones = tryParseJSON<Parameters<typeof CareerTimeline>[0]["milestones"]>(config["about_career_json"]);
  const values = tryParseJSON<Parameters<typeof CoreValues>[0]["values"]>(config["about_values_json"]);
  const companies = tryParseJSON<Parameters<typeof CompaniesVentures>[0]["companies"]>(config["about_companies_json"]);
  const stats = tryParseJSON<Parameters<typeof NumbersMatter>[0]["stats"]>(config["about_numbers_json"]);
  const faqs = tryParseJSON<Parameters<typeof FAQSection>[0]["faqs"]>(config["about_faqs_json"]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <AboutHero />
      </div>
      <FounderIntro />
      <CareerTimeline milestones={milestones} />
      <LeadershipSection />
      <CoreValues values={values} />
      <CompaniesVentures companies={companies} />
      <NumbersMatter stats={stats} />
      <FAQSection faqs={faqs} />
      <AboutCTA />
      <Footer />
    </main>
  );
}
