"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookingButton } from "@/components/sections/BookingButton";

export function HowItWorkHero() {
  return (
    <section className="mx-auto max-w-[1800px] px-6 pb-28 pt-16 lg:px-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent"
      >
        How I Work
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="mt-6 max-w-[900px] text-5xl font-bold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl"
      >
        <span className="font-sans text-foreground">The Process Behind</span>{" "}
        <span className="block font-serif italic text-accent">Every Engagement.</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
        className="mt-8 flex max-w-[680px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <p className="text-[16px] leading-[1.85] text-foreground/55">
          Good outcomes aren&apos;t an accident of talent, they&apos;re the result of a process
          that catches problems early, keeps everyone aligned, and treats delivery as the
          beginning of the relationship, not the end of it. This is what that actually looks
          like, step by step.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
        className="mt-12 flex flex-wrap gap-4"
      >
        <BookingButton className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
          Book Discovery Call
        </BookingButton>
        <Link
          href="/case-studies"
          className="rounded-[5px] border border-foreground/20 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-foreground/40 hover:bg-foreground/5"
        >
          View Case Studies
        </Link>
      </motion.div>
    </section>
  );
}
