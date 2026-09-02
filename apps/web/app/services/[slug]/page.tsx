import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { RelatedCaseStudies } from "@/components/sections/RelatedCaseStudies";
import { getServicePageData, getAllServiceSlugs } from "@/lib/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServicePageData(slug);
  if (!service) return {};
  const ogImage = service.metaImage
    ? { url: service.metaImage, width: 1536, height: 1024 }
    : { url: "/opengraph-image", width: 1200, height: 630 };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${slug}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [ogImage.url],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServicePageData(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${service.slug}#service`,
        name: service.metaTitle.replace(" — Nafiz Anam", ""),
        description: service.metaDescription,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#person` },
        serviceType: service.tagline,
        areaServed: "Worldwide",
        ...(service.technologies.length > 0 ? { keywords: service.technologies.join(", ") } : {}),
      },
      ...(service.faqs.length > 0 ? [{
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.metaTitle.replace(" — Nafiz Anam", ""), item: `${SITE_URL}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <ServicePageTemplate data={service} />
      <RelatedCaseStudies />
      <Footer />
    </main>
  );
}
