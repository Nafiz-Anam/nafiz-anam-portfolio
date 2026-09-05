import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="font-sans text-foreground">Page not</span>{" "}
          <span className="font-serif italic text-accent">found</span>
        </h1>
        <p className="max-w-sm text-[15px] leading-relaxed text-foreground/55">
          This page doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="rounded-[5px] border border-foreground/10 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
