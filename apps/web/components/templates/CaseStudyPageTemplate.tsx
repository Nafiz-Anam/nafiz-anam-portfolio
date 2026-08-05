"use client";

import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookingButton } from "@/components/sections/BookingButton";
import type {
  CaseStudyData,
  CaseStudyFeature,
  CaseStudyMetric,
  RelatedCaseStudy,
  ArchitectureLayer,
} from "@/lib/case-study-content";

/* ─── Shared animation wrapper ─── */
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Shared section label ─── */
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
function StatusBadge({ status }: { status: CaseStudyData["status"] }) {
  const colors = {
    Live: "border-emerald-400/30 bg-emerald-400/[0.10] text-emerald-600 dark:text-emerald-400",
    "In Progress": "border-amber-400/30 bg-amber-400/[0.10] text-amber-600 dark:text-amber-400",
    Completed: "border-foreground/20 bg-foreground/[0.05] text-foreground/50",
  };
  const dots = {
    Live: "bg-emerald-500",
    "In Progress": "bg-amber-500",
    Completed: "bg-foreground/30",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-[3px] border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${colors[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

function CaseStudyHero({
  industry,
  clientType,
  role,
  timeline,
  status,
  title,
  summary,
  heroImageSrc,
}: Pick<
  CaseStudyData,
  | "industry"
  | "clientType"
  | "role"
  | "timeline"
  | "status"
  | "title"
  | "summary"
  | "heroImageSrc"
>) {
  return (
    <section className="px-6 pb-0 pt-20 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 flex items-center gap-2 text-[12px] text-foreground/35"
        >
          <a href="/case-studies" className="transition-colors duration-150 hover:text-foreground/60">
            Case Studies
          </a>
          <span>/</span>
          <span className="text-foreground/50">{industry}</span>
        </motion.div>

        {/* Content column */}
        <div className="mx-auto max-w-[900px]">
          {/* Industry badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-7"
          >
            <span className="rounded-[3px] border border-accent/25 bg-accent/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
              {industry}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mb-6 font-bold leading-[1.06] tracking-tight text-foreground"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
          >
            {title}
          </motion.h1>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mb-12 text-[18px] leading-[1.75] text-foreground/52"
          >
            {summary}
          </motion.p>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="mb-12 grid grid-cols-2 gap-6 border-y border-foreground/[0.07] py-8 sm:grid-cols-3 lg:grid-cols-5"
          >
            {[
              { label: "Industry", value: industry },
              { label: "Client Type", value: clientType },
              { label: "My Role", value: role },
              { label: "Timeline", value: timeline },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                  {label}
                </p>
                <p className="text-[12px] font-medium leading-[1.55] text-foreground/70">
                  {value}
                </p>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Status
              </p>
              <StatusBadge status={status} />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            className="mb-20"
          >
            <a href="/contact">
              <Button className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                Discuss a Similar Project
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
          className="mx-auto max-w-[1400px]"
        >
          <ImagePlaceholder
            src={heroImageSrc}
            alt={title}
            label={title}
            aspectClassName="aspect-[16/7]"
            className="!rounded-[5px] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Project Overview
═══════════════════════════════════════════════════════════ */
function ProjectOverview({
  overview,
  challenges,
}: Pick<CaseStudyData, "overview" | "challenges">) {
  const challengeIcons: Record<string, React.ReactNode> = {
    "Manual Workflows": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    Compliance: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Integration: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><line x1="6" y1="9" x2="6" y2="21" />
      </svg>
    ),
    Scalability: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    "Poor UX": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    Operational: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  };

  const defaultIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  return (
    <section className="bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Overview header */}
        <Reveal className="mb-20">
          <SectionLabel>Project Overview</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            The Business Context &{" "}
            <span className="font-serif italic text-accent">Challenge</span>
          </h2>
        </Reveal>

        {/* Two-column: prose + quick facts */}
        <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left: narrative */}
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Client Background
              </p>
              <p className="text-[16px] leading-[1.9] text-foreground/65">
                {overview.clientBackground}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Business Context
              </p>
              <p className="text-[16px] leading-[1.9] text-foreground/65">
                {overview.businessContext}
              </p>
            </div>
          </Reveal>

          {/* Right: structured facts */}
          <Reveal delay={0.1} className="flex flex-col gap-8">
            {/* Objectives */}
            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Project Objectives
              </p>
              <ul className="flex flex-col gap-3">
                {overview.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] leading-[1.75] text-foreground/62">
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "hsl(var(--accent))" }}
                    />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope */}
            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Scope of Work
              </p>
              <ul className="flex flex-col gap-2.5">
                {overview.scopeOfWork.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[12.5px] leading-[1.7] text-foreground/55">
                    <span className="mt-[8px] h-px w-3 shrink-0 bg-foreground/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* My responsibilities */}
            <div className="rounded-[5px] border border-accent/15 bg-accent/[0.03] p-7">
              <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.18em] text-accent/60">
                My Responsibilities
              </p>
              <ul className="flex flex-col gap-2.5">
                {overview.myResponsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[12.5px] leading-[1.7] text-foreground/60">
                    <svg
                      className="mt-[3px] shrink-0 text-accent"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Challenges */}
        <Reveal className="mb-12">
          <SectionLabel>The Challenge</SectionLabel>
          <h3
            className="mt-3 font-bold leading-[1.1] tracking-tight text-foreground"
            style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            What We Were Solving For
          </h3>
          <p className="mt-4 max-w-[600px] text-[15px] leading-[1.85] text-foreground/48">
            Before writing a single line of code, we invested four weeks in discovery to fully understand the operational and technical landscape.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((ch, i) => (
            <Reveal key={i} delay={(i % 3) * 0.07}>
              <div className="group flex h-full flex-col gap-5 rounded-[5px] border border-foreground/[0.08] bg-background p-7 transition-colors duration-200 hover:border-foreground/[0.16]">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/40"
                    style={{ background: "hsl(var(--foreground) / 0.06)" }}
                  >
                    {challengeIcons[ch.category] ?? defaultIcon}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/30">
                    {ch.category}
                  </span>
                </div>
                <div>
                  <h4 className="mb-2.5 text-[15px] font-bold leading-snug tracking-tight text-foreground">
                    {ch.title}
                  </h4>
                  <p className="text-[13px] leading-[1.8] text-foreground/55">
                    {ch.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — The Solution
═══════════════════════════════════════════════════════════ */
function TheSolution({ solution }: Pick<CaseStudyData, "solution">) {
  return (
    <section className="bg-panel px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <Reveal className="mb-20 max-w-[800px]">
          <SectionLabel>The Solution</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            From Business Problem to{" "}
            <span className="font-serif italic text-accent">Production System</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.9] text-panel-foreground/65">
            {solution.intro}
          </p>
        </Reveal>

        {/* Strategy + Process */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Product strategy */}
          <Reveal>
            <div className="h-full rounded-[5px] border border-panel-foreground/[0.10] bg-panel-foreground/[0.04] p-9">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-accent/70">
                Product Strategy
              </p>
              <p className="text-[15px] leading-[1.9] text-panel-foreground/65">
                {solution.productStrategy}
              </p>
            </div>
          </Reveal>

          {/* Development process */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-[5px] border border-panel-foreground/[0.10] bg-panel-foreground/[0.04] p-9">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-accent/70">
                Development Process
              </p>
              <p className="text-[15px] leading-[1.9] text-panel-foreground/65">
                {solution.developmentProcess}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Key decisions */}
        <Reveal className="mb-10">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-panel-foreground/35">
            Key Technical Decisions
          </p>
          <h3
            className="mt-3 font-bold leading-[1.1] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
          >
            The choices that shaped the outcome
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {solution.keyDecisions.map((dec, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div className="flex flex-col gap-4 rounded-[5px] border border-panel-foreground/[0.08] bg-panel-foreground/[0.03] p-7">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-mono text-[12px] font-bold tabular-nums text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[15px] font-bold leading-snug tracking-tight text-panel-foreground">
                    {dec.title}
                  </h4>
                </div>
                <p className="pl-8 text-[13px] leading-[1.82] text-panel-foreground/55">
                  {dec.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — Architecture & Engineering
═══════════════════════════════════════════════════════════ */
const LAYER_COLORS: Record<
  ArchitectureLayer["category"],
  { border: string; bg: string; badge: string; dot: string }
> = {
  frontend: {
    border: "border-accent/25",
    bg: "bg-accent/[0.04]",
    badge: "border-accent/25 bg-accent/[0.08] text-accent",
    dot: "bg-accent",
  },
  api: {
    border: "border-blue-400/20",
    bg: "bg-blue-400/[0.03]",
    badge: "border-blue-400/25 bg-blue-400/[0.08] text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  data: {
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/[0.03]",
    badge: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  infra: {
    border: "border-purple-400/20",
    bg: "bg-purple-400/[0.03]",
    badge: "border-purple-400/25 bg-purple-400/[0.08] text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
  },
};

function ArchDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="flex flex-col items-stretch gap-0">
      {layers.map((layer, i) => {
        const colors = LAYER_COLORS[layer.category];
        return (
          <div key={layer.name} className="flex flex-col items-center">
            {/* Layer card */}
            <div
              className={`w-full rounded-[5px] border p-7 ${colors.border} ${colors.bg}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/38">
                  {layer.name}
                </p>
              </div>
              <p className="mb-5 text-[13px] leading-[1.75] text-foreground/52">
                {layer.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <span
                    key={node}
                    className={`rounded-[3px] border px-3 py-1.5 text-[11px] font-medium ${colors.badge}`}
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {/* Connector arrow */}
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="h-4 w-px bg-foreground/[0.12]" />
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  className="text-foreground/15"
                >
                  <path d="M0 0L4 5L8 0" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ArchitectureSection({
  architecture,
}: Pick<CaseStudyData, "architecture">) {
  return (
    <section className="bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <Reveal className="mb-20 max-w-[800px]">
          <SectionLabel>Architecture & Engineering</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            How the System{" "}
            <span className="font-serif italic text-accent">Was Built</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.9] text-foreground/55">
            {architecture.intro}
          </p>
        </Reveal>

        {/* Diagram + Security side by side */}
        <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Architecture diagram */}
          <Reveal>
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
              System Architecture
            </p>
            <ArchDiagram layers={architecture.layers} />
          </Reveal>

          {/* Security + deployment */}
          <Reveal delay={0.1} className="flex flex-col gap-8">
            {/* Security */}
            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <div className="mb-5 flex items-center gap-3">
                <svg
                  className="text-foreground/40"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                  Security Considerations
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {architecture.securityHighlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[12.5px] leading-[1.75] text-foreground/55"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "hsl(var(--accent) / 0.6)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deployment */}
            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <div className="mb-4 flex items-center gap-3">
                <svg
                  className="text-foreground/40"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                  Deployment Workflow
                </p>
              </div>
              <p className="text-[13px] leading-[1.82] text-foreground/55">
                {architecture.deploymentNotes}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — Key Features (alternating layout)
═══════════════════════════════════════════════════════════ */
function FeatureRow({
  feature,
  index,
}: {
  feature: CaseStudyFeature;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <Reveal className="grid grid-cols-1 gap-12 border-b border-foreground/[0.06] pb-20 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:gap-20">
      {/* Image — conditionally reorder on large screens */}
      <div className={`${isEven ? "lg:order-1" : "lg:order-2"} order-1`}>
        <ImagePlaceholder
          src={feature.imageSrc}
          alt={feature.imageAlt}
          label={feature.imageAlt}
          aspectClassName="aspect-[4/3]"
          className="!rounded-[5px] w-full"
        />
      </div>

      {/* Text */}
      <div
        className={`${isEven ? "lg:order-2" : "lg:order-1"} order-2 flex flex-col justify-center gap-7`}
      >
        <div>
          <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent/55">
            Feature {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-bold leading-[1.1] tracking-tight text-foreground"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
          >
            {feature.title}
          </h3>
        </div>

        <p className="text-[15px] leading-[1.88] text-foreground/60">
          {feature.description}
        </p>

        {/* Business value callout */}
        <div className="flex gap-4 rounded-[5px] border border-accent/20 bg-accent/[0.05] p-5">
          <div
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ background: "hsl(var(--accent) / 0.14)" }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ color: "hsl(var(--accent))" }}
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-accent/70">
              Business Value
            </p>
            <p className="text-[13px] leading-[1.78] text-foreground/62">
              {feature.businessValue}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function KeyFeatures({ features }: Pick<CaseStudyData, "features">) {
  return (
    <section className="bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <Reveal className="mb-20">
          <SectionLabel>Key Features</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            What Was{" "}
            <span className="font-serif italic text-accent">Delivered</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[16px] leading-[1.85] text-foreground/48">
            Each capability was scoped to solve a specific business problem — not built for its own sake.
          </p>
        </Reveal>

        {/* Feature rows */}
        <div className="flex flex-col gap-20">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — Results & Impact
═══════════════════════════════════════════════════════════ */
function MetricCard({ metric, index }: { metric: CaseStudyMetric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.07 }}
      className="flex flex-col gap-3 border-t border-foreground/[0.10] pt-8"
    >
      <p
        className="font-bold leading-none tracking-tight"
        style={{
          fontSize: "clamp(36px, 5vw, 72px)",
          color: "hsl(var(--accent))",
        }}
      >
        {metric.value}
      </p>
      <p className="text-[14px] font-medium leading-snug text-foreground/75">
        {metric.label}
      </p>
      {metric.context && (
        <p className="text-[11px] leading-[1.6] text-foreground/35">
          {metric.context}
        </p>
      )}
    </motion.div>
  );
}

function ResultsImpact({ results }: Pick<CaseStudyData, "results">) {
  return (
    <section className="bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <Reveal className="mb-20">
          <SectionLabel>Results & Impact</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            Measurable Outcomes,{" "}
            <span className="font-serif italic text-accent">Real Business Value</span>
          </h2>
        </Reveal>

        {/* Metrics grid */}
        <div className="mb-20 grid grid-cols-2 gap-x-10 gap-y-0 sm:grid-cols-3">
          {results.metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} />
          ))}
        </div>

        {/* Testimonial */}
        {results.testimonial && (
          <Reveal className="mb-20">
            <blockquote className="relative rounded-[5px] border border-foreground/[0.10] bg-foreground/[0.04] px-10 py-10 sm:px-14 sm:py-12">
              <span
                className="absolute left-8 top-4 font-serif text-[72px] leading-none"
                style={{ color: "hsl(var(--accent) / 0.18)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative text-[17px] italic leading-[1.85] text-foreground/72 sm:text-[19px]">
                {results.testimonial.quote}
              </p>
              <footer className="mt-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-foreground/[0.08]" />
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-foreground/75">
                    {results.testimonial.author}
                  </p>
                  <p className="text-[11px] text-foreground/35">
                    {results.testimonial.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        )}

        {/* Additional outcomes */}
        <Reveal>
          <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
            Additional Outcomes
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {results.additionalOutcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.03] px-6 py-4"
              >
                <svg
                  className="mt-[2px] shrink-0 text-accent"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[13px] leading-[1.75] text-foreground/60">{outcome}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 10 — Related Projects
═══════════════════════════════════════════════════════════ */
function RelatedProjectCard({ project }: { project: RelatedCaseStudy }) {
  return (
    <a
      href={`/case-studies/${project.slug}`}
      className="group flex flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-0 transition-all duration-200 hover:border-panel-foreground/[0.20] hover:shadow-sm"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-[5px]">
        <ImagePlaceholder
          src={project.imageSrc}
          alt={project.title}
          label={project.title}
          aspectClassName="aspect-[16/9]"
          className="!rounded-t-[5px] !rounded-b-none w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-5 top-5">
          <span className="rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
            {project.industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-7 pt-4">
        <h3 className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-[13px] leading-[1.78] text-panel-foreground/45">
          {project.description}
        </p>
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View Case Study
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

function RelatedProjects({
  relatedProjects,
}: Pick<CaseStudyData, "relatedProjects">) {
  return (
    <section className="bg-panel px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-14">
          <SectionLabel>Related Work</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(24px, 3vw, 42px)" }}
          >
            More Case{" "}
            <span className="font-serif italic text-accent">Studies</span>
          </h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {relatedProjects.map((p) => (
            <RelatedProjectCard key={p.slug} project={p} />
          ))}
        </motion.div>

        <Reveal delay={0.12} className="mt-14 text-center">
          <a href="/case-studies">
            <Button
              variant="outline"
              className="rounded-[5px] border-panel-foreground/20 px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-panel-foreground hover:border-panel-foreground/40 hover:bg-panel-foreground/[0.05]"
            >
              View All Case Studies
            </Button>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 11 — Final CTA
═══════════════════════════════════════════════════════════ */
function CaseStudyCTA() {
  return (
    <section className="bg-background px-6 py-32 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <SectionLabel>Start a Project</SectionLabel>
          <h2
            className="max-w-[720px] font-bold leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(28px, 4vw, 58px)" }}
          >
            Planning a{" "}
            <span className="font-serif italic text-accent">Similar Project?</span>
          </h2>
          <p className="max-w-[520px] text-[16px] leading-[1.88] text-foreground/48">
            Let's talk about how we can build a scalable, maintainable solution
            tailored to your business — from strategy and architecture through to
            production and long-term success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a href="/services">
              <Button
                variant="outline"
                className="rounded-[5px] border-foreground/20 px-10 py-4 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Explore Services
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN TEMPLATE EXPORT
═══════════════════════════════════════════════════════════ */
export function CaseStudyPageTemplate({
  caseStudy,
}: {
  caseStudy: CaseStudyData;
}) {
  return (
    <div className="dark bg-background text-foreground">
      {/* Hero */}
      <CaseStudyHero
        industry={caseStudy.industry}
        clientType={caseStudy.clientType}
        role={caseStudy.role}
        timeline={caseStudy.timeline}
        status={caseStudy.status}
        title={caseStudy.title}
        summary={caseStudy.summary}
        heroImageSrc={caseStudy.heroImageSrc}
      />

      {/* Overview + Challenges */}
      <ProjectOverview
        overview={caseStudy.overview}
        challenges={caseStudy.challenges}
      />

      {/* Solution — panel */}
      <TheSolution solution={caseStudy.solution} />

      {/* Architecture */}
      <ArchitectureSection architecture={caseStudy.architecture} />

      {/* Features */}
      <KeyFeatures features={caseStudy.features} />

      {/* Results */}
      <ResultsImpact results={caseStudy.results} />

      {/* Related projects — panel */}
      <RelatedProjects relatedProjects={caseStudy.relatedProjects} />

      {/* Final CTA */}
      <CaseStudyCTA />
    </div>
  );
}
