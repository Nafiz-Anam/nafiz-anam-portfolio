"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, Globe, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  status: string;
  sortOrder: number;
  updatedAt: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    api.get<{ services: ServiceItem[] }>("/services/admin/list")
      .then((res) => setServices(res.data.services ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function deleteService(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Delete failed.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-muted-foreground">Manage service pages shown on the website.</p>
        </div>
        <Link
          href="/services/new"
          className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          <Plus size={14} /> New Service
        </Link>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : services.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-border text-sm text-muted-foreground">
          No services yet. Create one or they fall back to static data.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-border/60 last:border-b-0 hover:bg-muted/10">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.tagline}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      s.status === "published"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-muted/40 text-muted-foreground"
                    }`}>
                      {s.status === "published" ? <Globe size={10} /> : <EyeOff size={10} />}
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link
                        href={`/services/${s.id}/edit`}
                        className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted/40"
                      >
                        <Pencil size={12} /> Edit
                      </Link>
                      <button
                        onClick={() => deleteService(s.id, s.title)}
                        disabled={deleting === s.id}
                        className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                      >
                        {deleting === s.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                        Delete
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
