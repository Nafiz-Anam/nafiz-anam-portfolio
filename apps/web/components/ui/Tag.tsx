import type { ReactNode } from "react";
import { cn } from "@portfolio/ui";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
