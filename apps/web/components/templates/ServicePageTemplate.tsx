"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@portfolio/ui";
import type { ServicePageData } from "@/lib/service-pages";
import { BookingButton } from "@/components/sections/BookingButton";
import { Accordion } from "@/components/Accordion";

/* ─── shared animation wrapper ─── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Hero
═══════════════════════════════════════════════════════════ */
function HeroSection({
  tagline,
  headline,
  headlineAccent,
  description,
}: Pick<
  ServicePageData,
  "tagline" | "headline" | "headlineAccent" | "description"
>) {
  return (
    <section className="dark bg-texture-lines bg-background text-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pb-28 pt-20 lg:px-16 lg:pb-36 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-[10px] font-bold uppercase tracking-[0.22em] text-accent"
        >
          {tagline}
        </motion.p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-12"
          >
            <h1
              className="font-bold leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(40px, 5.8vw, 82px)" }}
            >
              {headline}{" "}
              <span className="font-serif italic text-accent">
                {headlineAccent}
              </span>
            </h1>

            <p className="max-w-[580px] text-[16px] leading-[1.85] text-foreground/55">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <BookingButton className="rounded-[5px] bg-accent px-9 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                Book Discovery Call
              </BookingButton>
              <a
                href="/case-studies"
                className="rounded-[5px] border border-foreground/20 bg-transparent px-9 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
              >
                View Case Studies
              </a>
            </div>
          </motion.div>

          {/* right: trust signal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            {[
              "Business-first approach to every engagement",
              "7+ years of production engineering experience",
              "Long-term partner, not a one-off vendor",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                <p className="text-[14px] leading-[1.7] text-foreground/50">{point}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Problems I Solve
═══════════════════════════════════════════════════════════ */
function ProblemRow({
  title,
  description,
  isLast,
}: ServicePageData["problems"][number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative transition-colors duration-[250ms]"
        style={{
          backgroundColor: hovered
            ? "hsl(var(--foreground) / 0.028)"
            : "transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-colors duration-[250ms]"
          style={{
            backgroundColor: hovered ? "hsl(var(--accent))" : "transparent",
          }}
        />
        <div className="flex flex-col gap-3 px-10 py-9 lg:flex-row lg:items-baseline lg:gap-0">
          <p
            className="shrink-0 text-[17px] font-bold tracking-tight transition-colors duration-[250ms] lg:w-[40%] lg:pr-12"
            style={{
              color: hovered
                ? "hsl(var(--foreground))"
                : "hsl(var(--foreground) / 0.82)",
            }}
          >
            {title}
          </p>
          <p className="text-[13px] leading-[1.85] text-foreground/48 lg:w-[60%]">
            {description}
          </p>
        </div>
      </div>
      {!isLast && (
        <div className="mx-10 border-b border-foreground/[0.07]" />
      )}
    </>
  );
}

function ProblemsSection({ problems }: Pick<ServicePageData, "problems">) {
  return (
    <section className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <SectionLabel>The Problems I Solve</SectionLabel>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Challenges I Help{" "}
            <span className="font-serif italic text-accent">Businesses Overcome</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-panel-foreground/50">
            Every engagement starts by understanding the real problem. These are the most
            common situations I'm brought in to resolve.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="dark overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-panel-foreground/[0.03]">
          {problems.map((p, i) => (
            <ProblemRow key={p.title} {...p} isLast={i === problems.length - 1} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — What You'll Get
═══════════════════════════════════════════════════════════ */
function DeliverablesSection({
  deliverables,
}: Pick<ServicePageData, "deliverables">) {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <SectionLabel>What You&apos;ll Get</SectionLabel>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Everything Included.{" "}
            <span className="font-serif italic text-accent">Nothing Hidden.</span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {deliverables.map((d, i) => (
            <div
              key={d.title}
              className={`group flex flex-col gap-4 rounded-[5px] border border-foreground/[0.08] bg-background px-8 py-9 transition-colors duration-[250ms] hover:border-accent hover:bg-foreground/[0.03] ${
                i === deliverables.length - 1 && deliverables.length % 3 === 1
                  ? "sm:col-start-1 sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:mx-auto lg:col-start-2 lg:col-span-1 lg:max-w-none lg:mx-0"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <p className="text-[16px] font-bold leading-snug tracking-tight text-foreground">
                {d.title}
              </p>
              <p className="text-[13px] leading-[1.8] text-foreground/48">
                {d.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — My Process
═══════════════════════════════════════════════════════════ */
function ProcessSection({ process }: Pick<ServicePageData, "process">) {
  return (
    <section className="dark overflow-hidden bg-texture-lines-panel bg-surface px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <SectionLabel>My Process</SectionLabel>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            A Structured Path From{" "}
            <span className="font-serif italic text-accent">Brief to Launch</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-panel-foreground/50">
            Clear milestones, no surprises. Every engagement follows a deliberate process
            that keeps business objectives at the centre of every decision.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-[860px]">
          {process.map((step, i) => (
            <div key={step.number} className="relative flex gap-8 pb-10 last:pb-0">
              {/* connector */}
              {i < process.length - 1 && (
                <div className="absolute left-[18px] top-[38px] h-full w-px bg-panel-foreground/[0.10]" />
              )}

              {/* number circle */}
              <div className="relative mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-panel-foreground/[0.12] bg-panel">
                <span className="text-[11px] font-bold tabular-nums text-accent">
                  {step.number}
                </span>
              </div>

              {/* content */}
              <div className="flex flex-col gap-2 pb-2">
                <p className="text-[17px] font-bold tracking-tight text-panel-foreground">
                  {step.title}
                </p>
                <p className="text-[13px] leading-[1.85] text-panel-foreground/50">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — Ideal For
═══════════════════════════════════════════════════════════ */
function IdealForSection({ idealFor }: Pick<ServicePageData, "idealFor">) {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <SectionLabel>Ideal For</SectionLabel>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Who This Service{" "}
            <span className="font-serif italic text-accent">Is Built For</span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {idealFor.map((item) => (
            <div
              key={item.type}
              className="flex flex-col gap-4 rounded-[5px] border border-foreground/[0.08] bg-background p-9 transition-colors duration-[250ms] hover:border-accent/40 hover:bg-foreground/[0.025]"
            >
              <div className="flex items-center gap-3">
                <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                <p className="text-[15px] font-bold tracking-tight">{item.type}</p>
              </div>
              <p className="text-[13px] leading-[1.85] text-foreground/50">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — Technologies (optional)
═══════════════════════════════════════════════════════════ */
function TechSection({ technologies }: Pick<ServicePageData, "technologies">) {
  if (!technologies.length) return null;

  return (
    <section className="bg-panel bg-texture-lines-panel px-6 py-24 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-10 text-center">
          <SectionLabel>Technologies & Tools</SectionLabel>
          <div className="flex flex-wrap justify-center gap-2.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-panel-foreground/[0.12] bg-panel-foreground/[0.04] px-4 py-2 text-[12px] font-medium text-panel-foreground/60 transition-colors duration-[200ms] hover:border-accent/50 hover:text-panel-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — FAQ
═══════════════════════════════════════════════════════════ */
function FAQSection({ faqs }: Pick<ServicePageData, "faqs">) {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="max-w-[560px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Common Questions,{" "}
            <span className="font-serif italic text-accent">Direct Answers</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-[860px]">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8 — Final CTA
═══════════════════════════════════════════════════════════ */
function CTASection({
  ctaEyebrow,
  ctaHeadline,
  ctaHeadlineAccent,
  ctaDescription,
}: Pick<ServicePageData, "ctaEyebrow" | "ctaHeadline" | "ctaHeadlineAccent" | "ctaDescription">) {
  return (
    <section className="dark overflow-hidden bg-texture-lines-panel bg-surface px-6 py-36 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <SectionLabel>{ctaEyebrow}</SectionLabel>
          <h2
            className="max-w-[680px] font-bold leading-[1.0] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
          >
            {ctaHeadline}{" "}
            <span className="font-serif italic text-accent">{ctaHeadlineAccent}</span>
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[1.85] text-panel-foreground/52">
            {ctaDescription}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <BookingButton className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a
              href="/case-studies"
              className="rounded-[5px] border border-panel-foreground/20 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-widest text-panel-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              View Case Studies
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT TEMPLATE
═══════════════════════════════════════════════════════════ */
export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <>
      <HeroSection
        tagline={data.tagline}
        headline={data.headline}
        headlineAccent={data.headlineAccent}
        description={data.description}
      />
      <ProblemsSection problems={data.problems} />
      <DeliverablesSection deliverables={data.deliverables} />
      <ProcessSection process={data.process} />
      <IdealForSection idealFor={data.idealFor} />
      <TechSection technologies={data.technologies} />
      <FAQSection faqs={data.faqs} />
      <CTASection
        ctaEyebrow={data.ctaEyebrow}
        ctaHeadline={data.ctaHeadline}
        ctaHeadlineAccent={data.ctaHeadlineAccent}
        ctaDescription={data.ctaDescription}
      />
    </>
  );
}
