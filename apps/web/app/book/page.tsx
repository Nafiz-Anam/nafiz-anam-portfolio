import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BookingPageClient } from "./BookingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const TITLE = "Book a Free Discovery Call | Nafiz Anam, Technology Partner";
const DESCRIPTION =
  "Book a free 30-minute discovery call with Nafiz Anam. Tell me what's holding your product or systems back, and I'll tell you honestly whether I'm the right fit and what I'd do about it.";

const bookSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/book#webpage`,
      url: `${SITE_URL}/book`,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      potentialAction: {
        "@type": "ReserveAction",
        name: "Book a free discovery call",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/book`, actionPlatform: "https://schema.org/DesktopWebPlatform" },
        result: { "@type": "Reservation", name: "30-minute discovery call" },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Book a Discovery Call", item: `${SITE_URL}/book` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "book discovery call",
    "technology partner consultation",
    "software architect consultation",
    "book a technical consultant",
    "Nafiz Anam",
  ],
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/book",
    type: "website",
    images: [{ url: "/Nafiz_Anam_Technology_Partner.png", width: 1536, height: 1024, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/Nafiz_Anam_Technology_Partner.png", alt: TITLE }],
  },
};

const EXPECT = [
  {
    title: "30 minutes, no pitch",
    body: "A focused conversation about what's actually going on: the product, the system, or the decision you're stuck on.",
  },
  {
    title: "An honest fit check",
    body: "If I'm not the right person for the problem, I'll say so and point you in a better direction.",
  },
  {
    title: "A clear next step",
    body: "You leave knowing what I'd do about it, whether or not we end up working together.",
  },
];

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <Nav />
      <section className="px-6 pb-28 pt-24 lg:px-16">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Free Discovery Call</p>
          <h1
            className="mb-6 font-bold leading-[1.06] tracking-tight"
            style={{ fontSize: "clamp(34px, 5.5vw, 64px)" }}
          >
            Let&apos;s Talk About
            <br />
            <span className="font-serif italic text-accent">What&apos;s Holding You Back.</span>
          </h1>
          <p className="mb-12 max-w-[600px] text-[17px] leading-[1.8] text-foreground/55">
            Book a free 30-minute call with me. Tell me where your product, systems, or technical
            decision is stuck, and I&apos;ll tell you honestly whether I&apos;m the right fit and
            what I&apos;d do about it. Pick a time below and I&apos;ll send a calendar invite once
            it&apos;s confirmed.
          </p>

          <div className="rounded-[8px] border border-foreground/10 bg-surface p-6 shadow-2xl">
            <h2 className="sr-only">Choose a date and time</h2>
            <BookingPageClient />
          </div>

          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">What to expect on the call</h2>
            <ul className="grid gap-6 sm:grid-cols-3">
              {EXPECT.map((item) => (
                <li key={item.title}>
                  <h3 className="mb-2 text-sm font-bold">{item.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-foreground/55">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
