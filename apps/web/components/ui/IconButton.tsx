import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@portfolio/ui";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "accent";
}

export function IconButton({ children, variant = "outline", className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
        variant === "outline" && "border border-border text-foreground hover:bg-surface",
        variant === "accent" && "bg-accent text-accent-foreground hover:bg-accent/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
