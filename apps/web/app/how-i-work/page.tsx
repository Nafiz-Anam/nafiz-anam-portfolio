import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { HowItWorkHero } from "@/components/sections/how-i-work/HowItWorkHero";
import { ProjectApproach } from "@/components/sections/case-studies/ProjectApproach";
import { CommunicationSection } from "@/components/sections/how-i-work/CommunicationSection";
import { TimelineSection } from "@/components/sections/how-i-work/TimelineSection";
import { TechCapabilities } from "@/components/sections/case-studies/TechCapabilities";
import { IndustriesServed } from "@/components/sections/case-studies/IndustriesServed";
import { HowItWorkFAQ } from "@/components/sections/how-i-work/HowItWorkFAQ";
import { HowItWorkCTA } from "@/components/sections/how-i-work/HowItWorkCTA";

const TITLE = "How I Work | Nafiz Anam — Process, Communication & Technology";
const DESCRIPTION =
  "A structured, repeatable process built from over 100 engagements, plus how communication, timelines, and technology decisions actually work day to day.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/how-i-work" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How I Work | Nafiz Anam",
    description: DESCRIPTION,
    url: "/how-i-work",
    images: [{ url: "/Nafiz_Anam_How_I_Work.png", width: 1731, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Work | Nafiz Anam",
    description: DESCRIPTION,
    images: ["/Nafiz_Anam_How_I_Work.png"],
  },
};

const howItWorkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/how-i-work#webpage`,
      url: `${SITE_URL}/how-i-work`,
      name: "How I Work — Nafiz Anam",
      description: DESCRIPTION,
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What if I don't know exactly what I need yet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's normal, and it's what Discovery is for. Most engagements start with a rough problem, not a finished spec, and the scope gets defined together, not handed to you as a take-it-or-leave-it proposal.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide fixed timelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, once scope is defined. You'll get a real timeline as part of the proposal, not an open-ended estimate that keeps slipping.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if the scope changes mid-project?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It gets discussed openly, with the impact on timeline and cost made clear before anything changes, not discovered afterward in an invoice.",
          },
        },
        {
          "@type": "Question",
          name: "Do you use my team's existing tools, or your own?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yours, wherever possible. Communication and project tracking happen in whatever your team already uses.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "How I Work", item: `${SITE_URL}/how-i-work` },
      ],
    },
  ],
};

export default function HowItWorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howItWorkSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <HowItWorkHero />
      </div>
      <div className="dark">
        <ProjectApproach />
      </div>
      <div className="dark">
        <CommunicationSection />
      </div>
      <TimelineSection />
      <div className="dark">
        <TechCapabilities />
      </div>
      <div className="dark">
        <IndustriesServed />
      </div>
      <HowItWorkFAQ />
      <div className="dark">
        <HowItWorkCTA />
      </div>
      <Footer />
    </main>
  );
}
