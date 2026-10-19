import { SERVER_API as API } from "@/lib/api-url";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const DEFAULT_SAME_AS = [
  "https://www.linkedin.com/in/kazinafizanam/",
  "https://github.com/Nafiz-Anam",
  "https://www.facebook.com/anamnafiz",
];
// Google Business Profile Maps link. Fallback only: CMS site_config key
// `google_business_url` takes precedence.
const DEFAULT_BUSINESS_URL = "https://maps.app.goo.gl/miFjuTJg2TBByep89";
// Fallback only — CMS Settings > General > "Knowledge Graph Photo" (site_config
// key `knowledge_graph_image`) takes precedence. Dedicated to schema.org
// Person.image only, never used elsewhere on the site (not hero/footer photo).
const DEFAULT_IMAGE = `${SITE_URL}/Nafiz-Anam.jpg`;

const FALLBACK_CONFIG = {
  sameAs: [...DEFAULT_SAME_AS, DEFAULT_BUSINESS_URL],
  image: DEFAULT_IMAGE,
  businessUrl: DEFAULT_BUSINESS_URL,
};

async function getPersonConfig(): Promise<{ sameAs: string[]; image: string; businessUrl: string }> {
  try {
    const res = await fetch(`${API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return FALLBACK_CONFIG;
    const { config } = (await res.json()) as { config: Record<string, string> };
    const businessUrl = config.google_business_url || DEFAULT_BUSINESS_URL;
    const urls = [
      config.linkedin_url,
      config.github_url,
      config.facebook_url,
      config.twitter_url,
      businessUrl,
    ].filter((u): u is string => Boolean(u));
    return {
      sameAs: urls.length > 0 ? urls : DEFAULT_SAME_AS,
      businessUrl,
      image: config.knowledge_graph_image || DEFAULT_IMAGE,
    };
  } catch {
    return FALLBACK_CONFIG;
  }
}

export async function PersonJsonLd() {
  const { sameAs, image, businessUrl } = await getPersonConfig();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Nafiz Anam",
        url: SITE_URL,
        image,
        jobTitle: "Technology & Product Partner",
        description:
          "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
        email: "mailto:hi@nafizanam.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Khulna",
          addressCountry: "Bangladesh",
        },
        worksFor: [
          { "@id": `${SITE_URL}/#organization` },
          { "@id": `${SITE_URL}/#organization-syrona` },
        ],
        sameAs,
        knowsAbout: [
          "Software Architecture",
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "SaaS",
          "Cloud Infrastructure",
          "AI Automation",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        // Must match the Google Business Profile exactly.
        name: "Nafiz Anam - Tech Entrepreneur",
        url: SITE_URL,
        image,
        email: "mailto:hi@nafizanam.com",
        telephone: "+8801819758093",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3rd floor, Khan Plaza, A, 31 Majid Sarani",
          addressLocality: "Khulna",
          postalCode: "9100",
          addressCountry: "BD",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        founder: { "@id": `${SITE_URL}/#person` },
        employee: { "@id": `${SITE_URL}/#person` },
        areaServed: "Worldwide",
        hasMap: businessUrl,
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Agilo IT",
        url: SITE_URL,
        founder: { "@id": `${SITE_URL}/#person` },
        description: "Software consultancy delivering custom software development, SaaS product engineering, AI automation, and technical consulting.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-syrona`,
        name: "Syrona IT",
        founder: { "@id": `${SITE_URL}/#person` },
        description: "Company behind Servero.io, a server-side Google Tag Manager hosting platform for ecommerce brands.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Nafiz Anam",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
