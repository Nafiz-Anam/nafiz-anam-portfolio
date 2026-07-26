"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  {
    name: "Grain Marketplace",
    role: "Lead Software Engineer",
    period: "2023 – Present",
    description:
      "Agricultural commodity trading platform serving buyers and sellers across international markets. Leading frontend architecture, code quality standards, and product engineering.",
  },
  {
    name: "Agilo IT",
    role: "Founder & CEO",
    period: "2021 – Present",
    description:
      "Software consultancy delivering architecture, development, and technical leadership to growth-stage businesses across fintech, logistics, and enterprise SaaS.",
  },
  {
    name: "Servero.io",
    role: "Co-Founder & CTO",
    period: "2022 – 2023",
    description:
      "Service management SaaS product built to streamline field operations for service-based businesses. Led product architecture and full engineering execution.",
  },
  {
    name: "Agilo Academy",
    role: "Founder",
    period: "2022 – Present",
    description:
      "Education platform developing the next generation of software engineers through practical, mentorship-driven curriculum and structured learning programs.",
  },
] as const;

export function CompaniesVentures({ companies: data }: { companies?: typeof COMPANIES }) {
  const companies = data ?? COMPANIES;
  return (
    <section
      id="ventures"
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
            Companies & Ventures
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Organizations I've{" "}
            <span className="font-serif italic text-accent">Built & Led</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.08]"
        >
          {companies.map((co, i) => (
            <div
              key={co.name}
              className={`grid grid-cols-1 gap-5 px-10 py-10 lg:grid-cols-[220px_180px_1fr] lg:items-start${i < companies.length - 1 ? " border-b border-panel-foreground/[0.07]" : ""}`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-[18px] font-bold tracking-tight text-panel-foreground">
                  {co.name}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-panel-foreground/35">
                  {co.period}
                </p>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent lg:pt-1">
                {co.role}
              </p>
              <p className="text-[14px] leading-[1.8] text-panel-foreground/52">
                {co.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
