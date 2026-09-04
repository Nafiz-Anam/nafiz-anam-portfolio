"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "What if I don't know exactly what I need yet?",
    a: "That's normal, and it's what Discovery is for. Most engagements start with a rough problem, not a finished spec, and the scope gets defined together, not handed to you as a take-it-or-leave-it proposal.",
  },
  {
    q: "Do you provide fixed timelines?",
    a: "Yes, once scope is defined. You'll get a real timeline as part of the proposal, not an open-ended estimate that keeps slipping.",
  },
  {
    q: "What happens if the scope changes mid-project?",
    a: "It gets discussed openly, with the impact on timeline and cost made clear before anything changes, not discovered afterward in an invoice.",
  },
  {
    q: "Do you use my team's existing tools, or your own?",
    a: "Yours, wherever possible. Communication and project tracking happen in whatever your team already uses.",
  },
] as const;

export function HowItWorkFAQ() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">FAQ</p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Common Questions,{" "}
            <span className="font-serif italic text-accent">Direct Answers</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-[860px]"
        >
          <Accordion items={FAQS} />
        </motion.div>
      </div>
    </section>
  );
}
