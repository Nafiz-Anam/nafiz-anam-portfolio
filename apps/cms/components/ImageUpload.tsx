"use client";

import { useState } from "react";
import { mediaSchema } from "@portfolio/types";
import { api } from "@/lib/api";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/api/uploads", formData);
      const media = mediaSchema.parse(res.data);
      onChange(media.url);
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-32 w-32 rounded-md object-cover" />
      ) : null}
      <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleFileChange} disabled={uploading} />
      {uploading ? <p className="text-sm text-slate-500">Uploading…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
