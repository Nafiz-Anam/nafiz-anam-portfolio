"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "@portfolio/ui";
import { api } from "@/lib/api";

type ContentJson = {
  problems: { title: string; description: string }[];
  deliverables: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  idealFor: { type: string; description: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
};

export type ServiceFormValues = {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  sortOrder: number;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  headlineAccent: string;
  description: string;
  contentJson: ContentJson;
};

const DEFAULT_CONTENT: ContentJson = {
  problems: [],
  deliverables: [],
  process: [],
  idealFor: [],
  technologies: [],
  faqs: [],
};

interface Props {
  mode: "new" | "edit";
  id?: string;
  initial?: Partial<ServiceFormValues>;
}

export function ServiceForm({ mode, id, initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [values, setValues] = useState<ServiceFormValues>({
    slug: "",
    title: "",
    tagline: "",
    status: "draft",
    sortOrder: 0,
    metaTitle: "",
    metaDescription: "",
    headline: "",
    headlineAccent: "",
    description: "",
    contentJson: DEFAULT_CONTENT,
    ...initial,
  });
  const [jsonText, setJsonText] = useState(
    JSON.stringify(initial?.contentJson ?? DEFAULT_CONTENT, null, 2)
  );

  function set(key: keyof ServiceFormValues, val: unknown) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleJsonChange(text: string) {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text) as ContentJson;
      setValues((v) => ({ ...v, contentJson: parsed }));
      setJsonError(null);
    } catch {
      setJsonError("Invalid JSON — fix before saving");
    }
  }

  async function submit(status: "draft" | "published") {
    if (jsonError) { setError(jsonError); return; }
    setSaving(true);
    setError(null);
    try {
      const payload = { ...values, status };
      if (mode === "new") {
        await api.post("/services", payload);
      } else {
        await api.patch(`/services/${id}`, payload);
      }
      router.push("/services");
    } catch (e) {
      setError((e as { message?: string }).message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const field = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent";
  const label = "block text-xs font-medium text-muted-foreground mb-1";

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/services" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">{mode === "new" ? "New Service" : "Edit Service"}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => submit("draft")} disabled={saving}>
            <Save size={14} className="mr-1" /> Save draft
          </Button>
          <Button onClick={() => submit("published")} disabled={saving}>
            <Send size={14} className="mr-1" />
            {values.status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Title *</label>
            <input value={values.title} onChange={(e) => set("title", e.target.value)} className={field} placeholder="Custom Software Development" />
          </div>
          <div>
            <label className={label}>Slug *</label>
            <input value={values.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} className={field} placeholder="custom-software-development" />
          </div>
        </div>

        <div>
          <label className={label}>Tagline</label>
          <input value={values.tagline} onChange={(e) => set("tagline", e.target.value)} className={field} placeholder="Short label shown on services list" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Headline (normal part)</label>
            <input value={values.headline} onChange={(e) => set("headline", e.target.value)} className={field} placeholder="Software Built for Your Business," />
          </div>
          <div>
            <label className={label}>Headline (italic accent)</label>
            <input value={values.headlineAccent} onChange={(e) => set("headlineAccent", e.target.value)} className={field} placeholder="Not Someone Else's." />
          </div>
        </div>

        <div>
          <label className={label}>Description</label>
          <textarea value={values.description} onChange={(e) => set("description", e.target.value)} rows={4} className={field} placeholder="Lead paragraph for the service page…" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Meta Title</label>
            <input value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className={field} />
          </div>
          <div>
            <label className={label}>Sort Order</label>
            <input type="number" value={values.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value))} className={field} />
          </div>
        </div>

        <div>
          <label className={label}>Meta Description</label>
          <textarea value={values.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} rows={2} className={field} />
        </div>

        <div>
          <label className={label}>
            Content JSON{" "}
            <span className="font-normal text-foreground/40">— problems, deliverables, process, idealFor, technologies, faqs</span>
          </label>
          {jsonError && <p className="mb-1 text-xs text-red-400">{jsonError}</p>}
          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={20}
            spellCheck={false}
            className={`${field} font-mono text-xs`}
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Edit the structured content as JSON. Keys: problems[], deliverables[], process[], idealFor[], technologies[], faqs[].
          </p>
        </div>
      </div>
    </div>
  );
}
