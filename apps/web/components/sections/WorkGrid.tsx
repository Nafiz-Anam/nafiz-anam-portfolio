import { Button } from "@portfolio/ui";
import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "./ProjectCard";

export function WorkGrid() {
  return (
    <section id="work" className="dark bg-texture-lines bg-background px-6 py-24 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <FadeIn>
          <h2 className="text-4xl font-bold leading-none sm:text-5xl">
            <span className="font-serif italic text-accent">Recent</span>{" "}
            <span className="font-sans text-foreground">Work</span>
          </h2>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="h-[440px] sm:col-span-2">
              <ProjectCard />
            </div>
            <div className="h-[440px] sm:col-span-1">
              <ProjectCard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="hidden sm:block" />
            <div className="h-[360px] sm:col-span-1">
              <ProjectCard />
            </div>
            <div className="h-[360px] sm:col-span-2">
              <ProjectCard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="h-[360px] sm:col-span-2">
              <ProjectCard />
            </div>
            <div className="h-[360px] sm:col-span-2">
              <ProjectCard />
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Button className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
            See all works
          </Button>
        </div>
      </div>
    </section>
  );
}
