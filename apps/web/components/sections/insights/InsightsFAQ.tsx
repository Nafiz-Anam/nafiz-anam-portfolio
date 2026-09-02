"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
    <div className={isLast ? "" : "border-b border-foreground/[0.08]"}>
      <button
        onClick={onToggle}
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

export function InsightsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              {...faq}
              isLast={i === FAQS.length - 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
