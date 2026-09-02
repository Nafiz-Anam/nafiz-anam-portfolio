import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const TITLE = "Contact Nafiz Anam | Technology & Product Partner";
const DESCRIPTION =
  "Tell me what's not working. I'll tell you honestly whether I'm the right fit, and what I'd actually do about it.";

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#contactpage`,
      url: `${SITE_URL}/contact`,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of projects do you work on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mostly two kinds: SaaS products that need to scale past their MVP, and operating businesses whose manual processes or legacy systems have started limiting growth. If your project doesn't fit either, reach out anyway, I'll tell you honestly if I'm the right fit.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work with international clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most of my clients are outside Bangladesh, across Australia, Europe, and the US. I work GMT+6, with flexible hours to overlap with your team.",
          },
        },
        {
          "@type": "Question",
          name: "Can you join an existing development team?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. I regularly work alongside in-house teams as a technical lead or architecture partner, not just as an outside contractor. That can mean reviewing decisions, unblocking a specific problem, or taking ongoing technical ownership.",
          },
        },
        {
          "@type": "Question",
          name: "Do you sign NDAs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, standard practice for any project with real detail to protect. I'm happy to sign yours or provide mine.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide ongoing maintenance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, either as part of the original engagement or as an ongoing retainer once the initial build or fix is delivered. Software that's actively used needs an owner, not a one-time delivery.",
          },
        },
        {
          "@type": "Question",
          name: "What is the typical project timeline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the problem, not a fixed package. A focused fix might take a few weeks. A full product build or system migration is usually measured in months. You'll get a real timeline in the proposal, not before.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly do you respond to inquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Within one business day, usually faster.",
          },
        },
        {
          "@type": "Question",
          name: "Can you help with existing software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, this is a large part of the work. Reviewing, fixing, or extending an existing system is often more valuable than starting over, and I'll tell you if a rebuild is genuinely the better call.",
          },
        },
      ],
    },
  ],
};

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "technology partner contact",
    "hire software architect",
    "technical consultant Bangladesh",
    "contact Nafiz Anam",
  ],
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
    images: [{ url: "/Nafiz_Anam_Technology_Partner.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/Nafiz_Anam_Technology_Partner.png"],
  },
};

import { SERVER_API as API } from "@/lib/api-url";

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const data = await res.json() as { config: Record<string, string> };
    return data.config ?? {};
  } catch {
    return {};
  }
}

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <ContactPageTemplate config={config} />
      <Footer />
    </main>
  );
}
