import Link from "next/link";
import { Facebook, Linkedin, Github, Mail, MessageCircle, MapPin } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { defaultFooter, type FooterContent } from "@/lib/placeholder-content";
import { BookingButton } from "./BookingButton";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";

import { SERVER_API as API } from "@/lib/api-url";

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  GitHub: Github,
};

async function getFooterData(): Promise<FooterContent> {
  try {
    const res = await fetch(`${API}/api/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return defaultFooter;
    const { config } = await res.json() as { config: Record<string, string> };

    const socials: FooterContent["socials"] = [];
    if (config.facebook_url) socials.push({ label: "Facebook", href: config.facebook_url });
    if (config.linkedin_url) socials.push({ label: "LinkedIn", href: config.linkedin_url });
    if (config.github_url)   socials.push({ label: "GitHub",   href: config.github_url });

    return {
      ...defaultFooter,
      email: config.contact_email || defaultFooter.email,
      whatsapp: config.whatsapp_number || defaultFooter.whatsapp,
      location: config.location || defaultFooter.location,
      locationUrl: config.location_url || defaultFooter.locationUrl,
      socials: socials.length > 0 ? socials : defaultFooter.socials,
      photoUrl: config.footer_photo_url || defaultFooter.photoUrl,
    };
  } catch {
    return defaultFooter;
  }
}

export async function Footer() {
  const data = await getFooterData();

  return (
    <footer className="dark bg-texture-lines bg-surface px-6 pb-0 pt-36 lg:px-16">
      <div className="mx-auto max-w-[1800px] overflow-hidden rounded-[5px] bg-background p-10 pb-24 text-panel-foreground sm:p-16 sm:pb-32">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <p className="font-sans text-7xl font-bold leading-none sm:text-8xl">
                Nafiz{" "}
                <span className="font-serif italic" style={{ color: "hsl(13, 79%, 57%)" }}>
                  Anam.
                </span>
              </p>

              {/* Page links */}
              {data.pages && data.pages.length > 0 && (
                <div className="flex flex-wrap gap-x-9 gap-y-3 text-sm font-medium uppercase tracking-wide text-panel-muted">
                  {data.pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group relative inline-block pb-1 transition-colors duration-200 hover:text-panel-foreground"
                    >
                      {page.label}
                      <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Social icons */}
              {data.socials && data.socials.length > 0 && (
                <div className="flex items-center gap-4">
                  {data.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.label];
                    return (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-panel-muted/30 text-panel-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : social.label[0]}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 items-end justify-end gap-4 sm:w-[480px]">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center gap-2 text-sm text-panel-muted transition-colors duration-200 hover:text-panel-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {data.email}
                </a>
                <a
                  href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-panel-muted transition-colors duration-200 hover:text-panel-foreground"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {data.whatsapp}
                </a>
                <a
                  href={data.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-panel-muted transition-colors duration-200 hover:text-panel-foreground"
                >
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {data.location}
                </a>
              </div>

              <BookingButton className="relative z-20 w-fit shrink-0 rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
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

      {/* Big stroke name — outside card, ~30% overlaps card bottom */}
      <div className="mx-auto hidden max-w-[1800px] lg:block h-80 -mt-40">
        <TextHoverEffect text="Nafiz Anam" />
      </div>

      {/* Copyright — centered below stroke name */}
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-panel-muted pb-8 pt-2">
        © {new Date().getFullYear()} Nafiz Anam. All rights reserved.
      </p>
    </footer>
  );
}
