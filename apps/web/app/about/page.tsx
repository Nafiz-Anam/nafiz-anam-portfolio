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
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Nafiz Anam",
    description:
      "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/about#profilepage`,
      url: `${SITE_URL}/about`,
      name: "About — Nafiz Anam",
      description: "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What industries do you work with?", acceptedAnswer: { "@type": "Answer", text: "I've worked across fintech, logistics, agriculture, e-commerce, education, and enterprise SaaS. Industry context matters less than the underlying problem: most software challenges—architecture, scalability, team structure, technical debt—are fundamentally similar across verticals." } },
        { "@type": "Question", name: "Do you work with startups?", acceptedAnswer: { "@type": "Answer", text: "Yes. Early-stage startups benefit most from senior-level thinking applied with speed. I help founders avoid expensive architectural mistakes early, prioritize features that actually matter, and build systems that can scale without requiring a full rewrite at Series A." } },
        { "@type": "Question", name: "Do you work with agencies?", acceptedAnswer: { "@type": "Answer", text: "Yes, on a selective basis. I work with agencies that need senior technical leadership for specific client projects—particularly those involving architecture reviews, scalability challenges, or complex system integrations." } },
        { "@type": "Question", name: "Can you join an existing engineering team?", acceptedAnswer: { "@type": "Answer", text: "Yes. I've embedded into multiple existing teams as a senior engineer and technical lead. I focus on raising code quality, improving architecture practices, unblocking delivery bottlenecks, and mentoring team members without disrupting existing momentum." } },
        { "@type": "Question", name: "Can you lead an engineering team?", acceptedAnswer: { "@type": "Answer", text: "Yes. My current role at Grain Marketplace includes engineering leadership responsibilities. Through Agilo IT, I've also provided fractional CTO and technical leadership services to several businesses during critical growth stages." } },
        { "@type": "Question", name: "How do projects typically begin?", acceptedAnswer: { "@type": "Answer", text: "Every engagement starts with a discovery call to understand the business problem, current technical state, and desired outcomes. From there I propose an engagement scope—whether that's a one-time architecture review, a fixed-scope build, or an ongoing technical partnership." } },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      ],
    },
  ],
};

export default async function AboutPage() {
  let config: Record<string, string> = {};
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/site-config`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
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
