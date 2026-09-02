"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, ImageIcon, Trash2, Copy, Check, Upload } from "lucide-react";
import { api } from "@/lib/api";

type Media = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL_CMS ?? "http://localhost:4000";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get<{ media: Media[] }>("/media");
      setMedia(res.data.media ?? []);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post<Media>("/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMedia((prev) => [res.data, ...prev]);
    } catch (err) {
      const e = err as { message?: string };
      alert(e.message ?? "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image? Cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/media/${id}`);
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      const e = err as { message?: string };
      alert(e.message ?? "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  function copyUrl(item: Media) {
    const fullUrl = `${API_URL}${item.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media</h1>
          <p className="text-sm text-muted-foreground">Uploaded images. Copy URL to use in posts and projects.</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:opacity-60"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Uploading…" : "Upload image"}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : media.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border text-center">
          <ImageIcon size={28} className="text-muted-foreground" />
          <p className="text-sm font-semibold">No images yet</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Upload size={14} /> Upload first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {media.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-border bg-muted/20">
              <div className="aspect-square overflow-hidden bg-muted/40">
                <img
                  src={`${API_URL}${item.url}`}
                  alt={item.filename}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-[11px] font-medium" title={item.filename}>{item.filename}</p>
                <p className="text-[10px] text-muted-foreground">{formatBytes(item.size)}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(item)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted hover:bg-accent hover:text-accent-foreground"
                  title="Copy URL"
                >
                  {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <button
                  disabled={deletingId === item.id}
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
