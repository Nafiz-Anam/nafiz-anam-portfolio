"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const OUTCOMES = [
  {
    value: "100+",
    label: "Projects Delivered",
    caption: "Web, SaaS, enterprise & AI systems",
  },
  {
    value: "7+",
    label: "Years Experience",
    caption: "Building production software since 2017",
  },
  {
    value: "5",
    label: "Countries Served",
    caption: "Clients across Australia, Europe, Asia & the Americas",
  },
  {
    value: "$50M+",
    label: "Business Value Unlocked",
    caption: "Measurable outcomes from software that actually works",
  },
  {
    value: "Lead",
    label: "Software Engineer",
    caption: "Engineering teams of 2–20 engineers",
  },
  {
    value: "Founder",
    label: "Technology Businesses",
    caption: "Agilo IT · Servero.io · Product engineering",
  },
] as const;

function OutcomeItem({ value, label, caption }: { value: string; label: string; caption: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-1 flex-col justify-center px-6 py-10 lg:px-8"
      animate={{
        y: hovered ? -3 : 0,
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.10)" : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <p
        className="whitespace-nowrap font-bold leading-none tracking-tight transition-colors duration-150"
        style={{
          fontSize: "clamp(18px, 2.2vw, 36px)",
          color: hovered ? "hsl(var(--accent))" : "hsl(var(--panel-foreground))",
        }}
      >
        {value}
      </p>
      <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.14em] text-panel-foreground/60">
        {label}
      </p>
      <p className="mt-1.5 text-[10px] leading-snug text-panel-foreground/35">{caption}</p>
    </motion.div>
  );
}

export function OutcomesStrip() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-24 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Track Record
          </p>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Impact, Not{" "}
            <span className="font-serif italic text-accent">Vanity Metrics.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] bg-panel"
        >
          <div className="flex flex-col divide-y divide-panel-foreground/[0.07] sm:flex-row sm:divide-x sm:divide-y-0">
            {OUTCOMES.map((o) => (
              <OutcomeItem key={o.label} {...o} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
