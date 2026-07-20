"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Marketplace Platforms",
    description:
      "Two-sided marketplaces connecting buyers and sellers with payment processing, review systems, and real-time inventory.",
  },
  {
    title: "ERP Systems",
    description:
      "Enterprise resource planning systems that unify inventory, finance, HR, and operations into a single source of truth.",
  },
  {
    title: "CRM Systems",
    description:
      "Custom customer relationship management tools built around specific sales workflows and data requirements.",
  },
  {
    title: "SaaS Products",
    description:
      "Multi-tenant SaaS platforms with subscription billing, role-based access, and scalable architecture.",
  },
  {
    title: "AI Applications",
    description:
      "AI-powered tools including chatbots, document processing, RAG pipelines, workflow automation, and intelligent search.",
  },
  {
    title: "Internal Business Tools",
    description:
      "Custom dashboards, admin panels, reporting systems, and operational tools that replace slow spreadsheet workflows.",
  },
  {
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps with shared backend infrastructure, offline support, and native device integrations.",
  },
  {
    title: "Enterprise Software",
    description:
      "Large-scale systems serving thousands of users with complex permissions, audit trails, integrations, and compliance requirements.",
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
            The Types of Projects{" "}
            <span className="font-serif italic text-accent">I Build Often</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-panel-foreground/52">
            These are the most common engagements. If your project doesn't fit neatly
            into one of these—reach out anyway. Complex requirements are welcome.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-px bg-panel-foreground/[0.07] overflow-hidden rounded-[5px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-panel px-8 py-9 transition-colors duration-[250ms] hover:bg-panel-foreground/[0.03]"
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
