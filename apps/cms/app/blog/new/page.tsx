"use client";

import { useState } from "react";
import { createBlogPostSchema } from "@portfolio/types";
import { Button } from "@portfolio/ui";
import { api } from "@/lib/api";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ImageUpload } from "@/components/ImageUpload";

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = createBlogPostSchema.safeParse({
      title,
      slug,
      excerpt,
      contentHtml,
      coverImageUrl,
      published: false,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/api/blog", parsed.data);
      window.location.href = "/blog";
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message ?? "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">New blog post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <ImageUpload label="Cover image" value={coverImageUrl} onChange={setCoverImageUrl} />
        <RichTextEditor value={contentHtml} onChange={setContentHtml} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Create post"}
        </Button>
      </form>
    </main>
  );
}
