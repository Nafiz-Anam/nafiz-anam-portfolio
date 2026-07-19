import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <Hero />
      </div>
      <WorkGrid />
      <StatsBand />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
