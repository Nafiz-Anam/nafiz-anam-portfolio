import { ArrowUpRight } from "lucide-react";
import { cn } from "@portfolio/ui";

export function ProjectCard({ className }: { className?: string }) {
  return (
    <div className={cn("group relative h-full overflow-hidden rounded-[5px] bg-[#F7F1EC]", className)}>
      <span className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
        <ArrowUpRight size={16} />
      </span>
    </div>
  );
}
