import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookingButton } from "./BookingButton";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const logoTiles = [
  {
    key: "diamond",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l10 10-10 10L2 12z" strokeLinejoin="round" />
      </svg>
    ),
  },
  { key: "kanin", node: <span className="font-sans font-black uppercase tracking-tight">KANIN</span> },
  { key: "loveum", node: <span className="font-sans font-extrabold uppercase tracking-tight">LOVEUM</span> },
  {
    key: "s-icon",
    node: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M18 6c0-2-2-3-5-3s-6 1.5-6 4 2 3 6 4 6 2 6 4-3 4-6 4-5-1-5-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-accent" />
      </svg>
    ),
  },
  { key: "goven", node: <span className="font-serif font-bold">GoVen</span> },
  {
    key: "ribbon",
    node: (
      <svg width="30" height="20" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-accent">
        <path d="M2 4c6 0 6 6 12 6s6-6 12-6M2 16c6 0 6-6 12-6s6 6 12 6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const STAT_DEFAULTS = [
  { value: "7+",  label: "Years Experience" },
  { value: "40+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
];

async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
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
        <FadeIn className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <ImagePlaceholder
            src="/Nafiz-Anam.jpg"
            aspectClassName="aspect-square"
            className="h-[320px] w-[320px] rounded-[5px] object-cover"
          />
          <p className="self-center text-left text-[28px] leading-relaxed text-panel-foreground sm:text-[30px]">
            My multidisciplinary approach blends design precision with engineering excellence,
            delivering solutions that stand out in competitive landscapes. I&apos;m driven by the
            passion to craft experiences that create lasting impact through thoughtful interaction.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-3 gap-[2px] bg-panel-foreground/10 sm:grid-cols-6">
          {resolvedLogoTiles.map((logo) => (
            <div
              key={logo.key}
              className="flex h-24 items-center justify-center bg-[#F9F3EF] px-4 text-center text-xl text-panel-foreground"
            >
              {logo.node}
            </div>
          ))}
        </div>

        <div className="mt-[2px] grid grid-cols-3 gap-[2px] bg-panel-foreground/10 sm:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="col-span-1 flex items-baseline gap-3 bg-[#F9F3EF] px-6 py-8 sm:col-span-2">
              <p className="text-[68px] font-bold leading-none text-panel-foreground">{stat.value}</p>
              <p className="text-base text-panel-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <BookingButton className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
            Book a free call
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
