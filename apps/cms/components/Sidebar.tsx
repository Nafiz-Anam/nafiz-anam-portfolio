"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Tag, MessageSquare, Settings, LogOut, Inbox, Image, CalendarCheck, Layers, User } from "lucide-react";
import { cn } from "@portfolio/ui";
import { api } from "@/lib/api";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/blog/categories", label: "Categories", icon: Tag },
  { href: "/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/leads", label: "Leads", icon: Inbox },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/about", label: "About", icon: User },
  { href: "/media", label: "Media", icon: Image },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-background">
      <div className="px-6 py-5">
        <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Portfolio CMS</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-2 flex-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/"
            ? pathname === "/"
            : pathname === href || (
                pathname.startsWith(href + "/") &&
                !NAV.some((n) => n.href !== href && n.href.startsWith(href + "/") && pathname.startsWith(n.href))
              );
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
