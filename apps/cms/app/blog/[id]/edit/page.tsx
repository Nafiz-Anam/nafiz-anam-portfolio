"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BlogForm, type BlogFormValues } from "@/components/BlogForm";
import { api } from "@/lib/api";
import type { BlogPost } from "@portfolio/types";

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<BlogFormValues> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.get<BlogPost>(`/api/blog/id/${id}`)
      .then((res) => {
        if (cancelled) return;
        const p = res.data;
        setInitial({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          coverImageUrl: p.coverImageUrl,
          category: p.category,
          tags: p.tags,
          contentHtml: p.contentHtml,
          readTimeMinutes: p.readTimeMinutes,
          status: p.status,
          authorName: p.authorName,
          seoTitle: p.seoTitle ?? "",
          seoDescription: p.seoDescription ?? "",
          ogImage: p.ogImage,
        });
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? "Failed to load post.");
      });
    return () => { cancelled = true; };
  }, [id]);

  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!initial) return (
    <div className="flex h-40 items-center justify-center text-muted-foreground">
      <Loader2 className="animate-spin" size={18} />
    </div>
  );

  return <BlogForm mode="edit" id={id} initial={initial} />;
}
