import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
const PAGE_SIZE = 7;

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { CaseStudiesHero } from "@/components/sections/case-studies/CaseStudiesHero";
import { CaseStudiesGrid } from "@/components/sections/case-studies/CaseStudiesGrid";
import { IndustriesServed } from "@/components/sections/case-studies/IndustriesServed";
import { HowItWorkLinkOut } from "@/components/sections/case-studies/HowItWorkLinkOut";
import { CaseStudiesFAQ } from "@/components/sections/case-studies/CaseStudiesFAQ";
import { CaseStudiesCTA } from "@/components/sections/case-studies/CaseStudiesCTA";
import { fetchProjectList } from "@/lib/projects";

const TITLE = "Case Studies | Nafiz Anam — Real Projects, Measurable Business Outcomes";
const DESCRIPTION =
  "Selected engagements where I've helped businesses solve real technical problems and hit measurable business outcomes.";

type PageProps = {
  searchParams: { page?: string };
};

function getPageParam(searchParams: { page?: string }): number {
  const parsed = Number(searchParams.page);
  return Number.isFinite(parsed) && parsed > 1 ? Math.floor(parsed) : 1;
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const page = getPageParam(searchParams);
  const canonical = page > 1 ? `/case-studies?page=${page}` : "/case-studies";

  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Case Studies | Nafiz Anam",
      description: DESCRIPTION,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: "Case Studies | Nafiz Anam",
      description: DESCRIPTION,
    },
  };
}

export default async function CaseStudiesPage({ searchParams }: PageProps) {
  const page = getPageParam(searchParams);
  const { projects, industries, totalPages } = await fetchProjectList({ page, limit: PAGE_SIZE });

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
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do you measure the results shown in a case study?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Whatever the client and I agreed mattered before the project started, usually a mix of business metrics (revenue, conversion, operational cost) and technical ones (performance, reliability, uptime). I don't report a number unless I can point to where it came from.",
            },
          },
          {
            "@type": "Question",
            name: "Can I talk to a past client as a reference?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Often, yes, with their permission. Ask during the discovery call and I'll tell you honestly whether that's possible for a project relevant to what you're evaluating.",
            },
          },
          {
            "@type": "Question",
            name: "Do you only show the successful projects?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I show the projects I can share publicly, which is mostly a permissions question, not a curation of only the wins. If something's directly relevant to your situation and isn't published here, ask me about it directly.",
            },
          },
          {
            "@type": "Question",
            name: "Why don't some case studies include a client name?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Some clients prefer to stay unnamed publicly, even when they're happy to be a reference privately. The work and the outcome are still real either way.",
            },
          },
        ],
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
        <CaseStudiesGrid projects={projects} industries={industries} page={page} totalPages={totalPages} />
      </div>
      <div className="dark">
        <IndustriesServed />
      </div>
      <HowItWorkLinkOut />
      <CaseStudiesFAQ />
      <div className="dark">
        <CaseStudiesCTA />
      </div>
      <Footer />
    </main>
  );
}
