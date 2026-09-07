import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BookingButton } from "@/components/sections/BookingButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

const QUICK_LINKS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="dark bg-texture-lines bg-background text-foreground">
        <div className="mx-auto flex min-h-[75vh] max-w-[1100px] flex-col items-center justify-center gap-10 px-6 py-28 text-center lg:px-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Error 404</p>

          <h1
            className="font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(64px, 12vw, 160px)" }}
          >
            <span className="text-foreground">Page Not</span>
            <br />
            <span className="font-serif italic text-accent">Found.</span>
          </h1>

          <p className="max-w-[440px] text-[16px] leading-[1.85] text-foreground/55">
            This page doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton
              location="404_page"
              className="rounded-[5px] bg-accent px-9 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90"
            >
              Book Discovery Call
            </BookingButton>
            <Link
              href="/"
              className="rounded-[5px] border border-foreground/20 bg-transparent px-9 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              Go Home
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-foreground/[0.08] pt-8">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/40 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
