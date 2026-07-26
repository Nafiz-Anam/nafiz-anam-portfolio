import { Router } from "express";
import { z } from "zod";
import { prisma } from "@portfolio/db";
import { createBookingSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { getStoredRefreshToken, getStoredEmail } from "./google-auth";
import { getFreeBusy, createCalendarEvent, deleteCalendarEvent } from "../lib/googleCalendar";
import nodemailer from "nodemailer";

export const bookingRouter = Router();

const BOOKING_KEYS = [
  "booking_timezone",
  "booking_slot_mins",
  "booking_start_hour",
  "booking_end_hour",
  "booking_buffer_mins",
  "booking_days",
] as const;

async function getBookingSettings() {
  const rows = await prisma.siteConfig.findMany({
    where: { key: { in: [...BOOKING_KEYS] } },
  });
  const cfg = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const tz = cfg.booking_timezone ?? process.env.BOOKING_TIMEZONE ?? "UTC";
  const slotMins = parseInt(cfg.booking_slot_mins ?? process.env.BOOKING_SLOT_MINS ?? "30", 10);
  const startHour = parseInt(cfg.booking_start_hour ?? process.env.BOOKING_START_HOUR ?? "9", 10);
  const endHour = parseInt(cfg.booking_end_hour ?? process.env.BOOKING_END_HOUR ?? "18", 10);
  const bufferMins = parseInt(cfg.booking_buffer_mins ?? process.env.BOOKING_BUFFER_MINS ?? "15", 10);
  // booking_days: comma-separated ISO weekday numbers Mon=1..Sun=7; default Mon-Fri
  const daysStr = cfg.booking_days ?? "1,2,3,4,5";
  const days = new Set(
    daysStr.split(",")
      .map((d) => parseInt(d.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 7)
  );

  // Guard: if misconfigured (start >= end), fall back to sane defaults
  const safeStart = startHour < endHour ? startHour : 9;
  const safeEnd = startHour < endHour ? endHour : 18;

  return { tz, slotMins, startHour: safeStart, endHour: safeEnd, bufferMins, days };
}

/**
 * Convert a local hour on a given date in `tz` to a UTC Date.
 * Uses the Intl offset-probe trick — accurate for all IANA timezones.
 */
function localHourToUTC(dateStr: string, hour: number, tz: string): Date {
  const naive = new Date(`${dateStr}T${String(hour).padStart(2, "0")}:00:00Z`);
  const localStr = naive.toLocaleString("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const localAsUTC = new Date(localStr.replace(/(\d+)\/(\d+)\/(\d+),/, "$3-$1-$2"));
  const offsetMs = naive.getTime() - localAsUTC.getTime();
  return new Date(naive.getTime() + offsetMs);
}

type BookingSettings = Awaited<ReturnType<typeof getBookingSettings>>;

function buildSlots(
  date: string,
  busyBlocks: Array<{ start: Date; end: Date }>,
  settings: BookingSettings
): Array<{ start: Date; end: Date; label: string }> {
  const { slotMins, startHour, endHour, bufferMins, days } = settings;
  const slots: Array<{ start: Date; end: Date; label: string }> = [];
  const now = new Date();
  const minStart = new Date(now.getTime() + 60 * 60_000); // must be at least 1hr from now

  // Check if this day is enabled using tz-local date
  const localMidnight = localHourToUTC(date, 0, settings.tz);
  const jsDay = localMidnight.getUTCDay();
  const isoDay = jsDay === 0 ? 7 : jsDay;
  if (!days.has(isoDay)) return [];

  // Interpret startHour/endHour in booking timezone, not UTC
  let cursor = localHourToUTC(date, startHour, settings.tz);
  const dayEnd = localHourToUTC(date, endHour, settings.tz);

  while (cursor < dayEnd) {
    const slotEnd = new Date(cursor.getTime() + slotMins * 60_000);
    if (slotEnd > dayEnd) break;

    const bufferedEnd = new Date(slotEnd.getTime() + bufferMins * 60_000);

    const overlaps = busyBlocks.some(
      (b) => cursor < b.end && bufferedEnd > b.start
    );

    if (!overlaps && cursor >= minStart) {
      // Label in booking timezone so it reflects Nafiz's "office hours"
      const label = cursor.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: settings.tz,
      });
      slots.push({ start: new Date(cursor), end: slotEnd, label });
    }

    cursor = new Date(cursor.getTime() + slotMins * 60_000);
  }

  return slots;
}

/** GET /api/booking/config — public: returns calendar config so web can shade disabled days */
bookingRouter.get("/config", async (_req, res) => {
  const settings = await getBookingSettings();
  res.json({
    slotMins: settings.slotMins,
    startHour: settings.startHour,
    endHour: settings.endHour,
    bufferMins: settings.bufferMins,
    timezone: settings.tz,
    enabledDays: [...settings.days],
  });
});

/** GET /api/booking/slots?date=YYYY-MM-DD */
bookingRouter.get("/slots", async (req, res) => {
  const { date } = req.query as { date?: string };
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ error: { message: "date param required (YYYY-MM-DD)" } });
    return;
  }

  const settings = await getBookingSettings();
  const [year, month, day] = date.split("-").map(Number) as [number, number, number];
  const dayStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const dayEnd = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

  const refreshToken = await getStoredRefreshToken();
  let busyBlocks: Array<{ start: Date; end: Date }> = [];

  if (refreshToken) {
    try {
      busyBlocks = await getFreeBusy(refreshToken, dayStart, dayEnd);
    } catch (err) {
      console.error("[Booking] freeBusy error", err);
    }
  }

  const slots = buildSlots(date, busyBlocks, settings);
  res.json({ date, slots: slots.map((s) => ({ start: s.start.toISOString(), end: s.end.toISOString(), label: s.label })) });
});

