"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Github, Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultHero, defaultFooter, type HeroContent } from "@/lib/placeholder-content";
import { BookingButton } from "./BookingButton";

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  GitHub: Github,
};

const AVAILABILITY_CONFIG = {
  available: { dot: "bg-green-400", text: "Available for work" },
  limited:   { dot: "bg-amber-400", text: "Limited availability" },
  unavailable: { dot: "bg-red-400", text: "Not available" },
} as const;

// Pure CSS (animate-line-reveal, see globals.css) — starts on first paint
// instead of waiting on JS hydration, which is what made the headline the
// new LCP bottleneck once the panel below it was fixed the same way.
function LineReveal({ children, delayMs = 0, className }: { children: React.ReactNode; delayMs?: number; className?: string }) {
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }} className={className}>
      <span
        className="animate-line-reveal"
        style={{ display: "block", animationDelay: `${delayMs}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero({
  data,
  availability,
}: {
  data?: Partial<HeroContent>;
  availability?: string | null;
}) {
  const merged: HeroContent = {
    ...defaultHero,
    ...Object.fromEntries(Object.entries(data ?? {}).filter(([, v]) => v !== undefined)),
  };
  const badge = availability ? AVAILABILITY_CONFIG[availability as keyof typeof AVAILABILITY_CONFIG] : null;

  return (
    <section id="intro" className="mx-auto max-w-[1800px] px-6 lg:px-16 pb-24 pt-12">

      {/* ── Headline + tags ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="max-w-none text-[clamp(2.25rem,11vw,3.75rem)] font-bold leading-[0.95] tracking-tight sm:text-7xl">
          <LineReveal delayMs={50} className="font-sans text-foreground">
            {merged.headlineLine1}
          </LineReveal>
          <LineReveal delayMs={180} className="sm:whitespace-nowrap">
            <span className="font-serif italic text-accent">{merged.headlineLine2Serif}</span>{" "}
            <span className="font-sans text-foreground">{merged.headlineLine2Sans}</span>
          </LineReveal>
        </h1>

        <div className="animate-hero-badge flex flex-col items-end gap-5 pt-4 sm:pt-6">
          {/* Trust badge */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-16 bg-foreground/60" />
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
            <div className="flex -space-x-3">
              {["A", "N", "J", "M"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-background bg-accent/20 text-sm font-bold text-accent"
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-foreground">359+ Worldwide Trusted Clients</p>
          </div>

          <div className="flex gap-6 text-sm font-medium text-accent/80">
            {merged.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
              <span className={`h-1.5 w-1.5 rounded-full ${badge.dot} animate-pulse`} />
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {/* ── Panel card ──
          This is the LCP region (name, pitch, avatar). It previously waited
          on JS hydration + a Framer Motion stagger before painting, costing
          ~2.8s of LCP render delay on throttled mobile. The entrance is now
          plain CSS (animate-hero-*, see globals.css) — it starts on first
          paint regardless of hydration, so the fade/slide-in look is kept
          without blocking LCP on it. */}
      <div className="animate-hero-panel mt-16 grid grid-cols-1 items-center gap-16 rounded-[5px] border border-panel-foreground/10 bg-panel-foreground/[0.04] p-10 text-panel-foreground sm:p-14 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-center gap-10">
          <p className="animate-hero-name whitespace-nowrap text-center font-sans text-[clamp(1.75rem,9vw,3.75rem)] font-bold sm:whitespace-normal sm:text-7xl">
            Nafiz{" "}
            <span className="font-serif italic" style={{ color: "hsl(13, 79%, 57%)" }}>
              Anam.
            </span>
          </p>

          <p className="animate-hero-pitch max-w-[605px] text-base leading-[1.8] text-panel-foreground">
            {merged.pitch}
          </p>

          <div className="animate-hero-cta flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:gap-6">
            <div className="flex items-center gap-4">
              {(merged.socials ?? defaultFooter.socials).map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-panel-muted/30 text-panel-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : social.label[0]}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link prefetch={false}
                href="/case-studies"
                className="text-[11px] font-bold uppercase tracking-widest text-panel-muted transition-colors duration-200 hover:text-panel-foreground"
              >
                View case studies →
              </Link>
              <BookingButton location="hero" className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                {merged.ctaLabel}
              </BookingButton>
            </div>
          </div>
        </div>

        {merged.photoUrl ? (
          <div className="animate-hero-photo relative aspect-square w-64 overflow-hidden rounded-[5px] sm:w-72">
            <Image
              src={merged.photoUrl}
              alt={merged.name}
              fill
              priority
              sizes="(min-width: 640px) 288px, 256px"
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder
            aspectClassName="aspect-square"
            className="animate-hero-photo w-64 rounded-[5px] object-cover sm:w-72"
          />
        )}
      </div>
    </section>
  );
}
