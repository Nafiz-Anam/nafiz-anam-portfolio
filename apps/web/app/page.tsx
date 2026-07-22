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

export default async function HomePage() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <Hero />
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
