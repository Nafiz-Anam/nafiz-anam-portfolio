"use client";

import { Button } from "@portfolio/ui";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { defaultNav, type NavContent } from "@/lib/placeholder-content";

export function Nav({ data = defaultNav }: { data?: NavContent }) {
  return (
    <header>
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 lg:px-16">
        <span className="font-sans text-lg font-bold text-foreground">{data.brand}</span>

        <nav className="hidden gap-8 text-sm text-muted md:flex">
          {data.links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            size="sm"
            className="rounded-[5px] bg-accent px-5 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            Book a free call 🤙
          </Button>
        </div>
      </div>
    </header>
  );
}
