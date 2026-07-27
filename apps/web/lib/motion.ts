import type { Variants } from "framer-motion";

// ─── Easing ────────────────────────────────────────────────────────────────
export const ease = {
  out:   [0.16, 1, 0.3, 1]   as [number, number, number, number], // expo-out
  in:    [0.4, 0, 1, 1]      as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1]  as [number, number, number, number],
} as const;

// ─── Duration ──────────────────────────────────────────────────────────────
export const dur = { xs: 0.25, sm: 0.5, md: 0.75, lg: 1.0 } as const;

// ─── Core reveal: clip-path + y — the most impactful text entrance ─────────
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  show: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: dur.md, ease: ease.out },
  },
};

// ─── General fade-up (non-text) ────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: dur.md, ease: ease.out } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 64 },
  show:   { opacity: 1, x: 0,  transition: { duration: dur.md, ease: ease.out } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -64 },
  show:   { opacity: 1, x: 0,  transition: { duration: dur.md, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1,    transition: { duration: dur.md, ease: ease.out } },
};

// ─── Stagger containers ────────────────────────────────────────────────────
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: dur.sm, ease: ease.out } },
};

// ─── whileInView defaults ─────────────────────────────────────────────────
export const inView = { once: true, margin: "-60px" };
