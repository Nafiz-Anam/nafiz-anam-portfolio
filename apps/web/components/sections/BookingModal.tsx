"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Loader2, Check, Calendar, Clock } from "lucide-react";
import { z } from "zod";
import { api } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().max(1000).optional(),
});

type Slot = { start: string; end: string; label: string };
type Step = "date" | "time" | "form" | "confirm";
type BookingConfig = { enabledDays: number[]; slotMins: number; startHour: number; endHour: number };

function toLocalDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number) as [number, number, number];
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function addMonths(d: Date, n: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + n);
  return r;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function CalendarGrid({
  viewMonth,
  selected,
  onSelect,
  onPrev,
  onNext,
  enabledDays,
}: {
  viewMonth: Date;
  selected: string | null;
  onSelect: (d: string) => void;
  onPrev: () => void;
  onNext: () => void;
  enabledDays: number[];
}) {
  const enabledSet = new Set(enabledDays.length > 0 ? enabledDays : [1, 2, 3, 4, 5]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onPrev} className="rounded-md p-1.5 text-foreground/60 hover:text-foreground">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold">
          {MONTHS[month]} {year}
        </span>
        <button onClick={onNext} className="rounded-md p-1.5 text-foreground/60 hover:text-foreground">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d) => (
          <div key={d} className="py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const cellDate = new Date(year, month, day);
          const isPast = cellDate < today;
          const jsDay = cellDate.getDay();
          const isoDay = jsDay === 0 ? 7 : jsDay;
          const isWeekend = !enabledSet.has(isoDay);
          const isSelected = selected === dateStr;
          const disabled = isPast || isWeekend;
          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`rounded-md py-2 text-sm transition-colors ${
                isSelected
                  ? "bg-accent font-bold text-accent-foreground"
                  : disabled
                  ? "cursor-not-allowed text-foreground/20"
                  : "text-foreground hover:bg-foreground/10"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("date");
  const [config, setConfig] = useState<BookingConfig>({ enabledDays: [1,2,3,4,5], slotMins: 30, startHour: 9, endHour: 18 });
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    api.get<BookingConfig>("/booking/config")
      .then((res) => setConfig(res.data))
      .catch(() => {});
  }, []);

  const reset = useCallback(() => {
    setStep("date");
    setSelectedDate(null);
    setSlots([]);
    setSlotsError(false);
    setSelectedSlot(null);
    setName("");
    setEmail("");
    setMessage("");
    setFormError(null);
    setConfirmed(false);
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (!selectedDate) return;
    setSlotsLoading(true);
    setSlots([]);
    setSlotsError(false);
    api
      .get<{ slots: Slot[] }>(`/booking/slots?date=${selectedDate}`)
      .then((res) => setSlots(res.data.slots ?? []))
      .catch(() => { setSlots([]); setSlotsError(true); })
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  async function handleBook() {
    const parsed = formSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      setFormError(parsed.error.errors[0]?.message ?? "Please fill in required fields.");
      return;
    }
    if (!selectedSlot) return;

    setSubmitting(true);
    setFormError(null);
    try {
      await api.post("/booking", {
        name,
        email,
        message,
        scheduledAt: selectedSlot.start,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        durationMins: config.slotMins,
      });
      setConfirmed(true);
      setStep("confirm");
    } catch (err) {
      const e = err as { message?: string };
      setFormError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-[8px] border border-foreground/10 bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Book a Discovery Call</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-foreground/50 transition-colors hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Step: date */}
          {step === "date" && (
            <div>
              <p className="mb-4 text-[13px] text-foreground/55">
                Pick a date for your {config.slotMins}-minute call. Unavailable days are greyed out.
              </p>
              <CalendarGrid
                viewMonth={viewMonth}
                selected={selectedDate}
                onSelect={(d) => {
                  setSelectedDate(d);
                  setSelectedSlot(null);
                }}
                onPrev={() => setViewMonth((m) => addMonths(m, -1))}
                onNext={() => setViewMonth((m) => addMonths(m, 1))}
                enabledDays={config.enabledDays}
              />
              <div className="mt-6 flex justify-end">
                <button
                  disabled={!selectedDate}
                  onClick={() => setStep("time")}
                  className="rounded-[5px] bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step: time */}
          {step === "time" && selectedDate && (
            <div>
              <button
                onClick={() => setStep("date")}
                className="mb-4 flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <p className="mb-1 text-sm font-semibold">{formatDisplayDate(selectedDate)}</p>
              <p className="mb-4 text-[13px] text-foreground/55">Choose an available time slot.</p>

              {slotsLoading ? (
                <div className="flex h-32 items-center justify-center text-foreground/40">
                  <Loader2 size={20} className="animate-spin" />
                </div>
              ) : slotsError ? (
                <div className="flex h-32 flex-col items-center justify-center gap-2 text-center text-[13px] text-foreground/50">
                  <Clock size={20} className="opacity-40" />
                  Could not load availability. Please try again.
                  <button
                    onClick={() => {
                      setSlotsError(false);
                      setSlotsLoading(true);
                      api.get<{ slots: Slot[] }>(`/booking/slots?date=${selectedDate}`)
                        .then((res) => setSlots(res.data.slots ?? []))
                        .catch(() => { setSlots([]); setSlotsError(true); })
                        .finally(() => setSlotsLoading(false));
                    }}
                    className="text-accent hover:underline"
                  >
                    Retry
                  </button>
                </div>
              ) : slots.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center gap-2 text-center text-[13px] text-foreground/50">
                  <Clock size={20} className="opacity-40" />
                  No slots available on this day.
                  <button onClick={() => setStep("date")} className="text-accent hover:underline">
                    Pick another date
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      // Show time in visitor's local timezone for clarity
                      const localTime = new Date(slot.start).toLocaleTimeString([], {
                        hour: "2-digit", minute: "2-digit", hour12: false,
                      });
                      return (
                        <button
                          key={slot.start}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-[5px] border py-2.5 text-sm font-medium transition-colors ${
                            selectedSlot?.start === slot.start
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-foreground/10 text-foreground hover:border-accent/50 hover:bg-foreground/5"
                          }`}
                        >
                          {localTime}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-foreground/35">
                    Times shown in your local timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </p>
                </>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep("form")}
                  className="rounded-[5px] bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step: form */}
          {step === "form" && (
            <div>
              <button
                onClick={() => setStep("time")}
                className="mb-4 flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <div className="mb-4 rounded-[5px] border border-foreground/10 bg-background/50 px-4 py-3 text-sm">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Calendar size={13} className="text-accent" />
                  {selectedDate && formatDisplayDate(selectedDate)}
                </div>
                <div className="mt-1 flex items-center gap-2 text-foreground/70">
                  <Clock size={13} className="text-accent" />
                  {selectedSlot ? new Date(selectedSlot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : ""} · {config.slotMins} min
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-[5px] border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-[5px] border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <textarea
                  placeholder="What would you like to discuss? (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="rounded-[5px] border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                {formError && <p className="text-sm text-red-400">{formError}</p>}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleBook}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-[5px] bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  {submitting ? "Booking…" : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}

          {/* Step: confirm */}
          {step === "confirm" && confirmed && (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                <Check size={28} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold">You&apos;re booked!</h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-foreground/55">
                  A Google Calendar invite has been sent to <strong>{email}</strong>.
                  You&apos;ll also receive a confirmation email shortly.
                </p>
              </div>
              {selectedDate && selectedSlot && (
                <div className="rounded-[5px] border border-foreground/10 bg-background/50 px-5 py-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Calendar size={13} className="text-accent" />
                    {formatDisplayDate(selectedDate)}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-foreground/70">
                    <Clock size={13} className="text-accent" />
                    {new Date(selectedSlot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} · {config.slotMins} min
                  </div>
                </div>
              )}
              <button
                onClick={onClose}
                className="rounded-[5px] bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
