import { Button } from "@portfolio/ui";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultHero, type HeroContent } from "@/lib/placeholder-content";

export function Hero({ data = defaultHero }: { data?: HeroContent }) {
  return (
    <section id="intro" className="mx-auto max-w-[1800px] px-6 lg:px-16 pb-24 pt-12">
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="max-w-none text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            <span className="block font-sans text-foreground">{data.headlineLine1}</span>
            <span className="block whitespace-nowrap">
              <span className="font-serif italic text-accent-soft">{data.headlineLine2Serif}</span>{" "}
              <span className="font-sans text-foreground">{data.headlineLine2Sans}</span>
            </span>
          </h1>

          <div className="flex gap-6 pt-4 text-sm font-medium text-accent-soft/80 sm:pt-6">
            {data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16 grid grid-cols-1 items-center gap-16 rounded-[5px] bg-panel p-10 text-panel-foreground sm:grid-cols-[1fr_auto] sm:p-14">
          <div className="flex flex-col justify-center gap-10">
            <p className="text-center font-sans text-6xl font-bold sm:text-7xl">{data.name}</p>

            <p className="max-w-md text-base leading-[1.8] text-panel-muted">{data.pitch}</p>

            <div className="flex justify-end">
              <Button className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                {data.ctaLabel} 🤙
              </Button>
            </div>
          </div>

          <ImagePlaceholder
            src={data.photoUrl}
            aspectClassName="aspect-square"
            className="w-64 rounded-[5px] object-cover sm:w-72"
          />
        </div>
      </FadeIn>
    </section>
  );
}
