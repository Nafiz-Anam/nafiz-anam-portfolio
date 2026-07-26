"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderKanban, MessageSquare, Inbox, Loader2 } from "lucide-react";
import { type ContactLead } from "@portfolio/types";
import { api } from "@/lib/api";

type Stats = {
  posts: { total: number; published: number; draft: number };
  projects: { total: number; published: number; draft: number };
  testimonials: { total: number; published: number };
  leads: { total: number; new: number };
  recentLeads: ContactLead[];
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-accent/15 text-accent",
  read: "bg-blue-500/15 text-blue-400",
  replied: "bg-green-500/15 text-green-400",
  archived: "bg-muted/40 text-muted-foreground",
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Stats>("/stats")
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Portfolio overview.</p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              href="/blog"
              icon={<FileText size={18} />}
              label="Blog Posts"
              total={stats.posts.total}
              sub={`${stats.posts.published} published · ${stats.posts.draft} draft`}
            />
            <StatCard
              href="/projects"
              icon={<FolderKanban size={18} />}
              label="Projects"
              total={stats.projects.total}
              sub={`${stats.projects.published} published · ${stats.projects.draft} draft`}
            />
            <StatCard
              href="/testimonials"
              icon={<MessageSquare size={18} />}
              label="Testimonials"
              total={stats.testimonials.total}
              sub={`${stats.testimonials.published} published`}
            />
            <StatCard
              href="/leads"
              icon={<Inbox size={18} />}
              label="Leads"
              total={stats.leads.total}
              badge={stats.leads.new > 0 ? `${stats.leads.new} new` : undefined}
              sub={`${stats.leads.new} unread`}
              highlight={stats.leads.new > 0}
            />
          </div>

          {stats.recentLeads.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Recent Leads</h2>
                <Link href="/leads" className="text-xs text-accent hover:underline">
                  View all →
                </Link>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {stats.recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border/60 last:border-b-0 hover:bg-muted/20">
                        <td className="px-4 py-3">
                          <div className="font-semibold">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{lead.category}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{lead.budget}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[lead.status] ?? STATUS_COLORS.new}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(lead.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

function StatCard({
  href,
  icon,
  label,
  total,
  sub,
  badge,
  highlight,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  total: number;
  sub: string;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col gap-3 rounded-xl border p-5 transition-colors hover:bg-muted/20 ${
        highlight ? "border-accent/30 bg-accent/5" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{icon}</span>
        {badge && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
            {badge}
          </span>
        )}
      </div>
      <div>
        <div className="text-3xl font-bold">{total}</div>
        <div className="text-xs font-medium text-muted-foreground mt-0.5">{label}</div>
      </div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </Link>
  );
}
