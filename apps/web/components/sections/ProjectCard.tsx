"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@portfolio/ui";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@portfolio/types";

type ProjectCardProps = { project: Project; className?: string };

export function ProjectCard({ project, className }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.a
      ref={ref}
      href={`/case-studies/${project.slug}`}
      className={cn("group relative flex h-full flex-col overflow-hidden rounded-[5px] bg-[#F7F1EC]", className)}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", willChange: "transform" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {project.coverImageUrl && (
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      )}

      <motion.span
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white"
        whileHover={{ scale: 1.15, rotate: 45 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight size={16} />
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-sm font-bold text-white leading-tight">{project.title}</p>
        {project.excerpt && (
          <p className="mt-1 line-clamp-2 text-xs text-white/70">{project.excerpt}</p>
        )}
      </div>
    </motion.a>
  );
}
