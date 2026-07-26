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
import { fetchProjectList } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real engineering challenges, measurable business outcomes. Explore how Nafiz Anam has led complex software projects from strategy to production across healthcare, logistics, finance, and more.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Nafiz Anam",
    description:
      "Real engineering challenges, measurable business outcomes. Explore how Nafiz Anam has led complex software projects from strategy to production across healthcare, logistics, finance, and more.",
    url: "/case-studies",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Nafiz Anam",
    description:
      "Real engineering challenges, measurable business outcomes. Explore how Nafiz Anam has led complex software projects from strategy to production across healthcare, logistics, finance, and more.",
    images: ["/opengraph-image"],
  },
};

export default async function CaseStudiesPage() {
  const { projects, industries } = await fetchProjectList({ limit: 50 });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <CaseStudiesHero />
      </div>
      <div className="dark">
        <FeaturedCaseStudy />
      </div>
      <div className="dark">
        <CaseStudiesGrid projects={projects} industries={industries} />
      </div>
      <div className="dark">
        <IndustriesServed />
      </div>
      <div className="dark">
        <ProjectApproach />
      </div>
      <div className="dark">
        <TechCapabilities />
      </div>
      <div className="dark">
        <OutcomesStrip />
      </div>
      <div className="dark">
        <CaseStudiesCTA />
      </div>
      <Footer />
    </main>
  );
}
