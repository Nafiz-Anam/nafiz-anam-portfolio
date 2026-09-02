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
              Engineer. Founder.
              <br />
              <span className="font-serif italic text-accent">Architect.</span>
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
              My career began writing code. It evolved into designing systems, then leading
              teams, then building companies of my own. Each step added a layer to how I
              think about software: not just as a technical discipline, but as a business
              function that has to earn its place through real outcomes.
            </p>
            <p className="text-[16px] leading-[1.9] text-panel-foreground/62">
              I founded Agilo IT to bring senior-level engineering leadership to businesses
              that need it without the overhead of a full-time hire. I later co-founded
              Syrona IT, the company behind Servero.io, a server-side Google Tag Manager
              hosting platform that gives ecommerce brands reliable tracking infrastructure
              for ad platforms like Facebook, Google, and TikTok. Through all of it, the
              question hasn't changed: what does this business actually need from
              technology?
            </p>
            <p className="text-[16px] leading-[1.9] text-panel-foreground/62">
              Today, that means leading engineering at Grain Marketplace, Australia's grain
              trading platform, while continuing to build Agilo IT and Syrona IT, and
              consulting directly with founders and growing businesses on technical
              strategy, system architecture, and hands-on engineering.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
