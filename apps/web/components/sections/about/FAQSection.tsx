"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "Can you join an existing engineering team?",
    a: "Yes. I regularly step into existing teams as a technical lead or senior contributor, working within their existing processes rather than replacing them.",
  },
  {
    q: "Can you lead an engineering team?",
    a: "Yes, that's often exactly the gap I'm brought in to fill: providing technical leadership for a team that's shipping, but doesn't yet have someone senior setting the direction.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "I work primarily across modern web and cloud stacks: React and Next.js on the frontend, Node.js and related backend frameworks, and cloud infrastructure on AWS. The stack is always a means to an end though, chosen based on what the business actually needs, not what's trending.",
  },
  {
    q: "How do projects typically begin?",
    a: "With a conversation about the actual problem, not a spec. From there I can tell you honestly whether it's a technical consulting engagement, a build, or something else entirely.",
  },
] as const;

function FAQItem({
  q,
  a,
  isLast,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  isLast: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={isLast ? "" : "border-b border-panel-foreground/[0.08]"}>
      <button
        onClick={onToggle}
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

export function FAQSection({ faqs: data }: { faqs?: typeof FAQS }) {
  const faqs = data ?? FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="dark bg-surface bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
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
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              {...faq}
              isLast={i === faqs.length - 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
