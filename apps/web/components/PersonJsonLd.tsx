import { SERVER_API as API } from "@/lib/api-url";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

const DEFAULT_SAME_AS = [
  "https://www.linkedin.com/in/kazinafizanam/",
  "https://github.com/Nafiz-Anam",
  "https://www.facebook.com/anamnafiz",
];
// Fallback only — CMS Settings > General > "Knowledge Graph Photo" (site_config
// key `knowledge_graph_image`) takes precedence. Dedicated to schema.org
// Person.image only, never used elsewhere on the site (not hero/footer photo).
const DEFAULT_IMAGE = `${SITE_URL}/Nafiz-Anam.jpg`;

async function getPersonConfig(): Promise<{ sameAs: string[]; image: string }> {
  try {
    const res = await fetch(`${API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return { sameAs: DEFAULT_SAME_AS, image: DEFAULT_IMAGE };
    const { config } = (await res.json()) as { config: Record<string, string> };
    const urls = [
      config.linkedin_url,
      config.github_url,
      config.facebook_url,
      config.twitter_url,
    ].filter((u): u is string => Boolean(u));
    return {
      sameAs: urls.length > 0 ? urls : DEFAULT_SAME_AS,
      image: config.knowledge_graph_image || DEFAULT_IMAGE,
    };
  } catch {
    return { sameAs: DEFAULT_SAME_AS, image: DEFAULT_IMAGE };
  }
}

export async function PersonJsonLd() {
  const { sameAs, image } = await getPersonConfig();

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
