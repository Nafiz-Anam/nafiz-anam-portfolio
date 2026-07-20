"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "What industries do you work with?",
    a: "I've worked across fintech, logistics, agriculture, e-commerce, education, and enterprise SaaS. Industry context matters less than the underlying problem: most software challenges—architecture, scalability, team structure, technical debt—are fundamentally similar across verticals.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. Early-stage startups benefit most from senior-level thinking applied with speed. I help founders avoid expensive architectural mistakes early, prioritize features that actually matter, and build systems that can scale without requiring a full rewrite at Series A.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, on a selective basis. I work with agencies that need senior technical leadership for specific client projects—particularly those involving architecture reviews, scalability challenges, or complex system integrations.",
  },
  {
    q: "Can you join an existing engineering team?",
    a: "Yes. I've embedded into multiple existing teams as a senior engineer and technical lead. I focus on raising code quality, improving architecture practices, unblocking delivery bottlenecks, and mentoring team members without disrupting existing momentum.",
  },
  {
    q: "Can you lead an engineering team?",
    a: "Yes. My current role at Grain Marketplace includes engineering leadership responsibilities. Through Agilo IT, I've also provided fractional CTO and technical leadership services to several businesses during critical growth stages.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Frontend: React, Next.js, TypeScript. Backend: Node.js, NestJS, Laravel. Cloud: AWS, Docker, Kubernetes. Databases: PostgreSQL, MongoDB, Redis. AI & Automation: OpenAI, LangChain, Model Context Protocol, RAG pipelines. Technology choices are always driven by business requirements, not personal preference.",
  },
  {
    q: "How do projects typically begin?",
    a: "Every engagement starts with a discovery call to understand the business problem, current technical state, and desired outcomes. From there I propose an engagement scope—whether that's a one-time architecture review, a fixed-scope build, or an ongoing technical partnership.",
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
    <div className={isLast ? "" : "border-b border-panel-foreground/[0.08]"}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-8 py-8 text-left"
      >
        <p className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground">
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
            <p className="pb-8 text-[14px] leading-[1.85] text-panel-foreground/52">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
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
          <h2 className="max-w-[560px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
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
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} {...faq} isLast={i === FAQS.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
