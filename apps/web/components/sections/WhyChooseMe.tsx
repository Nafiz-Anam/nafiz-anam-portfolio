"use client";

import { motion } from "framer-motion";
import { SectionReveal, titleVariants, bodyVariants, cardVariants } from "@/components/ui/SectionReveal";

const PRINCIPLES = [
  {
    number: "01",
    title: "Business Before Technology",
    body: "Every architectural decision starts with the business objective, not the most interesting technical approach. The right tool is the one that serves the business, not the one that's most exciting to build with.",
  },
  {
    number: "02",
    title: "Architecture Before Implementation",
    body: "Strong foundations reduce technical debt and let software evolve without expensive rewrites later. Time spent designing correctly upfront saves months of rework.",
  },
  {
    number: "03",
    title: "Communicate With Clarity",
    body: "Technical decisions need to be understood by everyone they affect, not just the people who made them. Clarity between founders, designers, and engineers produces better products.",
  },
  {
    number: "04",
    title: "Build for the Long Term",
    body: "Maintainability, performance, and scalability get considered from day one, not added later once they've already become a problem.",
  },
  {
    number: "05",
    title: "Own the Outcome",
    body: "Success isn't measured by what shipped. It's measured by whether the software kept solving the business problem after launch.",
  },
  {
    number: "06",
    title: "Continuous Improvement",
    body: "Every release is a chance to learn and improve. Good engineering treats that as a discipline, not an afterthought.",
  },
] as const;

function PrincipleRow({
  number,
  title,
  body,
  isLast,
}: (typeof PRINCIPLES)[number] & { isLast: boolean }) {
  return (
    <div className="group relative transition-colors duration-[250ms] hover:bg-panel-foreground/[0.025]">
      {/* 3-column principle row */}
      <div className="flex flex-col gap-5 px-10 py-14 lg:flex-row lg:items-baseline lg:gap-0">

        {/* LEFT — oversized editorial number */}
        <div className="shrink-0 lg:w-[15%]">
          <span className="select-none font-mono text-[120px] font-bold leading-none text-panel-foreground/[0.07] transition-colors duration-[250ms] group-hover:text-accent/[0.18] lg:text-[140px]">
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
          <div className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </div>
      )}
    </div>
  );
}

export function WhyChooseMe() {
  return (
    <section
      id="principles"
      className="dark bg-background bg-texture-lines px-6 py-28 text-panel-foreground lg:px-16"
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
            Great software is built on thoughtful decisions, not just technical skill.
            These principles apply to every engagement, from the first conversation to long-term product growth.
          </motion.p>
        </SectionReveal>

        <SectionReveal className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.07] bg-panel-tint" stagger={0.1} delay={0.05}>
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
