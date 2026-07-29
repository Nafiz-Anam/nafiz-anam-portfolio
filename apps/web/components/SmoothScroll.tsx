"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    });

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

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hoverTimeout);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
