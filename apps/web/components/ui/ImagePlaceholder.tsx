import Image from "next/image";
import { cn } from "@portfolio/ui";

interface ImagePlaceholderProps {
  src?: string | null;
  alt?: string;
  aspectClassName?: string;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
}

function hashHue(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function ImagePlaceholder({
  src,
  alt = "",
  aspectClassName = "aspect-video",
  className,
  label,
  priority,
  sizes = "100vw",
}: ImagePlaceholderProps) {
  if (src) {
    // Callers either size the box themselves (default) or pass "absolute inset-0"
    // to fill an already-positioned ancestor (e.g. Footer's own relative wrapper).
    // tailwind-merge resolves the position conflict below deterministically —
    // whichever className supplies last wins — so both patterns stay correct.
    const fillsAncestor = className?.includes("absolute");
    return (
      <div
        className={cn(
          fillsAncestor ? "absolute inset-0" : cn(aspectClassName, "relative w-full"),
          "overflow-hidden rounded-xl",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      </div>
    );
  }

  if (label) {
    const hue = hashHue(label);
    return (
      <div
        className={cn(
          aspectClassName,
          "flex w-full items-center justify-center rounded-xl text-2xl font-bold text-white",
          className
        )}
        style={{ backgroundColor: `hsl(${hue} 55% 38%)` }}
      >
        {label.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={cn(
        aspectClassName,
        "w-full rounded-xl bg-gradient-to-br from-border/60 to-border/20",
        className
      )}
    />
  );
}
