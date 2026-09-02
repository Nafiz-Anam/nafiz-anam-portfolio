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

const TITLE = "Services | Nafiz Anam — Technology & Product Partner";
const DESCRIPTION =
  "Diagnosing and solving the technical bottlenecks holding growth-stage businesses and funded founders back, not just building whatever's requested.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Services | Nafiz Anam",
    description: DESCRIPTION,
    url: "/services",
    images: [{ url: "/Nafiz_Anam_Business_Growth_Services.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Nafiz Anam",
    description: DESCRIPTION,
    images: ["/Nafiz_Anam_Business_Growth_Services.png"],
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
    name: TITLE,
    description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@type": "FAQPage",
    mainEntity: [
    { "@type": "Question", name: "How does an engagement actually start?", acceptedAnswer: { "@type": "Answer", text: "With a conversation about the problem, not a sales pitch. I ask questions until I understand what's actually going on, and only then do we talk about scope." } },
    { "@type": "Question", name: "Do you charge fixed price or hourly?", acceptedAnswer: { "@type": "Answer", text: "Most engagements are scoped and fixed-price once we've agreed on what we're building. Ongoing technical leadership or advisory work runs as a monthly retainer instead." } },
    { "@type": "Question", name: "Can you work alongside our existing team?", acceptedAnswer: { "@type": "Answer", text: "Yes, regularly. I can come in as a technical lead, an architecture reviewer, or the senior voice a team doesn't currently have." } },
    { "@type": "Question", name: "What if the project needs more than one engineer?", acceptedAnswer: { "@type": "Answer", text: "I bring in vetted engineers through Agilo IT when the work needs more hands, while staying the technical lead accountable for the outcome." } },
    { "@type": "Question", name: "What happens once the project ships?", acceptedAnswer: { "@type": "Answer", text: "Depends on what you need. Some clients move to an ongoing retainer, others prefer a clean handoff with full documentation. We agree on it before launch, not after." } },
    { "@type": "Question", name: "Do you sign NDAs?", acceptedAnswer: { "@type": "Answer", text: "Yes, always, and I'm happy to work from yours or provide mine." } },
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
