"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: string;       // e.g. "50+" or "8" or "$2M+"
  duration?: number;   // ms
  className?: string;
}

function parseNumber(v: string): { num: number; prefix: string; suffix: string } {
  const match = v.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: v };
  return {
    prefix: match[1] ?? "",
    num: parseFloat((match[2] ?? "0").replace(/,/g, "")),
    suffix: match[3] ?? "",
  };
}

export function Counter({ value, duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  const { num, prefix, suffix } = parseNumber(value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // ease-out-quart
      const current = Math.round(eased * num);
      setDisplay(current.toLocaleString());
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(num % 1 === 0 ? num.toLocaleString() : String(num));
    };
    requestAnimationFrame(tick);
  }, [inView, num, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
