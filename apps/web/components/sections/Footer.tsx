import { Button } from "@portfolio/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultFooter, type FooterContent } from "@/lib/placeholder-content";

function SquareBullet() {
  return <span className="inline-block h-1.5 w-1.5 shrink-0 bg-panel-muted" aria-hidden="true" />;
}

export function Footer({ data = defaultFooter }: { data?: FooterContent }) {
  return (
    <footer className="dark bg-texture-lines bg-surface px-6 pb-20 pt-4 lg:px-16">
      <div className="mx-auto max-w-[1800px] overflow-hidden rounded-[5px] border border-panel-foreground bg-panel bg-texture-lines-panel p-8 text-panel-foreground sm:p-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-between gap-10">
            <p className="font-sans text-7xl font-bold leading-none tracking-tight sm:text-8xl">
              {data.brand}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium uppercase tracking-wide text-panel-muted">
              {data.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex items-center gap-2 hover:text-panel-foreground"
                >
                  <SquareBullet />
                  {social.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-1 items-end justify-end gap-4 sm:w-[480px]">
            <div className="flex h-full flex-col justify-between gap-6">
              <p className="inline-flex items-center gap-2 text-sm text-panel-muted">
                <SquareBullet />
                {data.email}
              </p>

              <Button className="w-fit shrink-0 rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                Book a free call 🤙
              </Button>
            </div>

            <div className="relative min-h-[260px] w-64 shrink-0">
              <ImagePlaceholder
                src={data.photoUrl}
                aspectClassName="aspect-auto"
                className="absolute inset-0 h-full w-full rounded-[5px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
