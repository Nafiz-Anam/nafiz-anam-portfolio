import { cn } from "@portfolio/ui";

interface ImagePlaceholderProps {
  src?: string | null;
  alt?: string;
  aspectClassName?: string;
  className?: string;
  label?: string;
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
}: ImagePlaceholderProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={cn(aspectClassName, "w-full rounded-xl object-cover", className)}
      />
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
