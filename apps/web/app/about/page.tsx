import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { FounderIntro } from "@/components/sections/about/FounderIntro";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { FAQSection } from "@/components/sections/about/FAQSection";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata = {
  title: "About Nafiz Anam | Technology & Product Partner",
  description:
    "Software engineer, architect, and founder with seven years building products that scale. Here's how I got here, and how I think about the work.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About Nafiz Anam | Technology & Product Partner",
    description:
      "Software engineer, architect, and founder with seven years building products that scale. Here's how I got here, and how I think about the work.",
    url: "/about",
    images: [{ url: "/Nafiz_Anam_Software_Engineer_Founder_Architect.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nafiz Anam | Technology & Product Partner",
    description:
      "Software engineer, architect, and founder with seven years building products that scale. Here's how I got here, and how I think about the work.",
    images: ["/Nafiz_Anam_Software_Engineer_Founder_Architect.png"],
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
      name: "About Nafiz Anam | Technology & Product Partner",
      description: "Software engineer, architect, and founder with seven years building products that scale. Here's how I got here, and how I think about the work.",
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Can you join an existing engineering team?", acceptedAnswer: { "@type": "Answer", text: "Yes. I regularly step into existing teams as a technical lead or senior contributor, working within their existing processes rather than replacing them." } },
        { "@type": "Question", name: "Can you lead an engineering team?", acceptedAnswer: { "@type": "Answer", text: "Yes, that's often exactly the gap I'm brought in to fill: providing technical leadership for a team that's shipping, but doesn't yet have someone senior setting the direction." } },
        { "@type": "Question", name: "What technologies do you specialize in?", acceptedAnswer: { "@type": "Answer", text: "I work primarily across modern web and cloud stacks: React and Next.js on the frontend, Node.js and related backend frameworks, and cloud infrastructure on AWS. The stack is always a means to an end though, chosen based on what the business actually needs, not what's trending." } },
        { "@type": "Question", name: "How do projects typically begin?", acceptedAnswer: { "@type": "Answer", text: "With a conversation about the actual problem, not a spec. From there I can tell you honestly whether it's a technical consulting engagement, a build, or something else entirely." } },
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
  const faqs = tryParseJSON<Parameters<typeof FAQSection>[0]["faqs"]>(config["about_faqs_json"]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Nav />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <AboutHero />
      </div>
      <FounderIntro />
      <CareerTimeline milestones={milestones} />
      <LeadershipSection />
      <CoreValues values={values} />
      <FAQSection faqs={faqs} />
      <AboutCTA />
      <Footer />
    </main>
  );
}
