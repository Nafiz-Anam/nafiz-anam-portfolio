"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(cy, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHoveringLink(!!(t.closest("a, button, [role='button']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cx, cy, visible]);

  return (
    <>
      {/* Dot — snaps directly to cursor */}
      <motion.div
        style={{ x: cx, y: cy, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
        className="mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hoveringLink ? 0 : 1, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </motion.div>

      {/* Ring — lags behind */}
      <motion.div
        style={{ x: sx, y: sy, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9998 }}
        className="mix-blend-difference"
      >
        <motion.div
          animate={{
            width:   hoveringLink ? 56 : 32,
            height:  hoveringLink ? 56 : 32,
            opacity: visible ? 1 : 0,
            scale:   hoveringLink ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        />
      </motion.div>
    </>
  );
}
