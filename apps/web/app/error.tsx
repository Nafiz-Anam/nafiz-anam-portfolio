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
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center text-foreground">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
        Something went wrong
      </p>
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        <span className="font-sans text-foreground">Unexpected</span>{" "}
        <span className="font-serif italic text-accent">error</span>
      </h1>
      <p className="max-w-sm text-[15px] leading-relaxed text-foreground/55">
        An error occurred loading this page. The issue has been logged.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-[5px] border border-foreground/10 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
