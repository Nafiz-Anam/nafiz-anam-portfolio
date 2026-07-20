"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    heading: "Technical Leadership",
    body: "Writing great code is the baseline. Leading teams toward better architecture, cleaner practices, and smarter decisions is where engineering maturity shows up. I work on the system of engineering, not just the code inside it.",
  },
  {
    heading: "Mentoring Engineers",
    body: "The fastest way to scale an engineering culture is through people, not tooling. Mentoring junior and mid-level engineers creates leverage that no individual contributor can match on their own.",
  },
  {
    heading: "Architecture Thinking",
    body: "Every significant technical decision has compounding consequences. Strong architecture prevents expensive rewrites, enables faster iteration, and reduces future risk. Time spent designing systems correctly upfront saves months of remediation later.",
  },
  {
    heading: "Product Thinking",
    body: "Software engineers who understand business outcomes build better systems. Feature prioritization, architectural trade-offs, and delivery decisions all improve when engineering thinks in terms of outcomes—not outputs.",
  },
  {
    heading: "Business Communication",
    body: "Technical excellence loses its value when it cannot be explained to the people it affects. Translating complexity into clarity—for founders, product managers, and clients—is a core engineering responsibility.",
  },
  {
    heading: "Decision-Making Under Uncertainty",
    body: "The hardest engineering decisions happen with incomplete information and limited time. Experienced leaders have frameworks for making defensible calls quickly and reversing them gracefully when the evidence changes.",
  },
] as const;

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[2fr_3fr] lg:items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Leadership Beyond Code
            </p>
            <h2 className="text-[40px] font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-[52px]">
              Engineering{" "}
              <span className="font-serif italic text-accent">leadership</span>{" "}
              is a discipline,
              <br className="hidden sm:block" /> not a title.
            </h2>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="flex flex-col divide-y divide-panel-foreground/[0.08]"
          >
            {PILLARS.map((p) => (
              <div key={p.heading} className="py-9 first:pt-0 last:pb-0">
                <p className="mb-3 text-[17px] font-bold tracking-tight text-panel-foreground">
                  {p.heading}
                </p>
                <p className="text-[14px] leading-[1.85] text-panel-foreground/52">
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
