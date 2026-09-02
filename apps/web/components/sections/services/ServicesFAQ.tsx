"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "How does an engagement actually start?",
    a: "With a conversation about the problem, not a sales pitch. I ask questions until I understand what's actually going on, and only then do we talk about scope.",
  },
  {
    q: "Do you charge fixed price or hourly?",
    a: "Most engagements are scoped and fixed-price once we've agreed on what we're building. Ongoing technical leadership or advisory work runs as a monthly retainer instead.",
  },
  {
    q: "Can you work alongside our existing team?",
    a: "Yes, regularly. I can come in as a technical lead, an architecture reviewer, or the senior voice a team doesn't currently have.",
  },
  {
    q: "What if the project needs more than one engineer?",
    a: "I bring in vetted engineers through Agilo IT when the work needs more hands, while staying the technical lead accountable for the outcome.",
  },
  {
    q: "What happens once the project ships?",
    a: "Depends on what you need. Some clients move to an ongoing retainer, others prefer a clean handoff with full documentation. We agree on it before launch, not after.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always, and I'm happy to work from yours or provide mine.",
  },
] as const;

export function ServicesFAQ() {
  return (
    <section
      id="faq"
      className="dark bg-texture-lines-inset bg-surface px-6 py-28 text-foreground lg:px-16"
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
            FAQ
          </p>
          <h2 className="max-w-[560px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Questions About{" "}
            <span className="font-serif italic text-accent">
              Working Together
            </span>
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
