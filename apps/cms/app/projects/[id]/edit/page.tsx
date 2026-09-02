"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ProjectForm, type ProjectFormValues } from "@/components/ProjectForm";
import { api } from "@/lib/api";
import type { Project } from "@portfolio/types";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<ProjectFormValues> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.get<Project>(`/projects/id/${id}`)
      .then((res) => {
        if (cancelled) return;
        const p = res.data;
        setInitial({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          coverImageUrl: p.coverImageUrl,
          industry: p.industry,
          tags: p.tags,
          contentHtml: p.contentHtml,
          client: p.client,
          role: p.role,
          outcome: p.outcome,
          year: p.year,
          status: p.status,
          seoTitle: p.seoTitle ?? "",
          seoDescription: p.seoDescription ?? "",
          ogImage: p.ogImage,
        });
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? "Failed to load project.");
      });
    return () => { cancelled = true; };
  }, [id]);

  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!initial) return (
    <div className="flex h-40 items-center justify-center text-muted-foreground">
      <Loader2 className="animate-spin" size={18} />
    </div>
  );

  return <ProjectForm mode="edit" id={id} initial={initial} />;
}
