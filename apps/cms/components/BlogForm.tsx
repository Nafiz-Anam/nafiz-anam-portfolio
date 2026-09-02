"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X, Plus, Eye, Save, Send, Image as ImageIcon } from "lucide-react";
import { Button, Select } from "@portfolio/ui";
import { api } from "@/lib/api";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "./ImageUpload";
import type { BlogCategory } from "@portfolio/types";

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  category: string;
  tags: string[];
  contentHtml: string;
  readTimeMinutes: number;
  status: "draft" | "published";
  authorName: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string | null;
};

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function BlogForm({
  initial,
  mode,
  id,
}: {
  initial?: Partial<BlogFormValues>;
  mode: "create" | "edit";
  id?: string;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [values, setValues] = useState<BlogFormValues>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    coverImageUrl: initial?.coverImageUrl ?? null,
    category: initial?.category ?? "",
    tags: initial?.tags ?? [],
    contentHtml: initial?.contentHtml ?? "",
    readTimeMinutes: initial?.readTimeMinutes ?? 1,
    status: initial?.status ?? "draft",
    authorName: initial?.authorName ?? "Nafiz Anam",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    ogImage: initial?.ogImage ?? null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit" && Boolean(initial?.slug));

  useEffect(() => {
    if (!slugTouched) setValues((v) => ({ ...v, slug: slugify(v.title) }));
  }, [values.title, slugTouched]);

  useEffect(() => {
    api.get<{ categories: BlogCategory[] }>("/blog-categories").then((res) => {
      setCategories(res.data.categories ?? []);
      if (!values.category && res.data.categories.length > 0) {
        setValues((v) => ({ ...v, category: res.data.categories[0]?.name ?? "" }));
      }
    }).catch(() => {});
  }, []);

  const set = <K extends keyof BlogFormValues>(k: K, v: BlogFormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || values.tags.includes(t)) { setTagInput(""); return; }
    setValues((s) => ({ ...s, tags: [...s.tags, t] }));
    setTagInput("");
  };

  const submit = async (status: "draft" | "published") => {
    setError(null);
    if (!values.title.trim()) { setError("Title is required."); return; }
    if (!values.excerpt.trim()) { setError("Excerpt is required."); return; }
    setSaving(true);
    try {
      const payload = { ...values, status, slug: values.slug || slugify(values.title) };
      if (mode === "create") {
        const res = await api.post<{ id: string }>("/blog", payload);
        router.push(status === "published" ? "/blog" : `/blog/${res.data.id}/edit`);
      } else {
        await api.patch(`/blog/${id}`, payload);
        router.push("/blog");
      }
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000";

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/blog" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{mode === "create" ? "New post" : "Edit post"}</h1>
            <p className="text-sm text-muted-foreground">
              {values.authorName} · {values.readTimeMinutes} min read
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mode === "edit" && values.slug && (
            <a
              href={`${WEBSITE_URL}/api/draft?secret=${process.env.NEXT_PUBLIC_PREVIEW_SECRET ?? ""}&slug=${values.slug}&type=blog`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
            >
              <Eye size={14} /> Preview
            </a>
          )}
          {mode === "edit" && values.status === "published" && (
            <a
              href={`${WEBSITE_URL}/insights/${values.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              <Eye size={14} /> View live
            </a>
          )}
          <Button variant="outline" onClick={() => submit("draft")} disabled={saving}>
            <Save size={14} className="mr-1" />
            Save draft
          </Button>
          <Button onClick={() => submit("published")} disabled={saving}>
            <Send size={14} className="mr-1" />
            {values.status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
            <input
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title"
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-xl font-semibold outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-sm text-muted-foreground">/insights/</span>
              <input
                value={values.slug}
                onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
                placeholder={slugify(values.title) || "post-slug"}
                className="flex-1 bg-transparent font-mono text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Excerpt <span className="normal-case text-muted-foreground/60">({values.excerpt.length} chars · aim for 120–180)</span>
            </label>
            <textarea
              value={values.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</label>
            <RichTextEditor
              value={values.contentHtml}
              onChange={(html) => setValues((v) => ({ ...v, contentHtml: html, readTimeMinutes: estimateReadTime(html) }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Status */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              values.status === "published"
                ? "bg-green-500/20 text-green-400"
                : "bg-amber-500/20 text-amber-400"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${values.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
              {values.status === "published" ? "Published" : "Draft"}
            </span>
          </div>

          {/* Cover image */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover image</p>
            <ImageUpload label="" value={values.coverImageUrl} onChange={(url) => set("coverImageUrl", url)} />
          </div>

          {/* OG image */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">OG image <span className="normal-case font-normal">(optional, falls back to cover)</span></p>
            <ImageUpload label="" value={values.ogImage} onChange={(url) => set("ogImage", url)} />
          </div>

          {/* Category */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</span>
              <Link href="/blog/categories" className="text-[10px] font-semibold uppercase tracking-wider text-accent hover:underline">
                Manage
              </Link>
            </div>
            {categories.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No categories. <Link href="/blog/categories" className="text-accent hover:underline">Create one</Link>
              </p>
            ) : (
              <Select
                value={values.category}
                onChange={(v) => set("category", v)}
                placeholder="— Select category —"
                options={categories.map((c) => ({ value: c.name, label: c.name }))}
              />
            )}
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {values.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  {t}
                  <button type="button" onClick={() => setValues((s) => ({ ...s, tags: s.tags.filter((x) => x !== t) }))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add tag…"
                className="flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">SEO</p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-muted-foreground">SEO title</label>
                <input
                  value={values.seoTitle}
                  onChange={(e) => set("seoTitle", e.target.value)}
                  placeholder={values.title}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted-foreground">SEO description</label>
                <textarea
                  value={values.seoDescription}
                  onChange={(e) => set("seoDescription", e.target.value)}
                  rows={3}
                  placeholder={values.excerpt}
                  className="w-full resize-none rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
