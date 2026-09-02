import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { SERVER_API as API } from "@/lib/api-url";
import type { Project } from "@portfolio/types";

async function getPublishedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API}/projects?limit=6`, {
      next: { revalidate: 60, tags: ["projects"] },
    });
    if (!res.ok) return [];
    const data = await res.json() as { projects: Project[] };
    return data.projects ?? [];
  } catch {
    return [];
  }
}

export async function WorkGrid() {
  const projects = await getPublishedProjects();
  const p = (i: number) => projects[i] ?? null;

  return (
    <section id="work" className="dark bg-texture-lines bg-background px-6 py-24 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal>
          <h2 className="text-4xl font-bold leading-none sm:text-5xl">
            <span className="font-serif italic text-accent">Recent</span>{" "}
            <span className="font-sans text-foreground">Work</span>
          </h2>
        </Reveal>

        {projects.length === 0 ? (
          <p className="mt-14 text-sm text-muted-foreground">No projects published yet.</p>
        ) : (
          <div className="mt-14 flex flex-col gap-5">
            {(p(0) || p(1)) && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {p(0) && (
                  <div className="h-[440px] sm:col-span-2">
                    <ProjectCard project={p(0)!} />
                  </div>
                )}
                {p(1) && (
                  <div className="h-[440px] sm:col-span-1">
                    <ProjectCard project={p(1)!} />
                  </div>
                )}
              </div>
            )}

            {(p(2) || p(3)) && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                <div className="hidden sm:block" />
                {p(2) && (
                  <div className="h-[360px] sm:col-span-1">
                    <ProjectCard project={p(2)!} />
                  </div>
                )}
                {p(3) && (
                  <div className="h-[360px] sm:col-span-2">
                    <ProjectCard project={p(3)!} />
                  </div>
                )}
              </div>
            )}

            {(p(4) || p(5)) && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {p(4) && (
                  <div className="h-[360px] sm:col-span-2">
                    <ProjectCard project={p(4)!} />
                  </div>
                )}
                {p(5) && (
                  <div className="h-[360px] sm:col-span-2">
                    <ProjectCard project={p(5)!} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            href="/case-studies"
            className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            See all works
          </Link>
        </div>
      </div>
    </section>
  );
}
