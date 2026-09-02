"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "What does Nafiz Anam actually do?",
    a: "I work as a technology and product partner for growth-stage businesses and funded founders: diagnosing technical problems, making architecture and technology decisions, and leading or executing the fix, whether that's a custom build, a SaaS product, an AI automation system, or hands-on engineering leadership.",
  },
  {
    q: "Who do you actually work with?",
    a: "Mainly two kinds of clients: funded founders and startups scaling a product past its MVP, and growing businesses whose systems or processes have started limiting growth. If you're not sure you fit either, reach out anyway.",
  },
  {
    q: "Is working with Agilo IT different from working with you directly?",
    a: "No, they're the same thing. Agilo IT is the consultancy I founded, and it's how engagements get delivered, whether that's just me or a small team I bring in for a larger scope.",
  },
  {
    q: "Do you take on smaller projects, or only large ones?",
    a: "Project size varies with what's actually needed, not a fixed minimum. A focused technical consulting engagement and a full product build are both within scope, the right project matters more than fitting a specific size.",
  },
  {
    q: "Where are you based, and do you work with international clients?",
    a: "Based in Khulna, Bangladesh, and most clients are international, across Australia, Europe, and the US. Work is fully remote with flexible hours to overlap with your team's timezone.",
  },
] as const;

export function HomeFAQ() {
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
