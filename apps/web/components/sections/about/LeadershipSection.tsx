"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    heading: "Technical Leadership",
    body: "Setting technical direction isn't about writing the most code. It's about making the calls that shape everything the team builds after: architecture, standards, and the tradeoffs nobody else wants to own.",
  },
  {
    heading: "Mentoring Engineers",
    body: "The engineers I've led remember the decisions we made together more than the code itself. Growing other engineers compounds. Writing every line yourself doesn't.",
  },
  {
    heading: "Architecture Thinking",
    body: "Every system I design starts with the assumption that requirements will change. The job isn't predicting the future correctly, it's building something that doesn't break when you inevitably get it wrong.",
  },
  {
    heading: "Product Thinking",
    body: "Clean, elegant code that solves the wrong problem is still the wrong outcome. Engineering decisions have to serve what the business actually needs, not just what's technically interesting.",
  },
  {
    heading: "Business Communication",
    body: "Technical excellence has no value when it can't be explained to the people it affects. Translating complexity into clarity, for founders, product managers, and clients, is a core engineering responsibility.",
  },
  {
    heading: "Decision-Making Under Uncertainty",
    body: "The hardest engineering decisions happen with incomplete information and limited time. Experienced leaders have frameworks for making defensible calls quickly, and revisiting them gracefully when the evidence changes.",
  },
] as const;

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[3fr_4fr] lg:items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              How I Lead
            </p>
            <h2 className="text-[40px] font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-[52px]">
              Engineering{" "}
              <span className="font-serif italic text-accent">leadership</span>{" "}
              is a discipline, not a title.
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
