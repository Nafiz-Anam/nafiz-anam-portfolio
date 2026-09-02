"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, Loader2, FolderKanban, ExternalLink } from "lucide-react";
import type { ProjectListItem } from "@portfolio/types";
import { api } from "@/lib/api";

function formatDate(iso: Date | string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000";

  async function load() {
    setLoading(true);
    try {
      const res = await api.get<{ projects: ProjectListItem[] }>("/projects/admin/list", {
        params: { status, search, limit: 50 },
      });
      setProjects(res.data.projects ?? []);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [status]);
  useEffect(() => {
    const t = setTimeout(() => load(), 300);
    return () => clearTimeout(t);
  }, [search]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage case studies and portfolio work.</p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          <Plus size={14} /> New project
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, excerpt, client…"
            className="w-full rounded-lg border border-border bg-muted/20 py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/20 p-1">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                status === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border text-center">
          <FolderKanban size={28} className="text-muted-foreground" />
          <p className="text-sm font-semibold">No projects yet</p>
          <Link href="/projects/new" className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700">
            <Plus size={14} /> New project
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Project</th>
                <th className="px-4 py-3 text-left font-semibold">Industry</th>
                <th className="px-4 py-3 text-left font-semibold">Client</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Updated</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-b-0 hover:bg-muted/20">
                  <td className="px-4 py-3 max-w-xs">
                    <div className="truncate font-semibold" title={p.title}>{p.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{p.outcome}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.industry || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.client || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      p.status === "published" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${p.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(p.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {p.status === "published" && (
                        <a href={`${WEBSITE_URL}/case-studies/${p.slug}`} target="_blank" rel="noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link href={`/projects/${p.id}/edit`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Edit3 size={14} />
                      </Link>
                      <button disabled={deletingId === p.id} onClick={() => handleDelete(p.id, p.title)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50">
                        {deletingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
