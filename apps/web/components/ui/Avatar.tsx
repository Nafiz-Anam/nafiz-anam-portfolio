import { cn } from "@portfolio/ui";

interface AvatarProps {
  src?: string | null;
  initials: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, initials, size = 40, className }: AvatarProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt=""
        style={{ width: size, height: size }}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted",
        className
      )}
    >
      {initials}
    </div>
  );
}
