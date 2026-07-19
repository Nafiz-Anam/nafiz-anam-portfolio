"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

export function useGsap<T extends HTMLElement>(
  setup: (ctx: gsap.Context, el: T) => void,
  deps: unknown[] = []
): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context((self) => setup(self as gsap.Context, ref.current as T), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
