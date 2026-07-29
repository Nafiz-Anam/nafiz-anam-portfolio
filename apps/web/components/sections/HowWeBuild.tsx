"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

function WordReveal({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {children.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand business goals, users, technical challenges, and project scope before writing any code.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "Design scalable system architecture, define the technology stack, and create a long-term technical roadmap.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Development",
    description:
      "Build production-ready software with clean code, agile iterations, and continuous collaboration.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Quality Assurance",
    description:
      "Perform testing, optimization, security checks, and performance improvements before release.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Deployment",
    description:
      "Deploy reliable infrastructure with CI/CD, cloud services, monitoring, and scalable environments.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Growth & Support",
    description:
      "Provide continuous improvements, maintenance, feature expansion, and technical guidance as the product evolves.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
] as const;

function HeadingReveal() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = ["How", "We"];
  return (
    <h2 ref={ref} className="text-5xl font-bold leading-[1.1] tracking-tight text-panel-foreground sm:text-6xl">
      {words.map((w, i) => (
        <span key={w} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.07 }}
          >{w}</motion.span>
        </span>
      ))}
      <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingTop: "0.12em", marginTop: "-0.12em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
        <motion.span
          className="font-serif italic"
          style={{ display: "inline-block", color: "hsl(var(--accent))" }}
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.19 }}
        >Build</motion.span>
      </span>
    </h2>
  );
}

function StepCard({ number, title, description, icon, index }: (typeof STEPS)[number] & { index: number }) {
  return (
    <motion.div
      className="group relative flex flex-1 flex-col gap-6 border-r border-panel-foreground/[0.07] px-7 py-10 transition-colors duration-200 hover:bg-panel-foreground/[0.03] last:border-r-0"
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* orange accent top line */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-transparent transition-all duration-250 group-hover:bg-accent" />

      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-panel-foreground/30 transition-colors duration-250 group-hover:text-accent">
          {number}
        </span>
        <span className="text-panel-foreground/40 transition-colors duration-250 group-hover:text-accent">
          {icon}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-[14px] font-bold leading-tight tracking-tight text-panel-foreground">
          {title}
        </p>
        <p className="text-[12px] leading-[1.75] text-panel-foreground/45">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowWeBuild() {
  return (
    <section id="about" className="dark bg-panel text-panel-foreground">
      <div className="mx-auto max-w-[1800px] px-6 py-24 lg:px-16">

        {/* Top: portrait + copy */}
        <div className="grid grid-cols-1 items-center gap-16 sm:grid-cols-[35fr_65fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImagePlaceholder
              src="/Nafiz-Anam.jpg"
              aspectClassName="aspect-[4/5]"
              className="max-h-[500px] w-full rounded-[5px] object-cover object-top"
            />
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <WordReveal
                delay={0}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-panel-foreground/40"
              >
                From strategy to scalable software.
              </WordReveal>
              <HeadingReveal />
            </div>
            <WordReveal
              delay={0.3}
              className="max-w-xl text-[17px] leading-[1.85] text-panel-foreground/60"
            >
              Every successful software product begins with understanding the business, not the technology. My process is built around clear communication, thoughtful architecture, iterative development, and long-term partnership—ensuring every decision supports real business outcomes.
            </WordReveal>
          </div>
        </div>

        {/* Bottom: 6-step process */}
        <div className="mt-20 overflow-hidden rounded-[5px] border border-panel-foreground/[0.07] bg-panel">
          <div className="flex flex-col sm:flex-row">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} {...step} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
