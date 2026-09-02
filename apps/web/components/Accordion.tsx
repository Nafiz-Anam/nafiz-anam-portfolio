"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  variant?: "plus" | "chevron";
  theme?: "foreground" | "panel-foreground";
  defaultOpenIndex?: number | null;
  className?: string;
}

/* Single-open-at-a-time accordion. Shared by every FAQ section on the site. */
export function Accordion({
  items,
  variant = "plus",
  theme = "foreground",
  defaultOpenIndex = null,
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const text = theme === "panel-foreground" ? "text-panel-foreground" : "text-foreground";
  const muted = theme === "panel-foreground" ? "text-panel-foreground/50" : "text-foreground/50";

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const isLast = i === items.length - 1;

        return (
          <div
            key={item.q}
            className={
              isLast
                ? ""
                : `border-b ${
                    variant === "chevron"
                      ? "border-foreground/[0.07]"
                      : theme === "panel-foreground"
                        ? "border-panel-foreground/[0.08]"
                        : "border-foreground/[0.08]"
                  }`
            }
          >
            {variant === "chevron" ? (
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`text-[15px] font-semibold leading-snug transition-colors duration-150 ${
                    isOpen ? text : "text-foreground/70"
                  }`}
                >
                  {item.q}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`mt-1 shrink-0 text-foreground/35 transition-transform duration-250 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <path d="M2 5l5 5 5-5" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-8 py-8 text-left"
              >
                <p className={`text-[16px] font-bold leading-snug tracking-tight ${text}`}>
                  {item.q}
                </p>
                <span
                  className="mt-0.5 shrink-0 text-accent transition-transform duration-[250ms]"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </button>
            )}

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: variant === "chevron" ? 0.25 : 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p
                    className={
                      variant === "chevron"
                        ? "pb-6 text-[14px] leading-[1.88] text-foreground/55"
                        : `pb-8 text-[14px] leading-[1.85] ${muted}`
                    }
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
