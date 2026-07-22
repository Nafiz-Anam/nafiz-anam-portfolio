"use client";

import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import { api } from "@/lib/api";

type ConfigRow = { key: string; label: string; value: string };

const MANAGED_KEYS: { key: string; label: string; description: string; type?: "url" | "text" }[] = [
  {
    key: "google_calendar_url",
    label: "Google Calendar Booking URL",
    description: "Appointment scheduling link shown on the contact page. Get it from Google Calendar → Appointment schedules.",
    type: "url",
  },
  {
    key: "contact_email",
    label: "Contact Email",
    description: "Primary email shown on contact page.",
    type: "text",
  },
  {
    key: "linkedin_url",
    label: "LinkedIn URL",
    description: "Your LinkedIn profile URL.",
    type: "url",
  },
  {
    key: "github_url",
    label: "GitHub URL",
    description: "Your GitHub profile URL.",
    type: "url",
  },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<{ config: Record<string, string> }>("/api/site-config")
      .then((res) => setValues(res.data.config ?? {}))
      .catch((e: { message?: string }) => setError(e.message ?? "Failed to load."));
  }, []);

  async function save(key: string, label: string) {
    setSaving((s) => ({ ...s, [key]: true }));
    try {
      await api.put(`/api/site-config/${key}`, { value: values[key] ?? "", label });
      setSaved((s) => ({ ...s, [key]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Save failed.");
    } finally {
      setSaving((s) => ({ ...s, [key]: false }));
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Site-wide configuration managed from the CMS.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-6">
        {MANAGED_KEYS.map(({ key, label, description, type }) => (
          <div key={key} className="rounded-xl border border-border bg-muted/20 p-5">
            <div className="mb-3">
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type={type === "url" ? "url" : "text"}
                value={values[key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") save(key, label); }}
                placeholder={type === "url" ? "https://" : ""}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                onClick={() => save(key, label)}
                disabled={saving[key]}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
              >
                {saved[key] ? <Check size={15} /> : <Save size={15} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
