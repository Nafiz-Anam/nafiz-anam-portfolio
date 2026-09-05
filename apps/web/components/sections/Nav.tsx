"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@portfolio/ui";
import { BookingButton } from "./BookingButton";
import { defaultNav, type NavContent } from "@/lib/placeholder-content";
import { trackEvent } from "@/lib/analytics";

const SERVICE_LINKS = [
  { label: "Custom Software Development", href: "/services/custom-software-development" },
  { label: "SaaS Product Engineering", href: "/services/saas-product-engineering" },
  { label: "AI Automation & Business Systems", href: "/services/ai-automation-business-systems" },
  { label: "Technical Consulting & Architecture", href: "/services/technical-consulting-architecture" },
  { label: "Cloud Infrastructure & DevOps", href: "/services/cloud-infrastructure-devops" },
  { label: "Engineering Leadership", href: "/services/engineering-leadership" },
] as const;

export function Nav({ data = defaultNav }: { data?: NavContent }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [barBottom, setBarBottom] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const update = () => setBarBottom(el.getBoundingClientRect().bottom);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 12, left: rect.left });
    }
    setServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <header
      style={{ position: "sticky", top: 0, zIndex: 40 }}
      className={`dark transition-[padding] duration-300 ease-out ${scrolled ? "px-3 pt-3 lg:px-6" : "px-0 pt-0"}`}
    >
      <div
        ref={barRef}
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "max-w-6xl rounded-[14px] border border-white/10 border-t-white/25 bg-background/60 px-6 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_30px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 lg:px-10"
            : "max-w-[1800px] border border-transparent bg-transparent px-6 py-6 lg:px-16"
        }`}
      >
        <a href="/" className="font-sans text-2xl font-bold text-foreground">
          Nafiz{" "}
          <span className="font-serif italic" style={{ color: "hsl(13, 79%, 57%)" }}>
            Anam.
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {data.links.filter((l) => l.href.startsWith("/")).map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                ref={triggerRef}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <a
                  href={link.href}
                  aria-current={pathname.startsWith("/services") ? "page" : undefined}
                  onClick={() => trackEvent("nav_link_click", { nav_label: link.label })}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground aria-[current=page]:text-foreground"
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

                {mounted &&
                  createPortal(
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={openServices}
                          onMouseLeave={closeServices}
                          style={{
                            position: "fixed",
                            top: menuPos.top,
                            left: menuPos.left,
                            zIndex: 100,
                          }}
                          className="w-[300px]"
                        >
                          <div className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.10] bg-panel shadow-xl">
                            <div className="border-b border-panel-foreground/[0.08] px-5 py-3.5">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                                Services
                              </p>
                            </div>

                            <div className="flex flex-col py-2">
                              {SERVICE_LINKS.map((s) => (
                                <a
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => trackEvent("nav_link_click", { nav_label: s.label })}
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

                            <div className="border-t border-panel-foreground/[0.08] px-5 py-3">
                              <a
                                href="/services"
                                onClick={() => trackEvent("nav_link_click", { nav_label: "View All Services" })}
                                className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-75"
                              >
                                View All Services →
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>,
                    document.body
                  )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => trackEvent("nav_link_click", { nav_label: link.label })}
                className="transition-colors hover:text-foreground aria-[current=page]:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton location="nav" className="hidden rounded-[5px] bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex">
            Book a free call
          </BookingButton>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-foreground md:hidden"
          >
            <span className={`h-px w-6 bg-current transition-transform duration-200 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-px w-6 bg-current transition-transform duration-200 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  key="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-x-0 bottom-0 z-[90] bg-black/50 md:hidden"
                  style={{ top: barBottom }}
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  key="mobile-nav-panel"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-x-0 z-[95] overflow-y-auto px-6 pb-6 md:hidden"
                  style={{ top: barBottom, maxHeight: `calc(100vh - ${barBottom}px)` }}
                >
                  <nav className="mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-[14px] border border-white/10 bg-background/95 p-4 text-sm text-muted shadow-xl backdrop-blur-xl">
                    {data.links.filter((l) => l.href.startsWith("/")).map((link) =>
                      link.label === "Services" ? (
                        <div key={link.href} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((v) => !v)}
                            aria-expanded={mobileServicesOpen}
                            className="flex items-center justify-between gap-1.5 rounded-md px-3 py-3 text-left transition-colors hover:bg-foreground/5 hover:text-foreground"
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
                              className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                            >
                              <path d="M2 3.5l3 3 3-3" />
                            </svg>
                          </button>
                          {mobileServicesOpen && (
                            <div className="flex flex-col gap-0.5 pb-2 pl-3">
                              {SERVICE_LINKS.map((s) => (
                                <a
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => trackEvent("nav_link_click", { nav_label: s.label })}
                                  className="rounded-md px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                                >
                                  {s.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          aria-current={pathname === link.href ? "page" : undefined}
                          onClick={() => trackEvent("nav_link_click", { nav_label: link.label })}
                          className="rounded-md px-3 py-3 transition-colors hover:bg-foreground/5 hover:text-foreground aria-[current=page]:text-foreground"
                        >
                          {link.label}
                        </a>
                      )
                    )}

                    <BookingButton
                      location="nav"
                      className="mt-2 w-full rounded-[5px] bg-accent px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
                    >
                      Book a free call
                    </BookingButton>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
