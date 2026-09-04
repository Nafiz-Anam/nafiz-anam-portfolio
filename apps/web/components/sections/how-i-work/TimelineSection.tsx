"use client";

import { motion } from "framer-motion";

const RANGES = [
  {
    label: "A focused technical consulting engagement or architecture review",
    duration: "2–3 weeks",
  },
  {
    label: "A targeted build or system integration",
    duration: "4–6 weeks",
  },
  {
    label: "A full product build, from architecture through launch",
    duration: "3–6 months",
  },
  {
    label: "Ongoing engineering leadership or infrastructure support",
    duration: "Monthly retainer",
  },
] as const;

export function TimelineSection() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 items-start gap-16 sm:grid-cols-[2fr_3fr]"
        >
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Timeline
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              How Long{" "}
              <span className="font-serif italic text-accent">This Actually Takes.</span>
            </h2>
            <p className="text-[13px] leading-[1.8] text-foreground/50">
              Every engagement is scoped individually, but these are realistic ranges based on
              the type of work. You&apos;ll get a specific, real timeline as part of the
              proposal for your project, not a generic range applied blindly.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-foreground/[0.07]">
            {RANGES.map((range, i) => (
              <motion.div
                key={range.label}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <span className="text-[15px] font-medium leading-snug tracking-tight text-foreground">
                  {range.label}
                </span>
                <span className="shrink-0 font-mono text-[13px] font-bold tracking-tight text-accent">
                  {range.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
