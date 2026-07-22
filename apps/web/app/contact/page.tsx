import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";

export const metadata: Metadata = {
  title: "Contact — Nafiz Anam",
  description:
    "Start a conversation about your software project. Nafiz Anam works with founders, startups, and businesses to build scalable, maintainable software solutions.",
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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
