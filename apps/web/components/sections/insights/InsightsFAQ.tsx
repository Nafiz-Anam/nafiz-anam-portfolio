"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "How often do you publish?",
    a: "No fixed schedule. I write when I have something genuinely useful to say, not to hit a quota.",
  },
  {
    q: "What topics do you cover?",
    a: "Mostly software architecture, engineering leadership, and the technical decisions founders and growing businesses get wrong most often. Occasionally, lessons from running Agilo IT and Syrona IT directly.",
  },
  {
    q: "Can I suggest a topic?",
    a: "Yes. If there's a technical problem you're wrestling with and can't find a clear answer to, send it through the contact page. It's often exactly the kind of thing worth writing about.",
  },
  {
    q: "Are these articles technical, or written for business readers?",
    a: "Both, depending on the piece. Some go deep on architecture for other engineers. Others are written for founders and business leaders who need to understand a technical tradeoff without needing to implement it themselves.",
  },
] as const;

export function InsightsFAQ() {
  return (
    <section
      id="faq"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
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
            Common Questions
          </p>
          <h2 className="max-w-[560px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Questions About{" "}
            <span className="font-serif italic text-accent">These Insights</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-[860px]"
        >
          <Accordion items={FAQS} defaultOpenIndex={0} />
        </motion.div>
      </div>
    </section>
  );
}
