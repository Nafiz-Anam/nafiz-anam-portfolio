import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Testimonial } from "@portfolio/types";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "What founders and engineering teams say about working with Nafiz Anam. Real feedback from real projects.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials — Nafiz Anam",
    description:
      "What founders and engineering teams say about working with Nafiz Anam. Real feedback from real projects.",
    url: "/testimonials",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials — Nafiz Anam",
    description:
      "What founders and engineering teams say about working with Nafiz Anam. Real feedback from real projects.",
    images: ["/opengraph-image"],
  },
};

import { SERVER_API as API } from "@/lib/api-url";

async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API}/api/testimonials`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json() as { testimonials: Testimonial[] };
    return data.testimonials ?? [];
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/testimonials#itemlist`,
        name: "Client Testimonials — Nafiz Anam",
        description: "What founders and engineering teams say about working with Nafiz Anam.",
        numberOfItems: testimonials.length,
        itemListElement: testimonials.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            reviewBody: t.quote,
            reviewRating: {
              "@type": "Rating",
              ratingValue: t.rating,
              bestRating: 5,
              worstRating: 1,
            },
            itemReviewed: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Testimonials", item: `${SITE_URL}/testimonials` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />

        {/* Page hero */}
        <div className="px-6 pb-16 pt-20 lg:px-16">
          <div className="mx-auto max-w-[1800px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Social Proof</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="font-serif italic text-accent">Happy</span>{" "}
              <span className="font-sans text-foreground">clients,</span>
              <br />
              <span className="font-sans text-foreground">real results.</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.85] text-foreground/55">
              Feedback from founders, product leads, and engineering teams I&apos;ve worked with.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      {testimonials.length > 0 ? (
        <div className="dark">
          <Testimonials testimonials={testimonials} />
        </div>
      ) : (
        <div className="dark bg-background px-6 py-24 lg:px-16">
          <p className="text-center text-sm text-foreground/40">No testimonials published yet.</p>
        </div>
      )}

      {/* All testimonials grid */}
      {testimonials.length > 0 && (
        <div className="dark bg-background px-6 py-20 lg:px-16">
          <div className="mx-auto max-w-[1800px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-5 rounded-[5px] border border-foreground/[0.08] bg-surface p-8"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3.5 w-3.5 ${i < t.rating ? "text-accent" : "text-foreground/20"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.292 2.678c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.822 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.049 2.927z" />
                      </svg>
                    ))}
                  </div>

                  <p className="flex-1 text-[14px] leading-[1.85] text-foreground/75">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 border-t border-foreground/[0.07] pt-5">
                    {t.photoUrl ? (
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-[13px] font-bold">{t.name}</p>
                      <p className="text-[11px] text-foreground/50">
                        {t.role}{t.company ? `, ${t.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />
    </main>
  );
}
