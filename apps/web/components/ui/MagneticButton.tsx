"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Tag = "div",
  href,
  onClick,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.div
      style={{ x: sx, y: sy, display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );

  const props = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { display: "inline-block" },
    ...(href ? { href } : {}),
    ...(onClick ? { onClick } : {}),
    ...(type ? { type } : {}),
  };

  if (Tag === "a") return <a {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>} href={href}>{inner}</a>;
  if (Tag === "button") return <button {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}>{inner}</button>;
  return <div {...props as React.HTMLAttributes<HTMLDivElement>}>{inner}</div>;
}
