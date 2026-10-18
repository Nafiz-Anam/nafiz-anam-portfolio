"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { clipReveal, fadeUp, stagger, staggerItem, inView } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "clip" | "up" | "in";
}

export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const base =
    variant === "clip" ? clipReveal :
    variant === "in"   ? { hidden: { opacity: 0 }, show: { opacity: 1 } } :
    fadeUp;

  const variants = {
    hidden: base.hidden,
    show: {
      ...(base.show as object),
      transition: {
        ...((base.show as { transition?: object }).transition ?? {}),
        delay,
      },
    },
  };

  return (
    <m.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function RevealList({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}) {
  return (
    <m.div
      variants={stagger(staggerDelay, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div variants={staggerItem} className={className}>
      {children}
    </m.div>
  );
}
