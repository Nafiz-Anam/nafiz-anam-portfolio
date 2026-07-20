"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "How do engagements typically start?",
    a: "Every project begins with a no-commitment discovery call. We talk through the business problem, current technical state, timeline, and budget. I'll then outline a proposed engagement scope. There's no obligation to proceed—the call exists to determine fit.",
  },
  {
    q: "Do you work on a fixed-price or hourly basis?",
    a: "Both, depending on the project. Fixed-price works well for well-defined scopes. Hourly or retainer arrangements suit ongoing consulting, architecture reviews, and long-term partnerships where the scope evolves over time.",
  },
  {
    q: "Can you work within our existing team?",
    a: "Yes. I embed into existing teams regularly. I adapt to your workflow—whether that's Jira, Linear, Slack, or a daily standup. The goal is to add value immediately without disrupting what's already working.",
  },
  {
    q: "What's your availability?",
    a: "Availability varies by engagement. For full-project builds, I take on one primary client at a time to ensure focus. For consulting and advisory roles, I can work with multiple clients concurrently. Book a call to discuss current availability.",
  },
  {
    q: "How do you handle projects that require a full team?",
    a: "For larger projects that require more than one engineer, I can bring in trusted collaborators from my network—designers, frontend developers, and backend engineers I've worked with before. I remain the technical lead and single point of accountability throughout.",
  },
  {
    q: "What happens after the project launches?",
    a: "I offer ongoing support, feature development, and technical advisory arrangements after launch. The preferred model is a long-term partnership rather than a handoff—software is never truly finished, and the best outcomes come from sustained engagement.",
  },
  {
    q: "Do you sign NDAs and contracts?",
    a: "Yes. I sign NDAs before any sensitive business discussion and work under formal contracts for all engagements. IP ownership, confidentiality, payment terms, and delivery milestones are documented clearly before work begins.",
  },
] as const;

function FAQItem({
  q,
  a,
  isLast,
}: {
  q: string;
  a: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={isLast ? "" : "border-b border-foreground/[0.08]"}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-8 py-8 text-left"
      >
        <p className="text-[16px] font-bold leading-snug tracking-tight text-foreground">
          {q}
        </p>
        <span
          className="mt-0.5 shrink-0 text-accent transition-transform duration-[250ms]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8 2v12M2 8h12" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[14px] leading-[1.85] text-foreground/50">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServicesFAQ() {
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
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} {...faq} isLast={i === FAQS.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
