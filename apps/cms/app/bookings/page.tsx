"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Mail, User, Trash2, Loader2 } from "lucide-react";
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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
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
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        disabled={cancelling === booking.id}
                        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
                      >
                        {cancelling === booking.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPage={handlePage} />
    </div>
  );
}
