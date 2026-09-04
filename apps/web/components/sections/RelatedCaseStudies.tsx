import Link from "next/link";
import type { ProjectListItem } from "@portfolio/types";

import { SERVER_API as API } from "@/lib/api-url";

async function getLatestProjects(): Promise<ProjectListItem[]> {
  try {
    const res = await fetch(`${API}/projects?limit=3`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json() as { projects: ProjectListItem[] };
    return data.projects?.slice(0, 3) ?? [];
  } catch {
    return [];
  }
}

export async function RelatedCaseStudies() {
  const projects = await getLatestProjects();
  if (projects.length === 0) return null;

  return (
    <section className="dark bg-texture-lines bg-background px-6 py-24 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-12 flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Related Work
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              <span className="font-sans text-foreground">See It</span>{" "}
              <span className="font-serif italic text-accent">In Action.</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-accent/60 transition-colors hover:text-accent sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/case-studies/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-background transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_0_32px_-4px_hsl(var(--accent)/0.35)]"
            >
              {/* Cover */}
              <div className="relative h-[180px] overflow-hidden bg-foreground/[0.04]">
                {p.coverImageUrl ? (
                  <img
                    src={p.coverImageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/5 to-background">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(hsl(var(--panel-foreground) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--panel-foreground) / 0.03) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <span className="relative font-mono text-[10px] uppercase tracking-wider text-foreground/30">{p.industry}</span>
                  </div>
                )}
                {p.industry && (
                  <span className="absolute left-4 top-4 rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
                    {p.industry}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-[16px] font-bold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-accent">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="line-clamp-2 text-[13px] leading-[1.7] text-foreground/50">{p.excerpt}</p>
                )}
                {p.outcome && (
                  <div className="mt-auto pt-3 border-t border-foreground/[0.07]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">Outcome</p>
                    <p className="mt-1 text-[12px] font-bold text-foreground/70">{p.outcome}</p>
                  </div>
                )}
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent/60 transition-all group-hover:gap-1.5 group-hover:text-accent">
                  Read case study →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/case-studies" className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent/60 hover:text-accent">
            View all case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
