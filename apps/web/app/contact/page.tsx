import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about your software project. Nafiz Anam works with founders, startups, and businesses to build scalable, maintainable software solutions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Nafiz Anam",
    description:
      "Start a conversation about your software project. Nafiz Anam works with founders, startups, and businesses to build scalable, maintainable software solutions.",
    url: "/contact",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Nafiz Anam",
    description:
      "Start a conversation about your software project. Nafiz Anam works with founders, startups, and businesses to build scalable, maintainable software solutions.",
    images: ["/opengraph-image"],
  },
};

import { SERVER_API as API } from "@/lib/api-url";

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const data = await res.json() as { config: Record<string, string> };
    return data.config ?? {};
  } catch {
    return {};
  }
}

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <ContactPageTemplate config={config} />
      <Footer />
    </main>
  );
}
