"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Mail, User, Trash2, Loader2, RefreshCw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { type Booking } from "@portfolio/types";
import { api } from "@/lib/api";
import { Pagination } from "@/components/Pagination";

function formatDateTime(d: Date | string, tz?: string) {
  return new Date(d).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: tz ?? "UTC",
  });
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/15 text-green-400",
  cancelled: "bg-muted/40 text-muted-foreground",
};

const LIMIT = 25;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function RescheduleModal({
  booking,
  onClose,
  onSuccess,
}: {
  booking: Booking;
  onClose: () => void;
  onSuccess: (updated: Booking) => void;
}) {
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  async function confirm() {
    if (!selectedDate || !selectedTime) { setError("Select a date and time."); return; }
    const iso = `${selectedDate}T${selectedTime}:00.000Z`;
    setSaving(true);
    setError(null);
    try {
      const res = await api.patch<{ booking: Booking }>(`/booking/${booking.id}/reschedule`, {
        scheduledAt: iso,
        timezone: booking.timezone,
      });
      onSuccess(res.data.booking);
      onClose();
    } catch (e) {
      setError((e as { message?: string }).message ?? "Reschedule failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <RefreshCw size={14} className="text-accent" /> Reschedule Booking
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
        </div>
        <div className="p-5">
          <p className="mb-4 text-xs text-muted-foreground">Client: <strong>{booking.name}</strong></p>

          {/* Calendar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <button onClick={() => setViewMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()-1); return d; })} className="p-1 hover:text-foreground text-muted-foreground"><ChevronLeft size={14}/></button>
              <span className="font-semibold">{MONTHS[month]} {year}</span>
              <button onClick={() => setViewMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()+1); return d; })} className="p-1 hover:text-foreground text-muted-foreground"><ChevronRight size={14}/></button>
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {["M","T","W","T","F","S","S"].map((d,i) => <div key={i} className="py-1 text-center text-[10px] text-muted-foreground">{d}</div>)}
              {cells.map((day, i) => {
                if (!day) return <div key={`e${i}`}/>;
                const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                const past = new Date(year, month, day) < now;
                const sel = selectedDate === dateStr;
                return (
                  <button key={dateStr} disabled={past} onClick={() => setSelectedDate(dateStr)}
                    className={`rounded py-1.5 text-xs transition-colors ${sel ? "bg-accent text-accent-foreground font-bold" : past ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-muted/40"}`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">New time (UTC)</label>
            <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-md border border-border bg-muted/10 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent" />
          </div>

          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted/30">Cancel</button>
            <button onClick={confirm} disabled={saving || !selectedDate || !selectedTime}
              className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50">
              {saving && <Loader2 size={12} className="animate-spin"/>}
              {saving ? "Saving…" : "Confirm Reschedule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [rescheduling, setRescheduling] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<"all" | "confirmed" | "cancelled">("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  function load(f = filter, p = page) {
    setLoading(true);
    const params: Record<string, unknown> = { page: p, limit: LIMIT };
    if (f !== "all") params.status = f;
    api
      .get<{ bookings: Booking[]; total: number; totalPages: number }>("/booking", { params })
      .then((res) => {
        setBookings(res.data.bookings ?? []);
        setTotal(res.data.total ?? 0);
        setTotalPages(res.data.totalPages ?? 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { setPage(1); load(filter, 1); }, [filter]);

  function handlePage(p: number) { setPage(p); load(filter, p); }

  async function cancelBooking(id: string) {
    if (!confirm("Cancel this booking? The Google Calendar event will be deleted.")) return;
    setCancelling(id);
    try {
      await api.delete(`/booking/${id}`);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
      );
    } catch {
      alert("Failed to cancel booking.");
    } finally {
      setCancelling(null);
    }
  }

  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.scheduledAt) > new Date()
  ).length;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Discovery calls booked via the website.
            {upcoming > 0 && (
              <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                {upcoming} upcoming
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          {(["all", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-border text-sm text-muted-foreground">
          No bookings yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Scheduled</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Duration</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Message</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-border/60 last:border-b-0 hover:bg-muted/10"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User size={14} className="shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{booking.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail size={11} />
                          <a
                            href={`mailto:${booking.email}`}
                            className="hover:text-accent hover:underline"
                          >
                            {booking.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar size={13} className="text-muted-foreground" />
                      {formatDateTime(booking.scheduledAt, booking.timezone)}
                    </div>
                    <div className="ml-5 text-[11px] text-muted-foreground">{booking.timezone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={13} />
                      {booking.durationMins} min
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        STATUS_COLORS[booking.status] ?? STATUS_COLORS.confirmed
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="max-w-[240px] px-4 py-3 text-xs text-muted-foreground">
                    {booking.message ? (
                      <span className="line-clamp-2">{booking.message}</span>
                    ) : (
                      <span className="italic opacity-50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {booking.status === "confirmed" && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setRescheduling(booking)}
                          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-blue-400 transition-colors hover:bg-blue-400/10"
                        >
                          <RefreshCw size={12} /> Reschedule
                        </button>
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          disabled={cancelling === booking.id}
                          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
                        >
                          {cancelling === booking.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPage={handlePage} />

      {rescheduling && (
        <RescheduleModal
          booking={rescheduling}
          onClose={() => setRescheduling(null)}
          onSuccess={(updated) => {
            setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
            setRescheduling(null);
          }}
        />
      )}
    </div>
  );
}
