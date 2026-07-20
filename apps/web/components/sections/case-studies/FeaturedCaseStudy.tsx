"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function FeaturedCaseStudy() {
  return (
    <section className="bg-panel py-28 text-panel-foreground">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex items-end justify-between"
        >
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Featured Case Study
            </p>
            <h2 className="text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl">
              The Project That{" "}
              <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
                Changed Everything.
              </span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.08]"
        >
          {/* Large image */}
          <div className="relative h-[420px] w-full overflow-hidden bg-panel-foreground/[0.04] sm:h-[520px]">
            <ImagePlaceholder
              label="B2B Marketplace Platform Rebuild"
              aspectClassName="h-full"
              className="h-full rounded-none object-cover"
            />
            {/* industry tag */}
            <div className="absolute left-8 top-8">
              <span className="rounded-[3px] bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
                Marketplace
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-0 divide-y divide-panel-foreground/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0">

            {/* Left: challenge + summary */}
            <div className="flex flex-col gap-6 p-10 lg:p-14">
              <div>
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-panel-foreground/40">
                  Business Challenge
                </p>
                <p className="text-[15px] font-bold leading-snug text-panel-foreground">
                  A 10-year-old PHP monolith serving 40,000 daily users was collapsing under load —
                  3-second page loads, frequent downtime, and a team unable to ship features without breaking production.
                </p>
              </div>
              <p className="text-[14px] leading-[1.8] text-panel-foreground/55">
                The client, a B2B wholesale marketplace operating in Southeast Asia, needed a complete
                platform rebuild without taking the business offline. This required a phased migration
                strategy, strangler fig pattern, and a zero-downtime cutover plan across 14 weeks of
                parallel operation.
              </p>
              <div>
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-panel-foreground/40">
                  My Role
                </p>
                <p className="text-[13px] font-medium text-panel-foreground/75">
                  Lead Architect · Engineering Lead · Technical Strategy
                </p>
              </div>
            </div>

            {/* Right: outcomes */}
            <div className="flex flex-col justify-between p-10 lg:p-14">
              <div className="flex flex-col gap-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-panel-foreground/40">
                  Business Outcomes
                </p>

                {[
                  { metric: "400%", label: "Transaction throughput increase" },
                  { metric: "60%", label: "Reduction in infrastructure costs" },
                  { metric: "0", label: "Hours of planned downtime during migration" },
                  { metric: "14 weeks", label: "Full production migration timeline" },
                ].map(({ metric, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <p className="text-3xl font-bold tracking-tight text-panel-foreground sm:text-4xl">
                      {metric}
                    </p>
                    <p className="text-[12px] text-panel-foreground/45">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-75"
                >
                  Read Full Case Study
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
