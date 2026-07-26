"use client";

import { motion } from "framer-motion";
import { BookingButton } from "@/components/sections/BookingButton";

export function CaseStudiesCTA() {
  return (
    <section className="bg-panel py-32 text-panel-foreground">
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
              Start a Conversation
            </p>
            <h2 className="max-w-[760px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Have a Complex Software{" "}
              <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
                Challenge?
              </span>
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.85] text-panel-foreground/55">
              Let&apos;s talk about your project. A 30-minute discovery call is enough to
              understand the problem, identify the risks, and map a path forward — with no
              obligation and no sales pitch.
            </p>

            {/* trust signals */}
            <div className="mt-2 flex flex-wrap gap-6">
              {["No obligation", "Free 30-min call", "Clear next steps", "Fast response"].map((signal) => (
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
            <BookingButton className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a
              href="/services"
              className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-panel-foreground/40 transition-colors hover:text-panel-foreground/70"
            >
              Explore Services →
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
