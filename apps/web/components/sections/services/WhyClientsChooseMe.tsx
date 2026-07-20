"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const REASONS = [
  {
    number: "01",
    title: "Business-First Thinking",
    body: "Technology decisions are always subordinate to business objectives. I don't recommend what's interesting—I recommend what solves the problem. This keeps projects on budget, on time, and aligned with commercial reality.",
  },
  {
    number: "02",
    title: "Scalable Architecture",
    body: "Systems designed to grow don't require a full rewrite every eighteen months. I invest in architecture upfront so that adding features, handling more users, and onboarding new engineers all become progressively easier, not harder.",
  },
  {
    number: "03",
    title: "Clear Communication",
    body: "I translate technical complexity into language that business stakeholders can use to make good decisions. There are no knowledge monopolies, no unexplained jargon, and no technical debt hidden behind unclear status updates.",
  },
  {
    number: "04",
    title: "Long-Term Support",
    body: "Most software partnerships end at launch. Mine don't. I stay accountable for the systems I build and available to evolve them as the business grows. A working product on day one is the beginning, not the goal.",
  },
  {
    number: "05",
    title: "Engineering Leadership",
    body: "Beyond writing and reviewing code, I raise the bar for the teams I work with. Processes improve, quality standards rise, and engineers become better at their craft. The value compounds beyond the immediate project.",
  },
] as const;

function ReasonRow({
  number,
  title,
  body,
  isLast,
}: (typeof REASONS)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative transition-colors duration-[250ms]"
      style={{
        backgroundColor: hovered
          ? "hsl(var(--foreground) / 0.025)"
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-5 px-10 py-14 lg:flex-row lg:items-baseline lg:gap-0">
        {/* number */}
        <div className="shrink-0 lg:w-[15%]">
          <span
            className="select-none font-mono font-bold leading-none transition-colors duration-[250ms]"
            style={{
              fontSize: "clamp(72px, 9vw, 130px)",
              color: hovered
                ? "hsl(var(--accent) / 0.18)"
                : "hsl(var(--foreground) / 0.06)",
            }}
          >
            {number}
          </span>
        </div>

        {/* title */}
        <div className="shrink-0 lg:w-[35%] lg:pr-12">
          <h3 className="text-[24px] font-bold leading-snug tracking-tight text-foreground lg:text-[28px]">
            {title}
          </h3>
        </div>

        {/* body */}
        <div className="lg:w-[50%]">
          <p className="max-w-[500px] text-[15px] leading-[1.9] text-foreground/50">
            {body}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="relative mx-10 h-px bg-foreground/[0.07]">
          <motion.div
            className="absolute inset-0 origin-left bg-accent"
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}

export function WhyClientsChooseMe() {
  return (
    <section
      id="why-choose"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
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
            Why Clients Work With Me
          </p>
          <h2 className="max-w-[660px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Not Just an Engineer.{" "}
            <span className="font-serif italic text-accent-soft">
              A Technical Partner.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] border border-foreground/[0.08]"
        >
          {REASONS.map((r, i) => (
            <ReasonRow
              key={r.number}
              {...r}
              isLast={i === REASONS.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
