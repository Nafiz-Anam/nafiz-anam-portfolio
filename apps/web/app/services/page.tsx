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
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Nafiz Anam",
    description:
      "Engineering services built around business goals. Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
    images: ["/opengraph-image"],
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
