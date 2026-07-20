"use client";

import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";

const STATS = [
  { value: "50+", label: "Articles Published" },
  { value: "8", label: "Topic Categories" },
  { value: "4", label: "Content Series" },
  { value: "15k+", label: "Monthly Readers" },
] as const;

export function InsightsHero() {
  return (
    <section className="px-6 pb-28 pt-32 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px]">
          {/* Left */}
          <div className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                Insights
              </p>
              <h1
                className="font-bold leading-[1.0] tracking-tight text-foreground"
                style={{ fontSize: "clamp(40px, 5.8vw, 88px)" }}
              >
                Engineering Insights,
                <br />
                Practical Lessons &<br />
                <span className="font-serif italic text-accent">
                  Technical Leadership.
                </span>
              </h1>
              <p className="max-w-[520px] text-[16px] leading-[1.85] text-foreground/52">
                I share practical lessons from building software products,
                scaling systems, leading engineering teams, and helping
                businesses solve complex technical challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#articles">
                <Button className="rounded-[5px] bg-accent px-7 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                  Explore Articles
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="rounded-[5px] border-foreground/20 px-7 py-3 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
                >
                  Book Discovery Call
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right — editorial stat column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col justify-end divide-y divide-foreground/[0.08] lg:pt-20"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 py-6">
                <p className="font-mono text-[38px] font-bold leading-none tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/38">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
