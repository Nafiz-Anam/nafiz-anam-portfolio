"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    title: "Founder",
    org: "Agilo IT",
    period: "March 2024 – Present",
    description:
      "Founded a software consultancy to bring senior-level engineering leadership to businesses that need it without the overhead of a full-time hire. Agilo IT now delivers custom software development, SaaS product engineering, AI automation, and technical consulting for clients across Australia, Europe, and Asia.",
  },
  {
    title: "Lead Software Engineer",
    org: "Grain Marketplace",
    period: "May 2026 – Present",
    description:
      "Leading engineering for Australia's grain trading platform, connecting growers and buyers nationwide. Responsible for the architecture and technical direction behind a live trading platform that has to stay reliable at scale, working fully remote from Bangladesh.",
  },
  {
    title: "Co-Founder",
    org: "Syrona IT",
    period: "January 2026 – Present",
    description:
      "Co-founded Syrona IT, the company behind Servero.io, a server-side Google Tag Manager hosting platform, similar in category to Stape.io, that gives ecommerce brands reliable server-side tracking infrastructure for ad platforms like Facebook, Google, and TikTok.",
  },
  {
    title: "Founder",
    org: "Agilo Academy",
    period: "December 2024 – February 2026",
    description:
      "A training institute built to develop the next generation of engineers.",
  },
  {
    title: "Senior Software Engineer, Full Stack",
    org: "LatentHQ",
    period: "February 2021 – April 2026",
    description:
      "Spent over five years as a senior full-stack engineer, owning features end-to-end across frontend and backend. Worked closely with product and design to ship reliable, production-grade systems, and built the deep full-stack foundation that now shapes how I lead engineering teams.",
  },
] as const;

export function CareerTimeline({ milestones: data }: { milestones?: typeof MILESTONES }) {
  const milestones = data ?? MILESTONES;
  return (
    <section
      id="career"
      className="dark bg-texture-lines bg-surface px-6 py-28 text-foreground lg:px-16"
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
            The Journey
          </p>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Years of{" "}
            <span className="font-serif italic text-accent">Building & Leading</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-[860px]">
          {milestones.map((m, i) => (
            <motion.div
              key={`${m.org}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="relative"
            >
              {/* vertical connector */}
              {i < milestones.length - 1 && (
                <div className="absolute left-[3px] top-[24px] h-full w-px bg-foreground/[0.11]" />
              )}

              <div className={`flex gap-9 ${i < milestones.length - 1 ? "pb-10" : ""}`}>
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
