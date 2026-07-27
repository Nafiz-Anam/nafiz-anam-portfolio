"use client";

import { motion } from "framer-motion";
import { inView } from "@/lib/motion";

interface AnimatedHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
}

export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  splitBy = "word",
}: AnimatedHeadingProps) {
  const units = splitBy === "char"
    ? children.split("")
    : children.split(" ");

  return (
    <Tag className={className} style={{ overflow: "hidden" }} aria-label={children}>
      <span className="flex flex-wrap" aria-hidden>
        {units.map((unit, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={inView}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * (splitBy === "char" ? 0.025 : 0.06),
            }}
            style={{ display: "inline-block" }}
          >
            {unit}{splitBy === "word" ? " " : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
