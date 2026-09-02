import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";
import { WhoIWorkWith } from "@/components/sections/services/WhoIWorkWith";
import { HowWeWork } from "@/components/sections/services/HowWeWork";
import { WhyClientsChooseMe } from "@/components/sections/services/WhyClientsChooseMe";
import { FrequentlyRequested } from "@/components/sections/services/FrequentlyRequested";
import { ServicesFAQ } from "@/components/sections/services/ServicesFAQ";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

export const metadata = {
  title: "Services",
  description:
    "Engineering services built around business goals. Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Nafiz Anam",
    description:
      "Engineering services built around business goals. Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Nafiz Anam",
    description:
      "Engineering services built around business goals. Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#collectionpage`,
    url: `${SITE_URL}/services`,
    name: "Services — Nafiz Anam",
    description: "Engineering services built around business goals. Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
    provider: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@type": "FAQPage",
    mainEntity: [
    { "@type": "Question", name: "How do engagements typically start?", acceptedAnswer: { "@type": "Answer", text: "Every project begins with a no-commitment discovery call. We talk through the business problem, current technical state, timeline, and budget. I'll then outline a proposed engagement scope. There's no obligation to proceed—the call exists to determine fit." } },
    { "@type": "Question", name: "Do you work on a fixed-price or hourly basis?", acceptedAnswer: { "@type": "Answer", text: "Both, depending on the project. Fixed-price works well for well-defined scopes. Hourly or retainer arrangements suit ongoing consulting, architecture reviews, and long-term partnerships where the scope evolves over time." } },
    { "@type": "Question", name: "Can you work within our existing team?", acceptedAnswer: { "@type": "Answer", text: "Yes. I embed into existing teams regularly. I adapt to your workflow—whether that's Jira, Linear, Slack, or a daily standup. The goal is to add value immediately without disrupting what's already working." } },
    { "@type": "Question", name: "What's your availability?", acceptedAnswer: { "@type": "Answer", text: "Availability varies by engagement. For full-project builds, I take on one primary client at a time to ensure focus. For consulting and advisory roles, I can work with multiple clients concurrently. Book a call to discuss current availability." } },
    { "@type": "Question", name: "How do you handle projects that require a full team?", acceptedAnswer: { "@type": "Answer", text: "For larger projects that require more than one engineer, I can bring in trusted collaborators from my network—designers, frontend developers, and backend engineers I've worked with before. I remain the technical lead and single point of accountability throughout." } },
    { "@type": "Question", name: "What happens after the project launches?", acceptedAnswer: { "@type": "Answer", text: "I offer ongoing support, feature development, and technical advisory arrangements after launch. The preferred model is a long-term partnership rather than a handoff—software is never truly finished, and the best outcomes come from sustained engagement." } },
    { "@type": "Question", name: "Do you sign NDAs and contracts?", acceptedAnswer: { "@type": "Answer", text: "Yes. I sign NDAs before any sensitive business discussion and work under formal contracts for all engagements. IP ownership, confidentiality, payment terms, and delivery milestones are documented clearly before work begins." } },
    ],
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  },
  ],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
        <ServicesHero />
      </div>
      <ServicesOverview />
      <WhoIWorkWith />
      <HowWeWork />
      <WhyClientsChooseMe />
      <FrequentlyRequested />
      <ServicesFAQ />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