/** POST /api/booking — public: create a booking */
bookingRouter.post("/", async (req, res) => {
  const parsed = createBookingSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: { message: parsed.error.errors[0]?.message ?? "Invalid input" } });
    return;
  }

  const { name, email, message, scheduledAt, timezone, durationMins } = parsed.data;
  const scheduled = new Date(scheduledAt);

  if (scheduled < new Date()) {
    res.status(400).json({ error: { message: "Cannot book a slot in the past" } });
    return;
  }

  const refreshToken = await getStoredRefreshToken();
  const ownerEmail = await getStoredEmail();

  let googleEventId: string | undefined;

  if (refreshToken) {
    const settings = await getBookingSettings();
    const dateStr = scheduled.toISOString().slice(0, 10);
    const [year, month, day] = dateStr.split("-").map(Number) as [number, number, number];
    const dayStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const dayEnd = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

    try {
      const busyBlocks = await getFreeBusy(refreshToken, dayStart, dayEnd);
      const bufferEnd = new Date(scheduled.getTime() + (durationMins + settings.bufferMins) * 60_000);
      const conflict = busyBlocks.some((b) => scheduled < b.end && bufferEnd > b.start);
      if (conflict) {
        res.status(409).json({ error: { message: "This slot is no longer available. Please choose another time." } });
        return;
      }
    } catch (err) {
      console.error("[Booking] conflict check failed", err);
    }
  }

  const booking = await prisma.booking.create({
    data: { name, email, message, scheduledAt: scheduled, durationMins, timezone },
  });

  if (refreshToken) {
    try {
      const eventId = await createCalendarEvent(refreshToken, {
        bookingId: booking.id,
        name,
        email,
        scheduledAt: scheduled,
        durationMins,
        timezone,
        ownerEmail,
      });
      await prisma.booking.update({ where: { id: booking.id }, data: { googleEventId: eventId } });
      googleEventId = eventId;
    } catch (err) {
      console.error("[Booking] createCalendarEvent failed", err);
    }
  }

  // Fire-and-forget — never let email failures affect the booking response
  sendConfirmationEmail({ name, email, scheduledAt: scheduled, durationMins, timezone }).catch((err) => {
    console.error("[Booking] visitor confirmation email failed", err);
  });
  notifyOwnerNewBooking({ name, email, message, scheduledAt: scheduled, durationMins, timezone }).catch((err) => {
    console.error("[Booking] owner notification email failed", err);
  });

  res.status(201).json({ booking: { ...booking, googleEventId: googleEventId ?? null } });
});

