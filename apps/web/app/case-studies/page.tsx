import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { CaseStudiesHero } from "@/components/sections/case-studies/CaseStudiesHero";
import { FeaturedCaseStudy } from "@/components/sections/case-studies/FeaturedCaseStudy";
import { CaseStudiesGrid } from "@/components/sections/case-studies/CaseStudiesGrid";
import { IndustriesServed } from "@/components/sections/case-studies/IndustriesServed";
import { ProjectApproach } from "@/components/sections/case-studies/ProjectApproach";
import { TechCapabilities } from "@/components/sections/case-studies/TechCapabilities";
import { OutcomesStrip } from "@/components/sections/case-studies/OutcomesStrip";
import { CaseStudiesCTA } from "@/components/sections/case-studies/CaseStudiesCTA";

export const metadata: Metadata = {
  title: "Case Studies — Nafiz Anam",
  description:
    "Real engineering challenges, measurable business outcomes. Explore how Nafiz Anam has led complex software projects from strategy to production across healthcare, logistics, finance, and more.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero: dark background */}
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <CaseStudiesHero />
      </div>

      {/* Featured case study: panel (cream/light) */}
      <div className="dark">
        <FeaturedCaseStudy />
      </div>

      {/* All case studies grid: dark */}
      <div className="dark">
        <CaseStudiesGrid />
      </div>

      {/* Industries: panel */}
      <div className="dark">
        <IndustriesServed />
      </div>

      {/* Process: dark */}
      <div className="dark">
        <ProjectApproach />
      </div>

      {/* Tech capabilities: panel */}
      <div className="dark">
        <TechCapabilities />
      </div>

      {/* Outcomes strip: dark */}
      <div className="dark">
        <OutcomesStrip />
      </div>

      {/* Final CTA: panel */}
      <div className="dark">
        <CaseStudiesCTA />
      </div>

      <Footer />
    </main>
  );
}
