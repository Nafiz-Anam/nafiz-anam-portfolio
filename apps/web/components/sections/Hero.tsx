import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultHero, type HeroContent } from "@/lib/placeholder-content";
import { BookingButton } from "./BookingButton";

const AVAILABILITY_CONFIG = {
  available: { dot: "bg-green-400", text: "Available for work" },
  limited: { dot: "bg-amber-400", text: "Limited availability" },
  unavailable: { dot: "bg-red-400", text: "Not available" },
} as const;

export function Hero({
  data,
  availability,
}: {
  data?: Partial<HeroContent>;
  availability?: string | null;
}) {
  const merged: HeroContent = { ...defaultHero, ...Object.fromEntries(Object.entries(data ?? {}).filter(([, v]) => v !== undefined)) };
  const badge = availability ? AVAILABILITY_CONFIG[availability as keyof typeof AVAILABILITY_CONFIG] : null;

  return (
    <section id="intro" className="mx-auto max-w-[1800px] px-6 lg:px-16 pb-24 pt-12">
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="max-w-none text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            <span className="block font-sans text-foreground">{merged.headlineLine1}</span>
            <span className="block whitespace-nowrap">
              <span className="font-serif italic text-accent">{merged.headlineLine2Serif}</span>{" "}
              <span className="font-sans text-foreground">{merged.headlineLine2Sans}</span>
            </span>
          </h1>

          <div className="flex flex-col items-end gap-3 pt-4 sm:pt-6">
            <div className="flex gap-6 text-sm font-medium text-accent/80">
              {merged.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
                <span className={`h-1.5 w-1.5 rounded-full ${badge.dot} animate-pulse`} />
                {badge.text}
              </span>
            )}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16 grid grid-cols-1 items-center gap-16 rounded-[5px] bg-panel p-10 text-panel-foreground sm:grid-cols-[1fr_auto] sm:p-14">
          <div className="flex flex-col justify-center gap-10">
            <p className="text-center font-sans text-6xl font-bold sm:text-7xl">{merged.name}</p>

            <p className="max-w-md text-base leading-[1.8] text-panel-muted">{merged.pitch}</p>

            <div className="flex justify-end">
              <BookingButton className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
                {merged.ctaLabel}
              </BookingButton>
            </div>
          </div>

          <ImagePlaceholder
            src={merged.photoUrl}
            aspectClassName="aspect-square"
            className="w-64 rounded-[5px] object-cover sm:w-72"
          />
        </div>
      </FadeIn>
    </section>
  );
}