/** GET /api/booking — admin: list bookings with pagination */
bookingRouter.get("/", requireAuth, async (req, res) => {
  const { status } = req.query as { status?: string };
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
  const skip = (page - 1) * limit;
  const where = status ? { status } : {};
  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({ where, orderBy: { scheduledAt: "desc" }, skip, take: limit }),
    prisma.booking.count({ where }),
  ]);
  res.json({ bookings, total, page, totalPages: Math.ceil(total / limit) });
});

/** DELETE /api/booking/:id — admin: cancel booking */
bookingRouter.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    res.status(404).json({ error: { message: "Booking not found" } });
    return;
  }

  if (booking.googleEventId) {
    const refreshToken = await getStoredRefreshToken();
    if (refreshToken) {
      try {
        await deleteCalendarEvent(refreshToken, booking.googleEventId);
      } catch (err) {
        console.error("[Booking] deleteCalendarEvent failed", err);
      }
    }
  }

  await prisma.booking.update({ where: { id }, data: { status: "cancelled" } });

  sendCancellationEmail({
    name: booking.name,
    email: booking.email,
    scheduledAt: booking.scheduledAt,
    durationMins: booking.durationMins,
    timezone: booking.timezone,
  }).catch((err) => console.error("[Booking] cancellation email failed", err));

  res.json({ ok: true });
});

async function sendConfirmationEmail(params: {
  name: string;
  email: string;
  scheduledAt: Date;
  durationMins: number;
  timezone: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  const dateStr = params.scheduledAt.toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: params.timezone,
  });

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({  // caller wraps in .catch()
    from: SMTP_FROM ?? SMTP_USER,
    to: params.email,
    subject: `Your discovery call is confirmed — ${dateStr}`,
    text: [
      `Hi ${params.name},`,
      ``,
      `Your ${params.durationMins}-minute discovery call with Nafiz Anam is confirmed.`,
      ``,
      `Date & time: ${dateStr} (${params.timezone})`,
      ``,
      `You'll receive a Google Calendar invite shortly with a meeting link.`,
      ``,
      `If you need to reschedule, reply to this email.`,
      ``,
      `— Nafiz Anam`,
    ].join("\n"),
  });
}

async function notifyOwnerNewBooking(params: {
  name: string;
  email: string;
  message: string;
  scheduledAt: Date;
  durationMins: number;
  timezone: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, NOTIFY_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return;

  const dateStr = params.scheduledAt.toLocaleString("en-GB", {
    dateStyle: "full", timeStyle: "short", timeZone: params.timezone,
  });

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to: NOTIFY_EMAIL,
    subject: `New booking — ${params.name} · ${dateStr}`,
    text: [
      `New discovery call booked.`,
      ``,
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      `Date & time: ${dateStr} (${params.timezone})`,
      `Duration: ${params.durationMins} min`,
      params.message ? `\nMessage:\n${params.message}` : "",
    ].join("\n"),
  });
}

async function sendCancellationEmail(params: {
  name: string;
  email: string;
  scheduledAt: Date;
  durationMins: number;
  timezone: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  const dateStr = params.scheduledAt.toLocaleString("en-GB", {
    dateStyle: "full", timeStyle: "short", timeZone: params.timezone,
  });

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to: params.email,
    subject: `Your discovery call on ${dateStr} has been cancelled`,
    text: [
      `Hi ${params.name},`,
      ``,
      `Your ${params.durationMins}-minute discovery call scheduled for ${dateStr} has been cancelled.`,
      ``,
      `To rebook, visit nafizanam.com or reply to this email.`,
      ``,
      `— Nafiz Anam`,
    ].join("\n"),
  });
}
