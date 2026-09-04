"use client";

import { motion } from "framer-motion";
import { BookingButton } from "@/components/sections/BookingButton";

export function HowItWorkCTA() {
  return (
    <section className="bg-texture-lines bg-background py-32 text-foreground">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 gap-16 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Let&apos;s Talk
            </p>
            <h2 className="max-w-[760px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              See How This Would{" "}
              <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
                Actually Work for You.
              </span>
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.85] text-panel-foreground/55">
              The first conversation is free, with no obligation. Tell me about your project,
              and I&apos;ll walk you through exactly how an engagement like this would run.
            </p>

            {/* trust signals */}
            <div className="mt-2 flex flex-wrap gap-6">
              {["No obligation", "Free 30-minute call", "Clear next steps", "Fast response"].map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                  />
                  <span className="text-[12px] font-medium text-panel-foreground/55">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <BookingButton location="how_it_work_cta" className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a
              href="/case-studies"
              className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-panel-foreground/40 transition-colors hover:text-panel-foreground/70"
            >
              View Case Studies →
            </a>
          </div>
        </motion.div>

        {/* bottom divider strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 border-t border-panel-foreground/[0.07] pt-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-panel-foreground/35">
              Typically responds within 24 hours.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Custom Software Development", "SaaS Engineering", "AI Automation", "Technical Consulting", "Architecture Review"].map((service) => (
                <a
                  key={service}
                  href="/services"
                  className="text-[11px] text-panel-foreground/35 transition-colors hover:text-panel-foreground/65"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
