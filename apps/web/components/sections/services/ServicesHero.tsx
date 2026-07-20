"use client";

import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";

export function ServicesHero() {
  return (
    <section className="dark bg-texture-lines bg-background text-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pb-28 pt-20 lg:px-16 lg:pb-36 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-[10px] font-bold uppercase tracking-[0.22em] text-accent"
        >
          Services
        </motion.p>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_400px] lg:items-end">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-12"
          >
            <h1
              className="font-bold leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(42px, 6vw, 84px)" }}
            >
              Engineering Services{" "}
              <span className="font-serif italic text-accent">Built Around</span>
              <br className="hidden sm:block" />
              {" "}Business Goals.
            </h1>

            <p className="max-w-[560px] text-[16px] leading-[1.85] text-foreground/55">
              Every engagement starts with understanding what the business actually needs—
              not what technology is trending. I partner with founders, product teams, and
              engineering organizations to design and build software that solves real
              problems and delivers long-term value.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="rounded-[5px] bg-accent px-9 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                Book Discovery Call
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px] border-foreground/20 bg-transparent px-9 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Right: stat column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col divide-y divide-foreground/[0.08] rounded-[5px] border border-foreground/[0.08] bg-panel p-10 text-panel-foreground"
          >
            {[
              { value: "7+", label: "Years Engineering" },
              { value: "100+", label: "Projects Delivered" },
              { value: "6", label: "Service Disciplines" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline justify-between py-6 first:pt-0 last:pb-0">
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-panel-foreground/45">
                  {label}
                </p>
                <p className="text-[28px] font-bold leading-none tracking-tight text-panel-foreground">
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
