"use client";

/**
 * SectionReveal — wraps a section so ALL direct motion children
 * stagger automatically (no individual whileInView needed on children).
 * Children just need `variants` from lib/motion.
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  stagger?: number;
  delay?: number;
  margin?: string;
}

export function SectionReveal({
  children,
  className,
  as: Tag = "div",
  stagger = 0.13,
  delay = 0,
  margin = "-80px",
}: SectionRevealProps) {
  const Wrapper = motion[Tag];
  return (
    <Wrapper
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </Wrapper>
  );
}

// ── Typed children variants (use on direct children of SectionReveal) ───────

export const titleVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  show:   { clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export const bodyVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.94 },
  show:   { opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export const lineVariants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  show:   { scaleX: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
