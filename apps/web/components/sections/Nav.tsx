"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@portfolio/ui";
import { BookingButton } from "./BookingButton";
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
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastY.current);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%", opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "sticky", top: 0, zIndex: 40 }}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 lg:px-16">
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
                className="transition-colors hover:text-foreground aria-[current=page]:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton className="rounded-[5px] bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
            Book a free call
          </BookingButton>
        </div>
      </div>
    </motion.header>
  );
}
