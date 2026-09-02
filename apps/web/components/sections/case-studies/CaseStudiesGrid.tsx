"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ProjectListItem } from "@portfolio/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Cycle image aspect ratio per card so column heights fall unevenly — masonry, not grid.
const IMAGE_ASPECTS = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/10]"];

function CaseStudyCard({ project, index }: { project: ProjectListItem; index: number }) {
  const aspect = IMAGE_ASPECTS[index % IMAGE_ASPECTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: (index % 3) * 0.05 }}
      className="group mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-background transition-colors duration-300 hover:border-foreground/[0.15]"
    >
      {/* Image */}
      <div className={`relative ${aspect} overflow-hidden bg-foreground/[0.04]`}>
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

export function CaseStudiesGrid({
  projects: initialProjects,
  industries = [],
  total = 0,
  initialLimit = 12,
}: {
  projects: ProjectListItem[];
  industries?: string[];
  total?: number;
  initialLimit?: number;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const allLoaded = projects.length >= total;

  const tabs = ["All", ...industries.filter(Boolean)];
  const filtered = projects.filter((p) => {
    const matchIndustry = active === "All" || p.industry === active;
    const q = search.toLowerCase().trim();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || (p.client ?? "").toLowerCase().includes(q);
    return matchIndustry && matchSearch;
  });

  async function loadMore() {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API}/projects?page=${nextPage}&limit=${initialLimit}`);
      const data = await res.json() as { projects: ProjectListItem[] };
      setProjects((prev) => [...prev, ...(data.projects ?? [])]);
      setPage(nextPage);
    } catch {
      // silent fail
    } finally {
      setLoadingMore(false);
    }
  }

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
          className="mb-10 flex flex-col gap-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">All Case Studies</p>
          <h2 className="text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl">
            <span className="font-sans text-foreground">Real Projects.</span>{" "}
            <span className="font-serif italic text-accent">Measurable Results.</span>
          </h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[600px] text-[15px] leading-[1.85] text-foreground/50">
              Each engagement below began with a specific business problem and ended with a
              production system delivering quantifiable impact.
            </p>
            <input
              type="search"
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[5px] border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent sm:w-64"
            />
          </div>
        </motion.div>

        {/* Industry filter */}
        {tabs.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`rounded-[3px] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                  active === tab
                    ? "bg-accent text-accent-foreground"
                    : "border border-foreground/10 text-foreground/50 hover:border-foreground/20 hover:text-foreground/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {projects.length === 0 ? (
          <p className="text-sm text-foreground/40">No case studies published yet.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-foreground/40">No case studies in this industry yet.</p>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="columns-1 gap-6 sm:columns-2">
              {filtered.map((p, i) => (
                <CaseStudyCard key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!search && active === "All" && !allLoaded && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 rounded-[5px] border border-foreground/15 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground/90 disabled:opacity-50"
            >
              {loadingMore && <Loader2 size={13} className="animate-spin" />}
              {loadingMore ? "Loading…" : `Load more (${projects.length} of ${total})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
