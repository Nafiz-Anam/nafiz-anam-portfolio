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

export default function HomePage() {
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
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
