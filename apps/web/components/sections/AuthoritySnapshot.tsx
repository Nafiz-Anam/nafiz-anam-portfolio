"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const statVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const STATS = [
  {
    value: "7+",
    label: "Years of Experience",
    caption: "Building production software since 2019",
  },
  {
    value: "800+",
    label: "Projects Delivered",
    caption: "Web, SaaS, and enterprise systems shipped",
  },
  {
    value: "Lead",
    label: "Software Engineer",
    caption: "Leading engineering at GrainX, Australia",
  },
  {
    value: "Founder",
    label: "Agilo IT",
    caption: "Software consultancy & product development",
  },
  {
    value: "Co-Founder",
    label: "Syrona IT",
    caption: "Company behind Servero.io tracking platform",
  },
  {
    value: "Global",
    label: "Clients",
    caption: "Working across Australia, Europe & Asia",
  },
] as const;

function StatItem({ value, label, caption }: { value: string; label: string; caption: string }) {
  return (
    <motion.div
      variants={statVariants}
      whileHover={{ y: -3 }}
      className="group relative flex flex-1 flex-col justify-center px-6 py-10 transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)] lg:px-8"
    >
      <p
        className="whitespace-nowrap font-bold leading-none tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent"
        style={{ fontSize: "clamp(18px, 2.2vw, 36px)" }}
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
        <div className="overflow-hidden rounded-[5px] border border-panel-foreground/10 bg-panel-foreground/[0.04]">
          <SectionReveal
            className="flex flex-col divide-y divide-panel-foreground/[0.07] sm:flex-row sm:divide-x sm:divide-y-0"
            stagger={0.14}
            margin="-40px"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
