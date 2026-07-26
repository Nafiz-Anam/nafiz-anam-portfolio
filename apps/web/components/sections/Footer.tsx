import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultFooter, type FooterContent } from "@/lib/placeholder-content";
import { BookingButton } from "./BookingButton";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function SquareBullet() {
  return <span className="inline-block h-1.5 w-1.5 shrink-0 bg-panel-muted" aria-hidden="true" />;
}

async function getFooterData(): Promise<FooterContent> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return defaultFooter;
    const { config } = await res.json() as { config: Record<string, string> };

    const socials: FooterContent["socials"] = [];
    if (config.github_url)   socials.push({ label: "GitHub",   href: config.github_url });
    if (config.linkedin_url) socials.push({ label: "LinkedIn", href: config.linkedin_url });
    if (config.twitter_url)  socials.push({ label: "Twitter",  href: config.twitter_url });

    return {
      ...defaultFooter,
      email: config.contact_email || defaultFooter.email,
      socials: socials.length > 0 ? socials : defaultFooter.socials,
    };
  } catch {
    return defaultFooter;
  }
}

export async function Footer() {
  const data = await getFooterData();

  return (
    <footer className="dark bg-texture-lines bg-surface px-6 pb-24 pt-8 lg:px-16">
      <div className="mx-auto max-w-[1800px] overflow-hidden rounded-[5px] border border-panel-foreground bg-panel bg-texture-lines-panel p-10 text-panel-foreground sm:p-16">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-between gap-10">
            <p className="font-sans text-7xl font-bold leading-none tracking-tight sm:text-8xl">
              {data.brand}
            </p>

            {/* Page links */}
            {data.pages && data.pages.length > 0 && (
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium uppercase tracking-wide text-panel-muted">
                {data.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-panel-foreground"
                  >
                    <SquareBullet />
                    {page.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Social links */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm font-medium uppercase tracking-wide text-panel-muted">
              {data.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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

              <BookingButton className="w-fit shrink-0 rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
                Book a free call
              </BookingButton>
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
