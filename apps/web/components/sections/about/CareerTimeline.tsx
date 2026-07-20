"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    title: "Lead Software Engineer",
    org: "Grain Marketplace",
    period: "2023 – Present",
    description:
      "Leading frontend and full-stack engineering for an agricultural commodity trading platform. Responsible for architecture decisions, code quality standards, cross-functional team coordination, and delivering scalable product features that serve international markets.",
  },
  {
    title: "Founder & CEO",
    org: "Agilo IT",
    period: "2021 – Present",
    description:
      "Built a software consultancy from the ground up. Leads architecture reviews, technical strategy, and engineering execution for clients across fintech, logistics, e-commerce, and SaaS verticals.",
  },
  {
    title: "Co-Founder & CTO",
    org: "Servero.io",
    period: "2022 – 2023",
    description:
      "Co-founded a service management SaaS product. Designed the product architecture, led development, and drove go-to-market engineering through early-stage validation and launch.",
  },
  {
    title: "Founder",
    org: "Agilo Academy",
    period: "2022 – Present",
    description:
      "Founded an education platform focused on practical software engineering skills. Built the curriculum infrastructure and mentored over 80 students through full-stack development and career readiness programs.",
  },
  {
    title: "Software Engineer",
    org: "Earlier Career",
    period: "2017 – 2021",
    description:
      "Built production systems across multiple industries. Developed deep expertise in full-stack web engineering, backend architecture, API design, and cloud deployment.",
  },
] as const;

export function CareerTimeline() {
  return (
    <section
      id="career"
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
            Career
          </p>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            A Decade of{" "}
            <span className="font-serif italic text-accent">Building & Leading</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-[860px]">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={`${m.org}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="relative"
            >
              {/* vertical connector */}
              {i < MILESTONES.length - 1 && (
                <div className="absolute left-[3px] top-[24px] h-full w-px bg-foreground/[0.11]" />
              )}

              <div className="flex gap-9 pb-14 last:pb-0">
                {/* dot */}
                <div className="mt-[9px] shrink-0">
                  <div className="h-[7px] w-[7px] rounded-full bg-accent" />
                </div>

                {/* content */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <p className="text-[20px] font-bold leading-snug tracking-tight">
                      {m.title}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      {m.org}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/32">
                    {m.period}
                  </p>
                  <p className="max-w-[620px] text-[14px] leading-[1.85] text-foreground/50">
                    {m.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
