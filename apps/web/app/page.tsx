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

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

async function getAvailabilityStatus(): Promise<string | null> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json() as { config: Record<string, string> };
    return data.config?.availability_status ?? null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [testimonials, availability] = await Promise.all([
    getFeaturedTestimonials(),
    getAvailabilityStatus(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <Hero availability={availability} />
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
