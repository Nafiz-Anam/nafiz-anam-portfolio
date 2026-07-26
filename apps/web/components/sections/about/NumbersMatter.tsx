"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STATS = [
  { value: "7+", label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "3+", label: "Countries Served" },
  { value: "Lead", label: "Software Engineer" },
  { value: "2", label: "Companies Founded" },
  { value: "80+", label: "Students Mentored" },
] as const;

function StatItem({ value, label }: { value: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-2.5 px-8 py-12 transition-colors duration-[250ms]"
      style={{
        backgroundColor: hovered
          ? "hsl(var(--accent) / 0.04)"
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="whitespace-nowrap font-bold leading-none tracking-tight transition-colors duration-[200ms]"
        style={{
          fontSize: "clamp(20px, 2.4vw, 38px)",
          color: hovered
            ? "hsl(var(--accent))"
            : "hsl(var(--panel-foreground))",
        }}
      >
        {value}
      </p>
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-panel-foreground/42">
        {label}
      </p>
    </div>
  );
}

export function NumbersMatter({ stats: data }: { stats?: typeof STATS }) {
  const stats = data ?? STATS;
  return (
    <section
      id="numbers"
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
            By the Numbers
          </p>
          <h2 className="max-w-[520px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Numbers That{" "}
            <span className="font-serif italic text-accent">Matter</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap overflow-hidden rounded-[5px] bg-panel"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex min-w-[33.333%] flex-1 ${i > 0 ? "border-l border-panel-foreground/[0.07]" : ""} ${i >= 3 ? "border-t border-panel-foreground/[0.07]" : ""}`}
            >
              <StatItem {...stat} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
