"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { markIntroDone } from "@/lib/intro-signal";

const DOT_START = 1100;   // ms after mount — name is done at ~800ms, 300ms hold
const DOT_DURATION = 650; // ms for iris expand (matches transition below)

export function PageIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [dotVisible, setDotVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDotVisible(true), DOT_START);
    const t2 = setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      markIntroDone();
    }, DOT_START + DOT_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E0E1D]"
    >
      {/* Name */}
      <motion.div
        style={{ overflow: "hidden" }}
        animate={dotVisible ? { opacity: 0, y: -12 } : {}}
        transition={{ duration: 0.2 }}
      >
        <motion.p
          className="font-sans text-4xl font-bold text-white sm:text-6xl"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Nafiz{" "}
          <motion.span
            className="font-serif italic"
            style={{ color: "hsl(13, 79%, 57%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Anam.
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Iris */}
      {dotVisible && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "hsl(13, 79%, 57%)",
            clipPath: "circle(4px at 50% 50%)",
          }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: DOT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
