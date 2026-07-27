"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionReveal, titleVariants, bodyVariants, cardVariants } from "@/components/ui/SectionReveal";

const PRINCIPLES = [
  {
    number: "01",
    title: "Business Before Technology",
    body: "Technology should never drive the solution. Every architectural decision begins with understanding business objectives, user needs, and long-term goals. The right tool is the one that serves the business—not the one that's most interesting to build with.",
  },
  {
    number: "02",
    title: "Architecture Before Implementation",
    body: "Strong foundations reduce technical debt, improve scalability, and allow software to evolve without expensive rewrites. Time spent designing systems correctly upfront saves months of remediation later.",
  },
  {
    number: "03",
    title: "Communicate With Clarity",
    body: "Clear communication between stakeholders, founders, designers, and engineers creates better products and stronger long-term partnerships. Technical decisions need to be understood by everyone they affect—not just the people who made them.",
  },
  {
    number: "04",
    title: "Build for the Long Term",
    body: "Maintainability, performance, security, and scalability are considered from day one—not added later. Software that is easy to change is software that can continue delivering value as the business evolves.",
  },
  {
    number: "05",
    title: "Own the Outcome",
    body: "Success isn't measured by shipping code. It's measured by how effectively the software solves real business problems after launch. I stay accountable to results, not just deliverables.",
  },
  {
    number: "06",
    title: "Continuous Improvement",
    body: "Every product can evolve. Every release is an opportunity to learn, optimize, and deliver more value to users. Good engineering culture treats improvement as a discipline, not an afterthought.",
  },
] as const;

function PrincipleRow({
  number,
  title,
  body,
  isLast,
}: (typeof PRINCIPLES)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative transition-colors duration-[250ms]"
      style={{
        backgroundColor: hovered
          ? "hsl(var(--panel-foreground) / 0.025)"
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3-column principle row */}
      <div className="flex flex-col gap-5 px-10 py-14 lg:flex-row lg:items-baseline lg:gap-0">

        {/* LEFT — oversized editorial number */}
        <div className="shrink-0 lg:w-[15%]">
          <span
            className="select-none font-mono text-[120px] font-bold leading-none transition-colors duration-[250ms] lg:text-[140px]"
            style={{
              color: hovered
                ? "hsl(var(--accent) / 0.18)"
                : "hsl(var(--panel-foreground) / 0.07)",
            }}
          >
            {number}
          </span>
        </div>

        {/* CENTER — principle title */}
        <div className="shrink-0 lg:w-[35%] lg:pr-12">
          <h3 className="text-[24px] font-bold leading-snug tracking-tight text-panel-foreground lg:text-[28px]">
            {title}
          </h3>
        </div>

        {/* RIGHT — body copy */}
        <div className="lg:w-[50%]">
          <p className="max-w-[500px] text-[15px] leading-[1.9] text-panel-foreground/48">
            {body}
          </p>
        </div>

      </div>

      {/* animated orange sweep line */}
      {!isLast && (
        <div className="relative mx-10 h-px bg-panel-foreground/[0.06]">
          <motion.div
            className="absolute inset-0 origin-left bg-accent"
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}
    </div>
  );
}

export function WhyChooseMe() {
  return (
    <section
      id="principles"
      className="dark bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">

        <SectionReveal className="mb-20 flex flex-col items-center gap-5 text-center" stagger={0.14}>
          <motion.p variants={bodyVariants} className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Core Principles
          </motion.p>
          <div style={{ overflow: "hidden" }}>
            <motion.h2 variants={titleVariants} className="max-w-[700px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
              The Principles Behind{" "}
              <span className="font-serif italic text-accent">Every Product I Build.</span>
            </motion.h2>
          </div>
          <motion.p variants={bodyVariants} className="max-w-[580px] text-[15px] leading-[1.85] text-panel-foreground/50">
            Great software is built on thoughtful decisions, not just technical expertise.
            These principles guide every project—from the first conversation to long-term product growth.
          </motion.p>
        </SectionReveal>

        <SectionReveal className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.07] bg-panel" stagger={0.1} delay={0.05}>
          {PRINCIPLES.map((p, i) => (
            <motion.div key={p.number} variants={cardVariants}>
              <PrincipleRow {...p} isLast={i === PRINCIPLES.length - 1} />
            </motion.div>
          ))}
        </SectionReveal>

      </div>
    </section>
  );
}
