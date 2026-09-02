"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/Accordion";

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

export function FAQSection({ faqs: data }: { faqs?: typeof FAQS }) {
  const faqs = data ?? FAQS;
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
          <Accordion items={faqs} theme="panel-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
