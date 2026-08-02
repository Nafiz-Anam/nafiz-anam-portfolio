"use client";

import { useEffect, useState } from "react";
import { Save, Check, Eye, EyeOff, CalendarCheck, Unplug, ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Select } from "@portfolio/ui";

const TIMEZONES = [
  "UTC", "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Amsterdam",
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Toronto", "America/Vancouver", "Asia/Dubai", "Asia/Kolkata",
  "Asia/Dhaka", "Asia/Bangkok", "Asia/Singapore", "Asia/Tokyo",
  "Australia/Sydney", "Pacific/Auckland",
];

const BOOKING_DAYS = [
  { iso: 1, label: "Mon" }, { iso: 2, label: "Tue" }, { iso: 3, label: "Wed" },
  { iso: 4, label: "Thu" }, { iso: 5, label: "Fri" }, { iso: 6, label: "Sat" },
  { iso: 7, label: "Sun" },
];

const MANAGED_KEYS: { key: string; label: string; description: string; type?: "url" | "text" | "select"; options?: { value: string; label: string }[] }[] = [
  {
    key: "availability_status",
    label: "Availability Status",
    description: "Shown as a badge on the website hero. Lets potential clients know if you're taking on work.",
    type: "select",
    options: [
      { value: "available", label: "Available for work" },
      { value: "limited", label: "Limited availability" },
      { value: "unavailable", label: "Not available" },
    ],
  },
  {
    key: "contact_email",
    label: "Contact Email",
    description: "Email shown in the footer and contact page.",
    type: "text",
  },
  {
    key: "facebook_url",
    label: "Facebook URL",
    description: "Your Facebook page — shown in footer socials.",
    type: "url",
  },
  {
    key: "linkedin_url",
    label: "LinkedIn URL",
    description: "Your LinkedIn profile — shown in footer socials.",
    type: "url",
  },
  {
    key: "github_url",
    label: "GitHub URL",
    description: "Your GitHub profile — shown in footer socials.",
    type: "url",
  },
  {
    key: "twitter_url",
    label: "Twitter / X URL",
    description: "Your Twitter/X profile — shown in footer socials.",
    type: "url",
  },
  {
    key: "footer_photo_url",
    label: "Footer Photo URL",
    description: "Your photo shown in the footer card. Paste an upload URL from Media library.",
    type: "url",
  },
  {
    key: "hero_headline_1",
    label: "Hero — Headline Line 1",
    description: "First line of the hero headline (e.g. \"Design &\").",
    type: "text",
  },
  {
    key: "hero_headline_2_serif",
    label: "Hero — Headline Line 2 (italic)",
    description: "Italic serif part of headline line 2 (e.g. \"development\").",
    type: "text",
  },
  {
    key: "hero_headline_2_sans",
    label: "Hero — Headline Line 2 (normal)",
    description: "Normal weight part of headline line 2 (e.g. \"Partner\").",
    type: "text",
  },
  {
    key: "hero_name",
    label: "Hero — Your Name",
    description: "Large name displayed in the hero card.",
    type: "text",
  },
  {
    key: "hero_pitch",
    label: "Hero — Pitch Text",
    description: "Short bio paragraph shown below your name.",
    type: "text",
  },
  {
    key: "hero_photo_url",
    label: "Hero — Photo URL",
    description: "Your headshot shown in the hero card. Paste upload URL from Media library.",
    type: "url",
  },
  {
    key: "hero_tags",
    label: "Hero — Tags",
    description: "Pipe-separated tags shown top-right (e.g. \"/design | /engineering | /consulting\").",
    type: "text",
  },
  {
    key: "stat_1_value",
    label: "Stat 1 — Value",
    description: "Homepage authority snapshot (e.g. \"7+\").",
    type: "text",
  },
  {
    key: "stat_1_label",
    label: "Stat 1 — Label",
    description: "Label for stat 1 (e.g. \"Years Experience\").",
    type: "text",
  },
  {
    key: "stat_2_value",
    label: "Stat 2 — Value",
    description: "Homepage authority snapshot (e.g. \"40+\").",
    type: "text",
  },
  {
    key: "stat_2_label",
    label: "Stat 2 — Label",
    description: "Label for stat 2 (e.g. \"Projects Delivered\").",
    type: "text",
  },
  {
    key: "stat_3_value",
    label: "Stat 3 — Value",
    description: "Homepage authority snapshot (e.g. \"20+\").",
    type: "text",
  },
  {
    key: "stat_3_label",
    label: "Stat 3 — Label",
    description: "Label for stat 3 (e.g. \"Happy Clients\").",
    type: "text",
  },
  {
    key: "client_logo_1",
    label: "Client Logo 1",
    description: "Client name shown in homepage logo strip (slot 1). Leave blank for decorative tile.",
    type: "text",
  },
  {
    key: "client_logo_2",
    label: "Client Logo 2",
    description: "Client name shown in homepage logo strip (slot 2).",
    type: "text",
  },
  {
    key: "client_logo_3",
    label: "Client Logo 3",
    description: "Client name shown in homepage logo strip (slot 3).",
    type: "text",
  },
  {
    key: "client_logo_4",
    label: "Client Logo 4",
    description: "Client name shown in homepage logo strip (slot 4).",
    type: "text",
  },
  {
    key: "client_logo_5",
    label: "Client Logo 5",
    description: "Client name shown in homepage logo strip (slot 5).",
    type: "text",
  },
  {
    key: "client_logo_6",
    label: "Client Logo 6",
    description: "Client name shown in homepage logo strip (slot 6).",
    type: "text",
  },
];

