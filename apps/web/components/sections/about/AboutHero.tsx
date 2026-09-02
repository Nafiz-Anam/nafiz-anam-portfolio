"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookingButton } from "@/components/sections/BookingButton";

export function AboutHero() {
  return (
    <section className="dark bg-texture-lines bg-background text-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pb-28 pt-20 lg:px-16 lg:pb-32 lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-[10px] font-bold uppercase tracking-[0.22em] text-accent"
        >
          About Nafiz Anam
        </motion.p>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-12"
          >
            <h1 className="max-w-[760px] font-bold leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(44px, 6.5vw, 88px)" }}
            >
              Building Software
              <br />
              That{" "}
              <span className="font-serif italic text-accent">Businesses</span>
              <br />
              Can Depend On.
            </h1>

            <p className="max-w-[540px] text-[16px] leading-[1.85] text-foreground/55">
              Software engineer, architect, and founder with seven years building
              products that scale. I help businesses design, build, and grow software
              systems, from early-stage product decisions to enterprise-scale
              architecture.
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

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[360px]"
          >
            <ImagePlaceholder
              src="/Nafiz-Anam.jpg"
              aspectClassName="aspect-[3/4]"
              className="w-full rounded-[5px] object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
