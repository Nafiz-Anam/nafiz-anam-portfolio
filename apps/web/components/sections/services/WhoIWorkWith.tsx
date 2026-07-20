"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CLIENTS = [
  {
    type: "Startups",
    description:
      "Early-stage founders who need senior technical judgment without a full-time CTO. I help validate architecture decisions, avoid expensive early mistakes, and build a foundation that can grow.",
  },
  {
    type: "Growing Businesses",
    description:
      "Companies that have proven their market fit and need to scale their systems without breaking what works. I focus on reliability, performance, and sustainable engineering practices.",
  },
  {
    type: "Agencies",
    description:
      "Digital agencies that need senior technical leadership for complex client builds. I embed as a technical partner, handling architecture and engineering decisions that go beyond the agency's core capability.",
  },
  {
    type: "Enterprise Teams",
    description:
      "Larger organizations modernizing legacy systems, integrating new technology, or building internal tools. I bring an outsider's perspective with the technical depth to navigate complex environments.",
  },
  {
    type: "Founders",
    description:
      "Non-technical or semi-technical founders who need a trusted engineering partner from day one. I translate business requirements into technical decisions and keep the roadmap aligned with commercial goals.",
  },
  {
    type: "Product Teams",
    description:
      "Product managers and engineering leads who need architectural guidance, a senior technical voice, or someone to unblock a critical delivery. I integrate into existing teams without adding friction.",
  },
] as const;

function ClientRow({
  type,
  description,
  isLast,
}: (typeof CLIENTS)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
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
        {/* left accent bar */}
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-all duration-[250ms]"
          style={{
            backgroundColor: hovered
              ? "hsl(var(--accent))"
              : "transparent",
          }}
        />

        <div className="flex flex-col gap-4 px-10 py-10 lg:flex-row lg:items-baseline lg:gap-0">
          <div className="shrink-0 lg:w-[32%]">
            <p
              className="text-[22px] font-bold tracking-tight transition-colors duration-[250ms]"
              style={{
                color: hovered
                  ? "hsl(var(--accent))"
                  : "hsl(var(--foreground))",
              }}
            >
              {type}
            </p>
          </div>
          <div className="lg:w-[68%]">
            <p className="max-w-[680px] text-[14px] leading-[1.85] text-foreground/50">
              {description}
            </p>
          </div>
        </div>
      </div>
      {!isLast && (
        <div className="mx-10 border-b border-foreground/[0.07]" />
      )}
    </>
  );
}

export function WhoIWorkWith() {
  return (
    <section
      id="who-i-work-with"
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
            Who I Work With
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Built for Businesses That{" "}
            <span className="font-serif italic text-accent">
              Take Software Seriously
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
          {CLIENTS.map((c, i) => (
            <ClientRow
              key={c.type}
              {...c}
              isLast={i === CLIENTS.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
