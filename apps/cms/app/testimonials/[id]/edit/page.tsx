"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Save, Loader2 } from "lucide-react";
import { Button } from "@portfolio/ui";
import { type Testimonial } from "@portfolio/types";
import { api } from "@/lib/api";
import { ImageUpload } from "@/components/ImageUpload";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [t, setT] = useState<Testimonial | null>(null);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.get<Testimonial>(`/api/testimonials/${id}`)
      .then((res) => {
        if (cancelled) return;
        const d = res.data;
        setT(d);
        setQuote(d.quote);
        setName(d.name);
        setRole(d.role);
        setCompany(d.company);
        setPhotoUrl(d.photoUrl);
        setRating(d.rating);
        setFeatured(d.featured);
        setPublished(d.published);
        setSortOrder(d.sortOrder);
      })
      .catch((e: { message?: string }) => { if (!cancelled) setError(e.message ?? "Failed to load."); });
    return () => { cancelled = true; };
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!quote.trim() || !name.trim()) { setError("Quote and name are required."); return; }
    setSaving(true);
    try {
      await api.patch(`/api/testimonials/${id}`, { quote, name, role, company, photoUrl, rating, featured, published, sortOrder });
      router.push("/testimonials");
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  if (error && !t) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!t) return <div className="flex h-40 items-center justify-center"><Loader2 className="animate-spin" size={18} /></div>;

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/testimonials" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold">Edit testimonial</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quote *</label>
          <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={4}
            className="w-full resize-none rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-accent" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role / Title</label>
            <input value={role} onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sort order</label>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} min={0}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)}>
                <Star size={20} className={n <= rating ? "fill-accent text-accent" : "text-border"} />
              </button>
            ))}
          </div>
        </div>

        <ImageUpload label="Photo" value={photoUrl} onChange={setPhotoUrl} />

        <div className="flex items-center gap-6">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 accent-accent" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 accent-accent" />
            <span className="text-sm">Published</span>
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            <Save size={14} className="mr-1" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/testimonials")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
