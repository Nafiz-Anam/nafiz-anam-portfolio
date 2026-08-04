"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "I start with a deep conversation about the business—not the technology. What problem are we solving? Who are the users? What does success look like in six months? This shapes everything that follows.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "With clear business context, we define a technical strategy: what to build, in what order, with what constraints. Priorities are set around business impact, not technical interest.",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "Before any code is written, the system design is documented. Data models, API contracts, infrastructure decisions, and scalability considerations are resolved upfront to prevent costly rewrites later.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Engineering begins with quality standards established from day one. Code reviews, automated testing, and clear delivery milestones ensure the build stays on track and the codebase remains maintainable.",
  },
  {
    number: "05",
    title: "Deployment",
    description:
      "Production deployment is handled with care—CI/CD pipelines, monitoring, rollback plans, and infrastructure hardening. The goal is a system that is reliable on day one, not just functional.",
  },
  {
    number: "06",
    title: "Long-Term Partnership",
    description:
      "The work doesn't end at launch. I stay involved as a technical partner—reviewing performance, planning new features, and ensuring the system continues to evolve with the business.",
  },
] as const;

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
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
            How I Work
          </p>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            A Process Built Around{" "}
            <span className="font-serif italic text-accent">Outcomes</span>
          </h2>
          <p className="max-w-[540px] text-[15px] leading-[1.85] text-panel-foreground/52">
            Every engagement follows a structured process that keeps business goals at
            the centre of every technical decision.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="dark flex flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-10"
            >
              <p
                className="font-mono text-[42px] font-bold leading-none"
                style={{ color: "hsl(var(--accent) / 0.35)" }}
              >
                {step.number}
              </p>
              <p className="text-[18px] font-bold tracking-tight text-panel-foreground">
                {step.title}
              </p>
              <p className="text-[13px] leading-[1.85] text-panel-foreground/50">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
