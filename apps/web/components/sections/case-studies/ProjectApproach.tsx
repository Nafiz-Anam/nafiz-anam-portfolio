"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Before writing a single line of code, I invest time understanding the business, its goals, constraints, existing systems, and the people it serves. This is where strategy begins.",
    detail: "Stakeholder Interviews · Requirements Mapping · Risk Identification · Scope Definition",
  },
  {
    number: "02",
    title: "Product Strategy",
    description:
      "With business goals defined, I translate them into a product roadmap, prioritizing features by impact, defining the MVP, and creating a technical vision that aligns the whole team.",
    detail: "MVP Definition · Roadmap Planning · Feature Prioritization · Success Metrics",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "Every technical decision at this stage has a five-year consequence. I design systems for the business you're becoming, not just the business you are today.",
    detail: "System Design · Tech Stack Selection · Data Modeling · API Contracts · Security Posture",
  },
  {
    number: "04",
    title: "Engineering",
    description:
      "Clean, maintainable code with rigorous review culture, agile sprints, and continuous communication, delivered iteratively so you can validate progress, not just trust a timeline.",
    detail: "Agile Sprints · Code Review · Documentation · Feature Flagging · Continuous Delivery",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Comprehensive testing that matches the risk profile of your product: unit, integration, end-to-end, performance, and security testing before anything ships to real users.",
    detail: "Unit & Integration Tests · E2E Testing · Load Testing · Security Audits · Accessibility",
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "Production is where it matters. CI/CD pipelines, zero-downtime deployments, observability dashboards, and rollback plans ensure launches are events you celebrate, not fear.",
    detail: "CI/CD Pipelines · Infrastructure as Code · Monitoring & Alerting · Zero-downtime Deploys",
  },
  {
    number: "07",
    title: "Continuous Improvement",
    description:
      "Shipping it is the beginning. I stay close to the metrics, user feedback, and evolving business requirements, iterating to maximize the compounding value of what we built.",
    detail: "Performance Optimization · Feature Iteration · Technical Debt Management · Team Support",
  },
] as const;

function StepRow({
  number,
  title,
  description,
  detail,
  isLast,
}: (typeof STEPS)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative transition-colors duration-[250ms]"
        style={{ backgroundColor: hovered ? "hsl(var(--panel-foreground) / 0.025)" : "transparent" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* left accent */}
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-all duration-[250ms]"
          style={{ backgroundColor: hovered ? "hsl(var(--accent))" : "transparent" }}
        />

        <div className="grid grid-cols-1 gap-4 px-10 py-10 sm:grid-cols-[80px_1fr_1fr] sm:items-start sm:gap-0">

          {/* Step number */}
          <div className="flex items-start pt-0.5">
            <span
              className="font-mono text-[11px] font-bold tracking-[0.14em] transition-colors duration-[250ms]"
              style={{ color: hovered ? "hsl(var(--accent))" : "hsl(var(--panel-foreground) / 0.3)" }}
            >
              {number}
            </span>
          </div>

          {/* Title + description */}
          <div className="flex flex-col gap-2 sm:pr-12">
            <p className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground">
              {title}
            </p>
            <p className="text-[13px] leading-[1.8] text-panel-foreground/50">
              {description}
            </p>
          </div>

          {/* Detail tags */}
          <div className="flex flex-wrap items-start gap-2">
            {detail.split(" · ").map((item) => (
              <span
                key={item}
                className="rounded-full border px-3 py-1.5 text-[10px] font-medium leading-none transition-all duration-[250ms]"
                style={{
                  backgroundColor: hovered
                    ? "hsl(var(--panel-foreground) / 0.07)"
                    : "hsl(var(--panel-foreground) / 0.04)",
                  borderColor: hovered
                    ? "hsl(var(--panel-foreground) / 0.20)"
                    : "hsl(var(--panel-foreground) / 0.10)",
                  color: "hsl(var(--panel-foreground) / 0.55)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </motion.div>

      {!isLast && (
        <div className="mx-10 border-b border-panel-foreground/[0.06]" />
      )}
    </>
  );
}

export function ProjectApproach() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            How I Work
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            How I Approach{" "}
            <span className="font-serif italic text-accent">Every Project.</span>
          </h2>
          <p className="max-w-[560px] text-[15px] leading-[1.85] text-foreground/50">
            A structured, repeatable process built from over 100 engagements, designed to
            reduce risk, maximize alignment, and ship software that actually works in production.
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-[5px] bg-texture-lines-inset bg-surface">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} {...step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
