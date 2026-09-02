"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const SERVICES = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Your business runs on spreadsheets, manual handoffs, or three tools that don't talk to each other. I build the system that fits how you actually operate, instead of forcing your operations to fit a generic tool.",
    outcome: "One system built around how your business actually runs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <polyline points="9 9 12 12 15 9" />
      </svg>
    ),
  },
  {
    slug: "saas-product-engineering",
    title: "SaaS Product Engineering",
    description:
      "Your MVP works, until real users show up and it doesn't. I take a validated product from \"it works\" to \"it can survive its own growth,\" with the architecture and infrastructure to match.",
    outcome: "A product that survives its own growth.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    slug: "technical-consulting-architecture",
    title: "Technical Consulting & Architecture",
    description:
      "You're about to make a technology decision you don't fully trust, and there's no one senior enough in the room to catch a mistake before it's expensive. I'm that second opinion, before you commit budget, not after.",
    outcome: "A second opinion before the expensive mistake, not after.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    slug: "ai-automation-business-systems",
    title: "AI Automation & Business Systems",
    description:
      "Your team spends hours a week on work a computer should be doing. I automate the repetitive parts of your operation, and I'll tell you honestly when AI isn't actually the right tool for the job.",
    outcome: "Hours of manual work removed, honestly, not oversold.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z" />
        <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
        <path d="M9 15s1 1 3 1 3-1 3-1" />
      </svg>
    ),
  },
  {
    slug: "cloud-infrastructure-devops",
    title: "Cloud Infrastructure & DevOps",
    description:
      "Deployments are stressful, downtime happens, and nobody's fully sure what breaks if a server goes down. I build infrastructure that's boring in the best way: reliable, monitored, and recoverable.",
    outcome: "Infrastructure that's boring in the best way.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    slug: "engineering-leadership",
    title: "Engineering Leadership",
    description:
      "Your team is shipping, but nobody senior is setting direction or catching the architecture mistakes before they become expensive. I provide that judgment on a fractional basis, the leadership of a CTO without the full-time hire.",
    outcome: "CTO-level judgment, without the full-time hire.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
] as const;

function ServiceCard({
  slug,
  title,
  description,
  outcome,
  icon,
}: (typeof SERVICES)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="dark group relative flex flex-col gap-7 rounded-[5px] border bg-background p-10"
      animate={{
        y: hovered ? -3 : 0,
        boxShadow: hovered
          ? "0 14px 36px rgba(0,0,0,0.10)"
          : "0 0px 0px rgba(0,0,0,0)",
      }}
      style={{
        borderColor: hovered
          ? "hsl(var(--accent))"
          : "hsl(var(--panel-foreground) / 0.10)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* icon */}
      <motion.span
        className="block w-fit"
        animate={{
          y: hovered ? -2 : 0,
          color: hovered
            ? "hsl(var(--accent))"
            : "hsl(var(--panel-foreground) / 0.45)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {icon}
      </motion.span>

      <div className="flex flex-col gap-3">
        <p className="text-[17px] font-bold leading-snug tracking-tight text-panel-foreground">
          {title}
        </p>
        <p className="text-[13px] leading-[1.8] text-panel-foreground/50">
          {description}
        </p>
      </div>

      {/* outcome */}
      <div className="mt-auto rounded-[3px] border border-panel-foreground/[0.07] bg-panel-foreground/[0.03] px-4 py-3">
        <p className="text-[11px] leading-[1.65] text-panel-foreground/48">
          <span className="mr-1.5 font-bold uppercase tracking-[0.1em] text-accent">
            Outcome:
          </span>
          {outcome}
        </p>
      </div>

      {/* learn more */}
      <Link
        href={`/services/${slug}`}
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent hover:opacity-75 transition-opacity duration-200"
      >
        <span>Learn More</span>
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function ServicesOverview() {
  return (
    <section
      id="services-overview"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            What I Do
          </p>
          <h2 className="max-w-[700px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Six Ways{" "}
            <span className="font-serif italic text-accent">I Get Involved</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
