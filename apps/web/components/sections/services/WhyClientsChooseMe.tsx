"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const REASONS = [
  {
    number: "01",
    title: "I'll Tell You What You Don't Want to Hear",
    body: "If the right fix isn't a new build, I'll say so, even when that means a smaller invoice for me.",
  },
  {
    number: "02",
    title: "Architecture That Doesn't Need a Rewrite in a Year",
    body: "Growth-ready systems from the start, not something retrofitted after it breaks under real usage.",
  },
  {
    number: "03",
    title: "Plain Language, Not Jargon",
    body: "Every technical decision gets explained in terms you can actually evaluate, whether or not you have a technical background.",
  },
  {
    number: "04",
    title: "Accountability Past Launch",
    body: "A working product a month after launch is the starting line, not the finish line, and I stay on the hook for it.",
  },
  {
    number: "05",
    title: "I've Made These Calls Before",
    body: "As an engineer, a technical lead, and a founder. That combination, not just the code itself, is what you're actually paying for.",
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
            Judgment,{" "}
            <span className="font-serif italic text-accent">
              Not Just Execution
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] bg-texture-lines-inset bg-surface"
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
