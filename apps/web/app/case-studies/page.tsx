import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { CaseStudiesHero } from "@/components/sections/case-studies/CaseStudiesHero";
import { CaseStudiesGrid } from "@/components/sections/case-studies/CaseStudiesGrid";
import { IndustriesServed } from "@/components/sections/case-studies/IndustriesServed";
import { ProjectApproach } from "@/components/sections/case-studies/ProjectApproach";
import { TechCapabilities } from "@/components/sections/case-studies/TechCapabilities";
import { CaseStudiesCTA } from "@/components/sections/case-studies/CaseStudiesCTA";
import { fetchProjectList } from "@/lib/projects";

const TITLE = "Case Studies | Nafiz Anam — Real Projects, Measurable Business Outcomes";
const DESCRIPTION =
  "Selected engagements where I've helped businesses solve real technical problems and hit measurable business outcomes.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Case Studies | Nafiz Anam",
    description: DESCRIPTION,
    url: "/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Nafiz Anam",
    description: DESCRIPTION,
  },
};

export default async function CaseStudiesPage() {
  const { projects, industries, total } = await fetchProjectList({ limit: 12 });

  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/case-studies#collectionpage`,
        url: `${SITE_URL}/case-studies`,
        name: "Case Studies — Nafiz Anam",
        description: DESCRIPTION,
        author: { "@id": `${SITE_URL}/#person` },
        hasPart: projects.map((p) => ({
          "@type": "Article",
          "@id": `${SITE_URL}/case-studies/${p.slug}`,
          name: p.title,
          url: `${SITE_URL}/case-studies/${p.slug}`,
          description: p.excerpt,
          ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <CaseStudiesHero />
      </div>
      <div className="dark">
        <CaseStudiesGrid projects={projects} industries={industries} total={total} initialLimit={12} />
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
        <CaseStudiesCTA />
      </div>
      <Footer />
    </main>
  );
}
