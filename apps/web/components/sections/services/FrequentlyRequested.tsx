"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Marketplace & Two-Sided Platforms",
    description:
      "Connecting buyers and sellers, with payments, reviews, and inventory handled properly from the start.",
  },
  {
    title: "SaaS Products & Internal Tools",
    description:
      "From a first paying customer to a platform that can support thousands of them.",
  },
  {
    title: "AI-Powered Automation",
    description:
      "Removing manual, repetitive work from a business's day-to-day operations.",
  },
  {
    title: "ERP & CRM Systems",
    description:
      "Custom-built around how your team actually sells and operates, not a generic template.",
  },
  {
    title: "Legacy System Modernization",
    description:
      "Replacing or rebuilding the systems a growing business has outgrown, without a risky big-bang rewrite.",
  },
  {
    title: "Mobile Applications",
    description:
      "Cross-platform apps built for real-world performance, not just a demo.",
  },
] as const;

export function FrequentlyRequested() {
  return (
    <section
      id="project-types"
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
            Frequently Requested
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            What This{" "}
            <span className="font-serif italic text-accent">Usually Looks Like</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-panel-foreground/52">
            If your project doesn't fit neatly into one of these, reach out anyway.
            Most of the interesting work doesn't fit a template.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="dark group flex flex-col gap-4 rounded-[5px] border border-panel-foreground/[0.08] bg-background px-8 py-9 transition-colors duration-[250ms] hover:border-panel-foreground/[0.14]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground">
                {p.title}
              </p>
              <p className="text-[13px] leading-[1.8] text-panel-foreground/48">
                {p.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
