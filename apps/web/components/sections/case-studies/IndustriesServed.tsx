"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  "Marketplace Platforms",
  "Healthcare",
  "Education",
  "Retail & eCommerce",
  "Finance & FinTech",
  "Logistics",
  "Enterprise Software",
  "SaaS Products",
  "Manufacturing",
  "Government",
  "AI & Automation",
  "Real Estate",
] as const;

export function IndustriesServed() {
  return (
    <section className="bg-panel py-24 text-panel-foreground">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 items-start gap-16 sm:grid-cols-[300px_1fr]"
        >
          {/* Left label */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Industries Served
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Deep domain knowledge across{" "}
              <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
                every sector.
              </span>
            </h2>
            <p className="text-[13px] leading-[1.8] text-panel-foreground/50">
              Industry-specific constraints inform every architecture decision. Understanding the
              regulatory, operational, and UX requirements of a domain is what separates
              good software from the right software.
            </p>
          </div>

          {/* Right: industry list */}
          <div className="flex flex-col divide-y divide-panel-foreground/[0.07]">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
                className="group flex items-center justify-between py-4 transition-colors duration-200 hover:text-accent"
              >
                <span className="text-[15px] font-medium tracking-tight text-panel-foreground transition-colors duration-200 group-hover:text-accent">
                  {industry}
                </span>
                <span className="font-mono text-[11px] text-panel-foreground/25 transition-colors duration-200 group-hover:text-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
