"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Diagnose",
    description:
      "Before anything gets built, I want to understand the actual problem: what's costing you money, time, or growth right now, and why previous attempts to fix it, if there were any, didn't stick.",
  },
  {
    number: "02",
    title: "Decide",
    description:
      "Together we settle the direction: what gets built, what doesn't, and why. This is the step most failed projects skipped.",
  },
  {
    number: "03",
    title: "Architect",
    description:
      "The technical foundation gets designed for where the business is going, not just where it is today. Reversing this decision later is expensive, so it's worth getting right early.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Development happens in short, visible iterations, with code review and testing built in, so you're never waiting weeks to find out if something works.",
  },
  {
    number: "05",
    title: "Ship",
    description:
      "Deployment gets the same rigor as the build: monitored, reversible, and boring, which is exactly what you want from a launch.",
  },
  {
    number: "06",
    title: "Stay",
    description:
      "I don't disappear after launch. Systems need an owner, and I stay involved as the business, and the software, keeps evolving.",
  },
] as const;

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
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
            How I Work
          </p>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            From First Call{" "}
            <span className="font-serif italic text-accent">to Long-Term Partner</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="dark flex flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-10"
            >
              <p
                className="font-mono text-[42px] font-bold leading-none"
                style={{ color: "hsl(var(--accent) / 0.35)" }}
              >
                {step.number}
              </p>
              <p className="text-[18px] font-bold tracking-tight text-panel-foreground">
                {step.title}
              </p>
              <p className="text-[13px] leading-[1.85] text-panel-foreground/50">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
