"use client";

import { useState } from "react";
import { Button } from "@portfolio/ui";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { defaultNav, type NavContent } from "@/lib/placeholder-content";

const SERVICE_LINKS = [
  { label: "Custom Software Development", href: "/services/custom-software-development" },
  { label: "SaaS Product Engineering", href: "/services/saas-product-engineering" },
  { label: "AI Automation & Business Systems", href: "/services/ai-automation-business-systems" },
  { label: "Technical Consulting & Architecture", href: "/services/technical-consulting-architecture" },
  { label: "Cloud Infrastructure & DevOps", href: "/services/cloud-infrastructure-devops" },
  { label: "Engineering Leadership", href: "/services/engineering-leadership" },
] as const;

export function Nav({ data = defaultNav }: { data?: NavContent }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 lg:px-16">
        <a href="/" className="font-sans text-lg font-bold text-foreground">
          {data.brand}
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {data.links.map((link) =>
            link.label === "Services" ? (
              /* Services dropdown */
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M2 3.5l3 3 3-3" />
                  </svg>
                </a>

                {/* dropdown panel */}
                <div
                  className={`absolute left-1/2 top-full z-50 mt-3 w-[300px] -translate-x-1/2 overflow-hidden rounded-[5px] border border-panel-foreground/[0.10] bg-panel shadow-xl transition-all duration-[200ms] ${
                    servicesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  {/* header row */}
                  <div className="border-b border-panel-foreground/[0.08] px-5 py-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                      Services
                    </p>
                  </div>

                  {/* service links */}
                  <div className="flex flex-col py-2">
                    {SERVICE_LINKS.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        className="group flex items-center justify-between px-5 py-3 transition-colors duration-150 hover:bg-panel-foreground/[0.05]"
                      >
                        <span className="text-[13px] font-medium text-panel-foreground/75 transition-colors duration-150 group-hover:text-panel-foreground">
                          {s.label}
                        </span>
                        <span className="translate-x-0 text-panel-foreground/25 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent">
                          →
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* footer row */}
                  <div className="border-t border-panel-foreground/[0.08] px-5 py-3">
                    <a
                      href="/services"
                      className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent hover:opacity-75 transition-opacity"
                    >
                      View All Services →
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
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
