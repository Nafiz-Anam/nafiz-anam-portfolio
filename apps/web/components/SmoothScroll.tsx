"use client";

import { useEffect } from "react";
import { setLenisInstance } from "@/lib/lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    // Lenis is loaded as its own chunk instead of the initial bundle — the
    // smooth-scroll polish isn't needed for the very first frame, so there's
    // no reason for its module cost to compete with the hero for main-thread
    // time before first paint.
    let cleanup: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4,
      });
      setLenisInstance(lenis);

      let raf: number;
      function loop(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);

      // Prevent :hover from toggling mid-scroll — a row's boundary crossing
      // a stationary cursor while scrolling would otherwise repaint (box-shadow/
      // border-color/background-color aren't compositor-only) every frame, jittering the scroll.
      let hoverTimeout: ReturnType<typeof setTimeout>;
      function onScroll() {
        document.documentElement.classList.add("is-scrolling");
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          document.documentElement.classList.remove("is-scrolling");
        }, 120);
      }
      lenis.on("scroll", onScroll);

      cleanup = () => {
        cancelAnimationFrame(raf);
        clearTimeout(hoverTimeout);
        lenis.off("scroll", onScroll);
        lenis.destroy();
        setLenisInstance(null);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
