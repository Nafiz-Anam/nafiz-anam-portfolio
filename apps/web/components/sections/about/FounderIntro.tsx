"use client";

import { motion } from "framer-motion";

export function FounderIntro() {
  return (
    <section className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              The Story
            </p>
            <h2 className="text-[40px] font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-[52px]">
              Engineer.{" "}
              <span className="font-serif italic text-accent">Founder.</span>
              <br />
              Architect.
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="flex flex-col gap-7"
          >
            <p className="text-[16px] leading-[1.9] text-panel-foreground/62">
              My career began writing code. It evolved into designing systems. Then leading
              teams. Then building companies. Each step added a new dimension to how I think
              about software—not just as a technical discipline, but as a business function
              that must earn its place through real outcomes.
            </p>
            <p className="text-[16px] leading-[1.9] text-panel-foreground/62">
              I founded Agilo IT to bring senior-level engineering leadership to businesses
              that needed it without the overhead of a full-time hire. I co-founded
              Servero.io to solve real operational problems through software. I built Agilo
              Academy to develop the next generation of engineers. Through all of it, the
              core question remained the same: what does this business actually need from
              its technology?
            </p>
            <p className="text-[16px] leading-[1.9] text-panel-foreground/62">
              Today I work as Lead Software Engineer at Grain Marketplace—leading
              architecture, engineering standards, and product delivery—while continuing to
              consult with founders, startups, and growth-stage companies on technical
              strategy, system design, and scalable engineering.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
