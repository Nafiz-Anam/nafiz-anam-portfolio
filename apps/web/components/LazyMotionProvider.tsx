"use client";

import { LazyMotion } from "framer-motion";

// Site-wide `m.*` components (see framer-motion's LazyMotion docs) render
// through the smaller domAnimation feature set instead of the full `motion`
// component, which bundles every feature (drag, layout, SVG, gestures) into
// every instance. ArticlePageTemplate still uses `motion`/layoutId directly
// since its TOC indicator needs layout animations domAnimation doesn't cover.
// Passing a loader (instead of the imported bundle) keeps domAnimation's code
// out of the initial script entirely — it's fetched as its own chunk, so it
// doesn't compete with the hero for main-thread time before first paint.
const loadDomAnimationFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadDomAnimationFeatures}>{children}</LazyMotion>;
}
