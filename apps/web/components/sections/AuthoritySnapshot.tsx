"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STATS = [
  {
    value: "7+",
    label: "Years of Experience",
    caption: "Building production software since 2019",
  },
  {
    value: "100+",
    label: "Projects Delivered",
    caption: "Web, SaaS & enterprise systems",
  },
  {
    value: "Lead",
    label: "Software Engineer",
    caption: "Leading engineering teams and architecture",
  },
  {
    value: "Founder",
    label: "Agilo IT",
    caption: "Software consultancy & product development",
  },
  {
    value: "Co-Founder",
    label: "Servero.io",
    caption: "Server-side tracking platform",
  },
  {
    value: "Global",
    label: "Clients",
    caption: "Working across Australia, Europe & Asia",
  },
] as const;

function StatItem({ value, label, caption }: { value: string; label: string; caption: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-1 flex-col justify-center px-6 py-10 lg:px-8"
      animate={{
        y: hovered ? -3 : 0,
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.10)"
          : "0 0px 0px rgba(0,0,0,0)",
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
      <p className="mt-1.5 text-[10px] leading-snug text-panel-foreground/35">
        {caption}
      </p>
    </motion.div>
  );
}

export function AuthoritySnapshot() {
  return (
    <section className="px-6 pb-24 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="overflow-hidden rounded-[5px] bg-panel"
        >
          <div className="flex flex-col divide-y divide-panel-foreground/[0.07] sm:flex-row sm:divide-x sm:divide-y-0">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
