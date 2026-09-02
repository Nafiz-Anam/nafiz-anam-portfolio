"use client";

import { useEffect, useState } from "react";
import { Save, Check, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const ABOUT_SECTIONS: { key: string; label: string; description: string; placeholder: string }[] = [
  {
    key: "about_career_json",
    label: "Career Timeline",
    description: "Array of {title, org, period, description}",
    placeholder: JSON.stringify([{ title: "Lead Software Engineer", org: "Company", period: "2023 – Present", description: "Description…" }], null, 2),
  },
  {
    key: "about_values_json",
    label: "Core Values",
    description: "Array of {number, title, body}",
    placeholder: JSON.stringify([{ number: "01", title: "Business First", body: "Description…" }], null, 2),
  },
  {
    key: "about_companies_json",
    label: "Companies & Ventures",
    description: "Array of {name, role, period, description}",
    placeholder: JSON.stringify([{ name: "Company", role: "Founder & CEO", period: "2021 – Present", description: "Description…" }], null, 2),
  },
  {
    key: "about_numbers_json",
    label: "Numbers That Matter",
    description: "Array of {value, label}",
    placeholder: JSON.stringify([{ value: "7+", label: "Years Experience" }, { value: "100+", label: "Projects Delivered" }], null, 2),
  },
  {
    key: "about_faqs_json",
    label: "FAQ Section",
    description: "Array of {q, a}",
    placeholder: JSON.stringify([{ q: "What industries do you work with?", a: "Answer…" }], null, 2),
  },
];

export default function AboutPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ config: Record<string, string> }>("/site-config")
      .then((res) => {
        const config = res.data.config ?? {};
        const initial: Record<string, string> = {};
        for (const s of ABOUT_SECTIONS) {
          if (config[s.key]) {
            try {
              initial[s.key] = JSON.stringify(JSON.parse(config[s.key]!), null, 2);
            } catch {
              initial[s.key] = config[s.key]!;
            }
          }
        }
        setValues(initial);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function validateJson(key: string, text: string): boolean {
    try {
      JSON.parse(text);
      setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
      return true;
    } catch {
      setErrors((e) => ({ ...e, [key]: "Invalid JSON" }));
      return false;
    }
  }

  async function save(key: string, label: string) {
    const text = values[key] ?? "";
    if (!validateJson(key, text)) return;
    setSaving((s) => ({ ...s, [key]: true }));
    try {
      await api.put(`/site-config/${key}`, { value: text, label });
      setSaved((s) => ({ ...s, [key]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
    } catch (e) {
      alert((e as { message?: string }).message ?? "Save failed.");
    } finally {
      setSaving((s) => ({ ...s, [key]: false }));
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">About Page</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Each section accepts a JSON array. Leave blank to use the hardcoded default content.
        </p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {ABOUT_SECTIONS.map(({ key, label, description, placeholder }) => (
            <div key={key} className="rounded-xl border border-border bg-muted/20 p-5">
              <div className="mb-3">
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
              </div>
              {errors[key] && <p className="mb-2 text-xs text-red-400">{errors[key]}</p>}
              <textarea
                value={values[key] ?? ""}
                onChange={(e) => {
                  setValues((v) => ({ ...v, [key]: e.target.value }));
                  validateJson(key, e.target.value);
                }}
                rows={10}
                spellCheck={false}
                placeholder={placeholder}
                className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-1 focus:ring-accent"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => save(key, label)}
                  disabled={saving[key] || !!errors[key]}
                  className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {saved[key] ? <Check size={14} /> : <Save size={14} />}
                  {saved[key] ? "Saved" : saving[key] ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
