"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="dark bg-texture-lines flex min-h-screen flex-col items-center justify-center gap-10 bg-background px-6 text-center text-foreground">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Something Went Wrong</p>
      <h1
        className="font-bold leading-[0.95] tracking-tight"
        style={{ fontSize: "clamp(48px, 9vw, 100px)" }}
      >
        <span className="text-foreground">Unexpected</span>
        <br />
        <span className="font-serif italic text-accent">Error.</span>
      </h1>
      <p className="max-w-[420px] text-[16px] leading-[1.85] text-foreground/55">
        An error occurred loading this page. The issue has been logged and I&apos;ll look into it.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-[5px] bg-accent px-9 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90"
        >
          Try Again
        </button>
        <a
          href="/"
          className="rounded-[5px] border border-foreground/20 bg-transparent px-9 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
