import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nafiz Anam — Lead Software Engineer & Founder",
  description:
    "I help founders and businesses design, build, and scale reliable software. Available for consulting, architecture reviews, and full-cycle product engineering.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nafiz Anam — Lead Software Engineer & Founder",
    description:
      "I help founders and businesses design, build, and scale reliable software. Available for consulting, architecture reviews, and full-cycle product engineering.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafiz Anam — Lead Software Engineer & Founder",
    description:
      "I help founders and businesses design, build, and scale reliable software. Available for consulting, architecture reviews, and full-cycle product engineering.",
    images: ["/opengraph-image"],
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
import { Footer } from "@/components/sections/Footer";
import type { Testimonial } from "@portfolio/types";

import { SERVER_API as API } from "@/lib/api-url";

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API}/api/testimonials?featured=true`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json() as { testimonials: Testimonial[] };
    return data.testimonials ?? [];
  } catch {
    return [];
  }
}

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
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

  const heroData = {
    tags: config.hero_tags ? config.hero_tags.split("|").map((t) => t.trim()) : undefined,
    headlineLine1: config.hero_headline_1 || undefined,
    headlineLine2Serif: config.hero_headline_2_serif || undefined,
    headlineLine2Sans: config.hero_headline_2_sans || undefined,
    name: config.hero_name || undefined,
    pitch: config.hero_pitch || undefined,
    photoUrl: config.hero_photo_url || undefined,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <Hero availability={config.availability_status ?? null} data={heroData} />
        <AuthoritySnapshot />
      </div>
      <WorkGrid />
      <HowWeBuild />
      <Services />
      <WhyChooseMe />
      <TechnicalExpertise />
      <Testimonials testimonials={testimonials} />
      <ContactSection />
      <Footer />
    </main>
  );
}
