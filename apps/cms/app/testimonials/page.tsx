"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Loader2, MessageSquare, Star } from "lucide-react";
import type { Testimonial } from "@portfolio/types";
import { api } from "@/lib/api";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await api.get<{ testimonials: Testimonial[] }>("/api/testimonials/admin/list");
      setTestimonials(res.data.testimonials ?? []);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function togglePublished(t: Testimonial) {
    try {
      const res = await api.patch<Testimonial>(`/api/testimonials/${t.id}`, { published: !t.published });
      setTestimonials((prev) => prev.map((x) => (x.id === t.id ? res.data : x)));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Update failed.");
    }
  }

  async function toggleFeatured(t: Testimonial) {
    try {
      const res = await api.patch<Testimonial>(`/api/testimonials/${t.id}`, { featured: !t.featured });
      setTestimonials((prev) => prev.map((x) => (x.id === t.id ? res.data : x)));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Update failed.");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((x) => x.id !== id));
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
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage client reviews shown on the site.</p>
        </div>
        <Link
          href="/testimonials/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          <Plus size={14} /> New testimonial
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border text-center">
          <MessageSquare size={28} className="text-muted-foreground" />
          <p className="text-sm font-semibold">No testimonials yet</p>
          <Link href="/testimonials/new" className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700">
            <Plus size={14} /> Add first testimonial
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Person</th>
                <th className="px-4 py-3 text-left font-semibold">Quote</th>
                <th className="px-4 py-3 text-left font-semibold">Rating</th>
                <th className="px-4 py-3 text-left font-semibold">Featured</th>
                <th className="px-4 py-3 text-left font-semibold">Published</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-b border-border/60 last:border-b-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {t.photoUrl ? (
                        <img src={t.photoUrl} alt={t.name} className="h-9 w-9 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ""}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-sm">
                    <p className="line-clamp-2 text-xs text-muted-foreground">"{t.quote}"</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < t.rating ? "fill-accent text-accent" : "text-border"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(t)}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        t.featured ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {t.featured ? "Featured" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(t)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                        t.published ? "bg-green-500/15 text-green-400 hover:bg-green-500/30" : "bg-amber-500/15 text-amber-400 hover:bg-amber-500/30"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${t.published ? "bg-green-500" : "bg-amber-500"}`} />
                      {t.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/testimonials/${t.id}/edit`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Edit3 size={14} />
                      </Link>
                      <button disabled={deletingId === t.id} onClick={() => handleDelete(t.id, t.name)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50">
                        {deletingId === t.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
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
