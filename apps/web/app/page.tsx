import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Nafiz Anam | Technology & Product Partner",
      description: "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Nafiz Anam actually do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I work as a technology and product partner for growth-stage businesses and funded founders: diagnosing technical problems, making architecture and technology decisions, and leading or executing the fix, whether that's a custom build, a SaaS product, an AI automation system, or hands-on engineering leadership.",
          },
        },
        {
          "@type": "Question",
          name: "Who do you actually work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mainly two kinds of clients: funded founders and startups scaling a product past its MVP, and growing businesses whose systems or processes have started limiting growth. If you're not sure you fit either, reach out anyway.",
          },
        },
        {
          "@type": "Question",
          name: "Is working with Agilo IT different from working with you directly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, they're the same thing. Agilo IT is the consultancy I founded, and it's how engagements get delivered, whether that's just me or a small team I bring in for a larger scope.",
          },
        },
        {
          "@type": "Question",
          name: "Do you take on smaller projects, or only large ones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Project size varies with what's actually needed, not a fixed minimum. A focused technical consulting engagement and a full product build are both within scope, the right project matters more than fitting a specific size.",
          },
        },
        {
          "@type": "Question",
          name: "Where are you based, and do you work with international clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Based in Khulna, Bangladesh, and most clients are international, across Australia, Europe, and the US. Work is fully remote with flexible hours to overlap with your team's timezone.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
    },
  ],
};

export const metadata: Metadata = {
  title: "Nafiz Anam | Technology & Product Partner",
  description:
    "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nafiz Anam | Technology & Product Partner",
    description:
      "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
    url: "/",
    images: [{ url: "/Nafiz_Anam_Software_Engineer.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafiz Anam | Technology & Product Partner",
    description:
      "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
    images: ["/Nafiz_Anam_Software_Engineer.png"],
  },
};

import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { AuthoritySnapshot } from "@/components/sections/AuthoritySnapshot";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { HowWeBuild } from "@/components/sections/HowWeBuild";
import { Services } from "@/components/sections/Services";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { TechnicalExpertise } from "@/components/sections/TechnicalExpertise";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { LatestInsights } from "@/components/sections/LatestInsights";
import { HomeFAQ } from "@/components/sections/HomeFAQ";
import { Footer } from "@/components/sections/Footer";
import type { Testimonial } from "@portfolio/types";

import { SERVER_API as API } from "@/lib/api-url";

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API}/testimonials`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json() as { testimonials: Testimonial[] };
    const testimonials = data.testimonials ?? [];
    // Slider showcases the 6 most recent testimonials.
    return [...testimonials]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  } catch {
    return [];
  }
}

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const data = await res.json() as { config: Record<string, string> };
    return data.config ?? {};
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const [testimonials, config] = await Promise.all([
    getFeaturedTestimonials(),
    getSiteConfig(),
  ]);

  const heroSocials: { label: string; href: string }[] = [];
  if (config.facebook_url) heroSocials.push({ label: "Facebook", href: config.facebook_url });
  if (config.linkedin_url) heroSocials.push({ label: "LinkedIn", href: config.linkedin_url });
  if (config.github_url)   heroSocials.push({ label: "GitHub",   href: config.github_url });

  const heroData = {
    tags: config.hero_tags ? config.hero_tags.split("|").map((t) => t.trim()) : undefined,
    headlineLine1: config.hero_headline_1 || undefined,
    headlineLine2Serif: config.hero_headline_2_serif || undefined,
    headlineLine2Sans: config.hero_headline_2_sans || undefined,
    name: config.hero_name || undefined,
    pitch: config.hero_pitch || undefined,
    photoUrl: config.hero_photo_url || undefined,
    socials: heroSocials.length > 0 ? heroSocials : undefined,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Nav />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Hero availability={config.availability_status ?? null} data={heroData} />
        <AuthoritySnapshot />
      </div>
      <WorkGrid />
      <Services />
      <HowWeBuild />
      <WhyChooseMe />
      <TechnicalExpertise />
      <Testimonials testimonials={testimonials} />
      <ContactSection />
      <LatestInsights />
      <HomeFAQ />
      <Footer />
    </main>
  );
}
