"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookingButton } from "@/components/sections/BookingButton";

export function ServicesHero() {
  return (
    <section className="dark bg-texture-lines bg-background text-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pb-28 pt-20 lg:px-16 lg:pb-36 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-[10px] font-bold uppercase tracking-[0.22em] text-accent"
        >
          Services
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col gap-12"
        >
          <h1
            className="max-w-[900px] font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(42px, 6vw, 84px)" }}
          >
            Most Technology Problems{" "}
            <span className="font-serif italic text-accent">Start Before the Code.</span>
          </h1>

          <p className="max-w-[560px] text-[16px] leading-[1.85] text-foreground/55">
            By the time something breaks, in your product, your operations, or your
            growth, the real cause is usually a decision made months earlier: the wrong
            architecture, the wrong priority, or no senior judgment in the room at all.
            My services start with finding that cause, then fixing it.
          </p>

          <div className="flex flex-wrap gap-4">
            <BookingButton className="rounded-[5px] bg-accent px-9 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <Link
              href="/case-studies"
              className="rounded-[5px] border border-foreground/20 bg-transparent px-9 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
