"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// Site-wide `m.*` components (see framer-motion's LazyMotion docs) render
// through the smaller domAnimation feature set instead of the full `motion`
// component, which bundles every feature (drag, layout, SVG, gestures) into
// every instance. ArticlePageTemplate still uses `motion`/layoutId directly
// since its TOC indicator needs layout animations domAnimation doesn't cover.
export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
