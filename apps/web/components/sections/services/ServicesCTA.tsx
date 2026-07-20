import { Button } from "@portfolio/ui";
import { FadeIn } from "@/components/FadeIn";

export function ServicesCTA() {
  return (
    <section
      id="services-cta"
      className="bg-panel bg-texture-lines-panel px-6 py-36 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <FadeIn className="flex flex-col items-center gap-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Start Here
          </p>
          <h2
            className="max-w-[720px] font-bold leading-[1.0] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(38px, 5.5vw, 70px)" }}
          >
            Let's Build Something{" "}
            <span className="font-serif italic text-accent">
              Great Together.
            </span>
          </h2>
          <p className="max-w-[500px] text-[15px] leading-[1.85] text-panel-foreground/55">
            The first conversation is free and there's no obligation. Tell me what
            you're building and we'll figure out if I'm the right partner for it.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Button className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </Button>
            <Button
              variant="outline"
              className="rounded-[5px] border-panel-foreground/20 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-widest text-panel-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              View My Work
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
