"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ProjectListItem } from "@portfolio/types";

function CaseStudyCard({ project, index }: { project: ProjectListItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-background transition-colors duration-300 hover:border-foreground/[0.15]"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-foreground/[0.04]">
        {project.coverImageUrl ? (
          <img
            src={project.coverImageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/5 to-background">
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">{project.industry}</span>
          </div>
        )}
        {project.industry && (
          <div className="absolute left-6 top-6">
            <span className="rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
              {project.industry}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-8">
        <h3 className="text-[18px] font-bold leading-snug tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="text-[13px] leading-[1.75] text-foreground/60">{project.excerpt}</p>

        <div className="flex flex-col gap-4 border-t border-foreground/[0.07] pt-5">
          {project.role && (
            <div>
              <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">My Role</p>
              <p className="text-[12px] font-medium text-foreground/60">{project.role}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">Business Outcome</p>
              <p className="text-[13px] font-bold text-foreground/80">{project.outcome}</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={`/case-studies/${project.slug}`}
            className="group/link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-75"
          >
            Read Case Study
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudiesGrid({ projects }: { projects: ProjectListItem[] }) {
  return (
    <section
      id="all-case-studies"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex flex-col gap-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">All Case Studies</p>
          <h2 className="text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl">
            <span className="font-sans text-foreground">Real Projects.</span>{" "}
            <span className="font-serif italic text-accent">Measurable Results.</span>
          </h2>
          <p className="mt-2 max-w-[600px] text-[15px] leading-[1.85] text-foreground/50">
            Each engagement below began with a specific business problem and ended with a
            production system delivering quantifiable impact.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-sm text-foreground/40">No case studies published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <CaseStudyCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
