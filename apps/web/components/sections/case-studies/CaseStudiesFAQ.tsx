"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "How do you measure the results shown in a case study?",
    a: "Whatever the client and I agreed mattered before the project started, usually a mix of business metrics (revenue, conversion, operational cost) and technical ones (performance, reliability, uptime). I don't report a number unless I can point to where it came from.",
  },
  {
    q: "Can I talk to a past client as a reference?",
    a: "Often, yes, with their permission. Ask during the discovery call and I'll tell you honestly whether that's possible for a project relevant to what you're evaluating.",
  },
  {
    q: "Do you only show the successful projects?",
    a: "I show the projects I can share publicly, which is mostly a permissions question, not a curation of only the wins. If something's directly relevant to your situation and isn't published here, ask me about it directly.",
  },
  {
    q: "Why don't some case studies include a client name?",
    a: "Some clients prefer to stay unnamed publicly, even when they're happy to be a reference privately. The work and the outcome are still real either way.",
  },
] as const;

export function CaseStudiesFAQ() {
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
