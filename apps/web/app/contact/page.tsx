import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";

export const metadata: Metadata = {
  title: "Contact — Nafiz Anam",
  description:
    "Start a conversation about your software project. Nafiz Anam works with founders, startups, and businesses to build scalable, maintainable software solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <ContactPageTemplate />
      <Footer />
    </main>
  );
}
