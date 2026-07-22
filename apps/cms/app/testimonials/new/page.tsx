"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Save } from "lucide-react";
import { Button } from "@portfolio/ui";
import { api } from "@/lib/api";
import { ImageUpload } from "@/components/ImageUpload";

export default function NewTestimonialPage() {
  const router = useRouter();
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!quote.trim() || !name.trim()) { setError("Quote and name are required."); return; }
    setSaving(true);
    try {
      await api.post("/api/testimonials", { quote, name, role, company, photoUrl, rating, featured, published, sortOrder });
      router.push("/testimonials");
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/testimonials" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold">New testimonial</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quote *</label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={4}
            placeholder="What did the client say?"
            className="w-full resize-none rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe"
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role / Title</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="CTO"
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc."
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
            <span className="text-sm">Featured (show on homepage)</span>
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
            {saving ? "Saving…" : "Save testimonial"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/testimonials")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