const GENERAL_KEYS = ["availability_status", "contact_email", "facebook_url", "linkedin_url", "github_url", "twitter_url"];
const HERO_KEYS = [
  "footer_photo_url", "hero_headline_1", "hero_headline_2_serif", "hero_headline_2_sans",
  "hero_name", "hero_pitch", "hero_photo_url", "hero_tags",
  "stat_1_value", "stat_1_label", "stat_2_value", "stat_2_label", "stat_3_value", "stat_3_label",
  "client_logo_1", "client_logo_2", "client_logo_3", "client_logo_4", "client_logo_5", "client_logo_6",
];

type Tab = "general" | "hero" | "booking" | "account";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  // Password change state
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Google Calendar state
  const [calStatus, setCalStatus] = useState<{ connected: boolean; email: string | null } | null>(null);
  const [calLoading, setCalLoading] = useState(true);
  const [calDisconnecting, setCalDisconnecting] = useState(false);

  useEffect(() => {
    api.get<{ config: Record<string, string> }>("/api/site-config")
      .then((res) => setValues(res.data.config ?? {}))
      .catch((e: { message?: string }) => setError(e.message ?? "Failed to load."));

    api.get("/api/google-calendar/status")
      .then((res) => setCalStatus(res.data))
      .catch(() => setCalStatus({ connected: false, email: null }))
      .finally(() => setCalLoading(false));
  }, []);

  async function disconnectGoogleCalendar() {
    if (!confirm("Disconnect Google Calendar? Booking slots will no longer check your availability.")) return;
    setCalDisconnecting(true);
    try {
      await api.delete("/api/google-calendar/disconnect");
      setCalStatus({ connected: false, email: null });
    } catch {
      alert("Failed to disconnect.");
    } finally {
      setCalDisconnecting(false);
    }
  }

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

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    if (pwNew !== pwConfirm) { setPwError("New passwords don't match."); return; }
    if (pwNew.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    setPwSaving(true);
    try {
      await api.post("/api/auth/change-password", { currentPassword: pwCurrent, newPassword: pwNew });
      setPwSuccess(true);
      setPwCurrent(""); setPwNew(""); setPwConfirm("");
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      const e = err as { message?: string };
      setPwError(e.message ?? "Password change failed.");
    } finally {
      setPwSaving(false);
    }
  }

  function renderField({ key, label, description, type, options }: typeof MANAGED_KEYS[number]) {
    return (
      <div key={key} className="rounded-xl border border-border bg-muted/20 p-5">
        <div className="mb-3">
          <p className="text-sm font-semibold">{label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {type === "select" && options ? (
            <Select
              className="flex-1"
              value={values[key] ?? ""}
              onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
              placeholder="— select —"
              options={options}
            />
          ) : (
            <input
              type={type === "url" ? "url" : "text"}
              value={values[key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") save(key, label); }}
              placeholder={type === "url" ? "https://" : ""}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
          )}
          <button
            onClick={() => save(key, label)}
            disabled={saving[key]}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
          >
            {saved[key] ? <Check size={15} /> : <Save size={15} />}
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "General" },
    { id: "hero", label: "Hero" },
    { id: "booking", label: "Booking" },
    { id: "account", label: "Account" },
  ];

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Site-wide configuration managed from the CMS.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {/* Tab bar */}
      <div className="mb-6 flex gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === id
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {/* General tab */}
        {tab === "general" && MANAGED_KEYS.filter((k) => GENERAL_KEYS.includes(k.key)).map(renderField)}

        {/* Hero tab */}
        {tab === "hero" && MANAGED_KEYS.filter((k) => HERO_KEYS.includes(k.key)).map(renderField)}

        {/* Booking tab */}
        {tab === "booking" && (
          <>
            {/* Google Calendar */}
            <div className="rounded-xl border border-border bg-muted/20 p-5">
              <div className="mb-4 flex items-start gap-3">
                <CalendarCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold">Google Calendar</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Connect your Google Calendar so booking slots automatically reflect your real availability.
                    Visitors will see open slots and get a Google Calendar invite when they book.
                  </p>
                </div>
              </div>

              {calLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" /> Checking status…
                </div>
              ) : calStatus?.connected ? (
                <div className="flex items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-green-400">Connected</p>
                    {calStatus.email && (
                      <p className="text-xs text-muted-foreground">{calStatus.email}</p>
                    )}
                  </div>
                  <button
                    onClick={disconnectGoogleCalendar}
                    disabled={calDisconnecting}
                    className="flex items-center gap-1.5 rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {calDisconnecting ? <Loader2 size={12} className="animate-spin" /> : <Unplug size={12} />}
                    Disconnect
                  </button>
                </div>
              ) : (
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL_CMS ?? "http://localhost:4000"}/api/google-calendar/connect`}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                >
                  <ExternalLink size={14} />
                  Connect Google Calendar
                </a>
              )}
            </div>

            {/* Calendar booking config */}
            <div className="rounded-xl border border-border bg-muted/20 p-5">
              <div className="mb-5">
                <p className="text-sm font-semibold">Booking Configuration</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Controls when visitors can book discovery calls. Changes apply immediately.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Timezone */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Timezone</label>
                    <Select
                      value={values["booking_timezone"] ?? "UTC"}
                      onChange={(v) => setValues((prev) => ({ ...prev, booking_timezone: v }))}
                      options={TIMEZONES.map((tz) => ({ value: tz, label: tz }))}
                    />
                  </div>
                  <button
                    onClick={() => save("booking_timezone", "Booking Timezone")}
                    disabled={saving["booking_timezone"]}
                    className="mt-5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                  >
                    {saved["booking_timezone"] ? <Check size={15} /> : <Save size={15} />}
                  </button>
                </div>

                {/* Slot duration + buffer */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Slot Duration (min)</label>
                      <Select
                        value={values["booking_slot_mins"] ?? "30"}
                        onChange={(v) => setValues((prev) => ({ ...prev, booking_slot_mins: v }))}
                        options={["15","30","45","60"].map((m) => ({ value: m, label: `${m} min` }))}
                      />
                    </div>
                    <button
                      onClick={() => save("booking_slot_mins", "Booking Slot Duration")}
                      disabled={saving["booking_slot_mins"]}
                      className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      {saved["booking_slot_mins"] ? <Check size={15} /> : <Save size={15} />}
                    </button>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Buffer Between Calls (min)</label>
                      <Select
                        value={values["booking_buffer_mins"] ?? "15"}
                        onChange={(v) => setValues((prev) => ({ ...prev, booking_buffer_mins: v }))}
                        options={["0","5","10","15","30"].map((m) => ({ value: m, label: `${m} min` }))}
                      />
                    </div>
                    <button
                      onClick={() => save("booking_buffer_mins", "Booking Buffer")}
                      disabled={saving["booking_buffer_mins"]}
                      className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      {saved["booking_buffer_mins"] ? <Check size={15} /> : <Save size={15} />}
                    </button>
                  </div>
                </div>

                {/* Working hours */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Day Starts At</label>
                      <Select
                        value={values["booking_start_hour"] ?? "9"}
                        onChange={(v) => setValues((prev) => ({ ...prev, booking_start_hour: v }))}
                        options={Array.from({ length: 13 }, (_, i) => i + 6).map((h) => ({ value: String(h), label: `${String(h).padStart(2,"0")}:00` }))}
                      />
                    </div>
                    <button
                      onClick={() => save("booking_start_hour", "Booking Start Hour")}
                      disabled={saving["booking_start_hour"]}
                      className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      {saved["booking_start_hour"] ? <Check size={15} /> : <Save size={15} />}
                    </button>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Day Ends At</label>
                      <Select
                        value={values["booking_end_hour"] ?? "18"}
                        onChange={(v) => setValues((prev) => ({ ...prev, booking_end_hour: v }))}
                        options={Array.from({ length: 13 }, (_, i) => i + 10).map((h) => ({ value: String(h), label: `${String(h).padStart(2,"0")}:00` }))}
                      />
                    </div>
                    <button
                      onClick={() => save("booking_end_hour", "Booking End Hour")}
                      disabled={saving["booking_end_hour"]}
                      className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      {saved["booking_end_hour"] ? <Check size={15} /> : <Save size={15} />}
                    </button>
                  </div>
                </div>

                {/* Available days */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground">Available Days</label>
                    <button
                      onClick={() => save("booking_days", "Booking Days")}
                      disabled={saving["booking_days"]}
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      {saved["booking_days"] ? <Check size={12} /> : <Save size={12} />}
                      Save days
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {BOOKING_DAYS.map(({ iso, label }) => {
                      const currentDays = (values["booking_days"] ?? "1,2,3,4,5")
                        .split(",").map((d) => d.trim()).filter(Boolean);
                      const active = currentDays.includes(String(iso));
                      return (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => {
                            const days = new Set(currentDays);
                            if (active) days.delete(String(iso));
                            else days.add(String(iso));
                            const sorted = [...days].sort((a, b) => Number(a) - Number(b));
                            setValues((v) => ({ ...v, booking_days: sorted.join(",") }));
                          }}
                          className={`flex h-9 w-11 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                            active
                              ? "bg-accent text-accent-foreground"
                              : "border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Account tab */}
        {tab === "account" && (
          <div className="rounded-xl border border-border bg-muted/20 p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold">Change Password</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Update your admin login password.</p>
            </div>
            <form onSubmit={changePassword} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current password"
                  value={pwCurrent}
                  onChange={(e) => setPwCurrent(e.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-1 focus:ring-accent"
                />
                <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-2.5 text-muted-foreground">
                  {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New password (min 8 chars)"
                  value={pwNew}
                  onChange={(e) => setPwNew(e.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-1 focus:ring-accent"
                />
                <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-2.5 text-muted-foreground">
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <input
                type="password"
                placeholder="Confirm new password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                required
                className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
              />
              {pwError && <p className="text-xs text-red-400">{pwError}</p>}
              {pwSuccess && <p className="text-xs text-green-400">Password updated successfully.</p>}
              <button
                type="submit"
                disabled={pwSaving}
                className="self-start rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {pwSaving ? "Updating…" : "Update password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
