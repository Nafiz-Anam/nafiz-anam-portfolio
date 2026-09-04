import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookingButton } from "./BookingButton";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

import { SERVER_API as API } from "@/lib/api-url";

const logoTiles = [
  {
    key: "diamond",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 2l10 10-10 10L2 12z" />
      </svg>
    ),
  },
  {
    key: "cross",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    key: "circle",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "s-icon",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M18 6c0-2-2-3-5-3s-6 1.5-6 4 2 3 6 4 6 2 6 4-3 4-6 4-5-1-5-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-accent" />
      </svg>
    ),
  },
  {
    key: "hex",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      </svg>
    ),
  },
  {
    key: "ribbon",
    node: (
      <svg width="30" height="20" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-accent" strokeLinecap="round">
        <path d="M2 4c6 0 6 6 12 6s6-6 12-6M2 16c6 0 6-6 12-6s6 6 12 6" />
      </svg>
    ),
  },
];

const STAT_DEFAULTS = [
  { value: "7+",   label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5",    label: "Countries Served" },
];

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const { config } = await res.json() as { config: Record<string, string> };
    return config ?? {};
  } catch {
    return {};
  }
}

async function getSiteStats(config: Record<string, string>): Promise<Array<{ value: string; label: string }>> {
  try {
    return [
      {
        value: config.stat_1_value || STAT_DEFAULTS[0]!.value,
        label: config.stat_1_label || STAT_DEFAULTS[0]!.label,
      },
      {
        value: config.stat_2_value || STAT_DEFAULTS[1]!.value,
        label: config.stat_2_label || STAT_DEFAULTS[1]!.label,
      },
      {
        value: config.stat_3_value || STAT_DEFAULTS[2]!.value,
        label: config.stat_3_label || STAT_DEFAULTS[2]!.label,
      },
    ];
  } catch {
    return STAT_DEFAULTS;
  }
}

export async function StatsBand() {
  const config = await getSiteConfig();
  const stats = await getSiteStats(config);

  // Build logo tiles: use site-config text if set, otherwise fall back to decorative defaults
  const resolvedLogoTiles = logoTiles.map((tile, i) => {
    const key = `client_logo_${i + 1}`;
    const text = config[key]?.trim();
    if (!text) return tile;
    return {
      key: tile.key,
      node: <span className="font-sans font-black uppercase tracking-tight">{text}</span>,
    };
  });

  return (
    <section id="about" className="dark bg-panel bg-texture-lines-panel text-panel-foreground">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
        <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <ImagePlaceholder
            src="/Nafiz-Anam.jpg"
            aspectClassName="aspect-square"
            className="h-[320px] w-[320px] rounded-[5px] object-cover"
          />
          <p className="self-center text-left text-[28px] leading-relaxed text-panel-foreground sm:text-[30px]">
            I build software that businesses can depend on — reliable systems, scalable architecture,
            and engineering decisions grounded in real business outcomes. Seven years building
            production software across startups, enterprises, and my own ventures.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-[2px] bg-panel-foreground/10 sm:grid-cols-6">
          {resolvedLogoTiles.map((logo) => (
            <div
              key={logo.key}
              className="flex h-24 items-center justify-center bg-panel px-4 text-center text-xl text-panel-foreground"
            >
              {logo.node}
            </div>
          ))}
        </div>

        <div className="mt-[2px] grid grid-cols-3 gap-[2px] bg-panel-foreground/10 sm:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="col-span-1 flex items-baseline gap-3 bg-[hsl(var(--warm-tile))] px-6 py-8 sm:col-span-2">
              <Counter value={stat.value} className="text-[68px] font-bold leading-none text-panel-foreground" />
              <p className="text-base text-panel-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <BookingButton location="stats_band" className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
            Book a free call
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
