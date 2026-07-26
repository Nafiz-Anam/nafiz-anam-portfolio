import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { BookingProvider } from "@/components/sections/BookingProvider";

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
    default: "Nafiz Anam — Lead Software Engineer & Founder",
    template: "%s — Nafiz Anam",
  },
  description:
    "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products. Available for consulting and project engagements.",
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
    title: "Nafiz Anam — Lead Software Engineer & Founder",
    description:
      "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nafiz Anam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafiz Anam — Lead Software Engineer & Founder",
    description:
      "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable} font-sans`}>
        <GoogleAnalytics />
        <ThemeProvider>
          <BookingProvider>{children}</BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
