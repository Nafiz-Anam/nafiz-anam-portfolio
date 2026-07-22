import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@portfolio/ui";
import type { Project } from "@portfolio/types";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/case-studies/${project.slug}`}
      className={cn("group relative flex h-full flex-col overflow-hidden rounded-[5px] bg-[#F7F1EC]", className)}
    >
      {project.coverImageUrl && (
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      )}

      <span className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
        <ArrowUpRight size={16} />
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-sm font-bold text-white leading-tight">{project.title}</p>
        {project.excerpt && (
          <p className="mt-1 line-clamp-2 text-xs text-white/70">{project.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
