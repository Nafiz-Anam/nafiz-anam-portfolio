"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const VALUES = [
  {
    number: "01",
    title: "Business First",
    body: "Technology is a means, not an end. Every decision—what to build, how to build it, what to delay—begins with the business objective. Good engineers ask why before they ask how.",
  },
  {
    number: "02",
    title: "Architecture Matters",
    body: "Strong foundations enable everything that follows. Poorly designed systems slow down teams, create risk, and accumulate debt that eventually must be repaid with interest. The cost of getting it right upfront is always lower.",
  },
  {
    number: "03",
    title: "Build Relationships",
    body: "The best software is built by people who trust each other. Long-term partnerships between engineers, product managers, and clients consistently produce better outcomes than transactional engagements.",
  },
  {
    number: "04",
    title: "Communicate Clearly",
    body: "Complexity that cannot be explained is a liability. Every technical decision should be communicated in a way that all stakeholders can understand, evaluate, and trust—regardless of their technical background.",
  },
  {
    number: "05",
    title: "Never Stop Learning",
    body: "The software industry evolves faster than any individual can track. Maintaining a genuine commitment to learning—not just following trends—separates engineers who grow from those who stagnate.",
  },
  {
    number: "06",
    title: "Own the Outcome",
    body: "Accountability doesn't end at deployment. The real measure of engineering success is whether the software continued to deliver value to the business long after the sprint was closed and the ticket was marked done.",
  },
] as const;

function ValueRow({
  number,
  title,
  body,
  isLast,
}: (typeof VALUES)[number] & { isLast: boolean }) {
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

        {/* LEFT — oversized number */}
        <div className="shrink-0 lg:w-[15%]">
          <span
            className="select-none font-mono font-bold leading-none transition-colors duration-[250ms] lg:text-[140px]"
            style={{
              fontSize: "clamp(80px, 10vw, 140px)",
              color: hovered
                ? "hsl(var(--accent) / 0.18)"
                : "hsl(var(--foreground) / 0.06)",
            }}
          >
            {number}
          </span>
        </div>

        {/* CENTER — title */}
        <div className="shrink-0 lg:w-[35%] lg:pr-12">
          <h3 className="text-[24px] font-bold leading-snug tracking-tight text-foreground lg:text-[28px]">
            {title}
          </h3>
        </div>

        {/* RIGHT — body */}
        <div className="lg:w-[50%]">
          <p className="max-w-[500px] text-[15px] leading-[1.9] text-foreground/50">
            {body}
          </p>
        </div>
      </div>

      {/* animated sweep divider */}
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

export function CoreValues() {
  return (
    <section
      id="values"
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
            Core Values
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            What Guides Every{" "}
            <span className="font-serif italic text-accent-soft">
              Decision I Make
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
          {VALUES.map((v, i) => (
            <ValueRow key={v.number} {...v} isLast={i === VALUES.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
