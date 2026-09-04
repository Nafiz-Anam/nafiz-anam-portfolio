import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { BookingProvider } from "@/components/sections/BookingProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorFollower } from "@/components/CursorFollower";
import { PageIntro } from "@/components/PageIntro";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nafiz Anam | Technology & Product Partner",
    template: "%s — Nafiz Anam",
  },
  description:
    "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
  keywords: [
    "software engineer",
    "software architect",
    "web development",
    "SaaS",
    "consulting",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: "Nafiz Anam", url: SITE_URL }],
  creator: "Nafiz Anam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Nafiz Anam",
    title: "Nafiz Anam | Technology & Product Partner",
    description:
      "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nafiz Anam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafiz Anam | Technology & Product Partner",
    description:
      "I diagnose the real problem behind a technical bottleneck, decide the right direction, and lead or execute the fix. Working with growth-stage businesses and funded founders.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Nafiz Anam",
      url: SITE_URL,
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
      sameAs: [
        "https://www.linkedin.com/in/kazinafizanam/",
        "https://github.com/Nafiz-Anam",
        "https://www.facebook.com/anamnafiz",
      ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleTagManager />
        <ThemeProvider>
          <PageIntro />
          <SmoothScroll>
            <BookingProvider>{children}</BookingProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
