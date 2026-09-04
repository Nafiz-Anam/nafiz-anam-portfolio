"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Github, Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultHero, defaultFooter, type HeroContent } from "@/lib/placeholder-content";
import { BookingButton } from "./BookingButton";
import { ease, dur } from "@/lib/motion";
import { onIntroDone } from "@/lib/intro-signal";

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  GitHub: Github,
};

function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => onIntroDone(() => setReady(true)), []);
  return ready;
}

const AVAILABILITY_CONFIG = {
  available: { dot: "bg-green-400", text: "Available for work" },
  limited:   { dot: "bg-amber-400", text: "Limited availability" },
  unavailable: { dot: "bg-red-400", text: "Not available" },
} as const;

function LineReveal({ children, delay = 0, className, ready }: { children: React.ReactNode; delay?: number; className?: string; ready?: boolean }) {
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }} className={className}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%", opacity: 0, rotate: 1.5 }}
        animate={ready ? { y: "0%", opacity: 1, rotate: 0 } : { y: "110%", opacity: 0, rotate: 1.5 }}
        transition={{ duration: 0.9, ease: ease.out, delay }}
      >
        {children}
      </motion.span>
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
  const ready = useReady();
  const merged: HeroContent = {
    ...defaultHero,
    ...Object.fromEntries(Object.entries(data ?? {}).filter(([, v]) => v !== undefined)),
  };
  const badge = availability ? AVAILABILITY_CONFIG[availability as keyof typeof AVAILABILITY_CONFIG] : null;

  return (
    <section id="intro" className="mx-auto max-w-[1800px] px-6 lg:px-16 pb-24 pt-12">

      {/* ── Headline + tags ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="max-w-none text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          <LineReveal delay={0.05} ready={ready} className="font-sans text-foreground">
            {merged.headlineLine1}
          </LineReveal>
          <LineReveal delay={0.18} ready={ready} className="whitespace-nowrap">
            <span className="font-serif italic text-accent">{merged.headlineLine2Serif}</span>{" "}
            <span className="font-sans text-foreground">{merged.headlineLine2Sans}</span>
          </LineReveal>
        </h1>

        <motion.div
          className="flex flex-col items-end gap-5 pt-4 sm:pt-6"
          initial={{ opacity: 0, x: 24 }}
          animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: dur.md, ease: ease.out, delay: 0.45 }}
        >
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
        </motion.div>
      </div>

      {/* ── Panel card ── */}
      <motion.div
        className="mt-16 grid grid-cols-1 items-center gap-16 rounded-[5px] border border-panel-foreground/10 bg-panel-foreground/[0.04] p-10 text-panel-foreground sm:grid-cols-[1fr_auto] sm:p-14"
        initial={{ opacity: 0, y: 64, scale: 0.96 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 64, scale: 0.96 }}
        transition={{ duration: dur.lg, ease: ease.out, delay: 0.28 }}
      >
        <div className="flex flex-col justify-center gap-10">
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-center font-sans text-6xl font-bold sm:text-7xl"
              initial={{ y: "100%", opacity: 0 }}
              animate={ready ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.85, ease: ease.out, delay: 0.5 }}
            >
              Nafiz{" "}
              <span className="font-serif italic" style={{ color: "hsl(13, 79%, 57%)" }}>
                Anam.
              </span>
            </motion.p>
          </div>

          <motion.p
            className="max-w-[605px] text-base leading-[1.8] text-panel-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: dur.md, ease: ease.out, delay: 0.65 }}
          >
            {merged.pitch}
          </motion.p>

          <motion.div
            className="flex items-center justify-between gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: dur.sm, ease: ease.out, delay: 0.72 }}
          >
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

            <div className="flex items-center gap-6">
              <Link
                href="/case-studies"
                className="text-[11px] font-bold uppercase tracking-widest text-panel-muted transition-colors duration-200 hover:text-panel-foreground"
              >
                View case studies →
              </Link>
              <BookingButton location="hero" className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                {merged.ctaLabel}
              </BookingButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: dur.lg, ease: ease.out, delay: 0.42 }}
        >
          <ImagePlaceholder
            src={merged.photoUrl}
            aspectClassName="aspect-square"
            className="w-64 rounded-[5px] object-cover sm:w-72"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
