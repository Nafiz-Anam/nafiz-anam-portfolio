import { z } from "zod";

export const bookingSlotSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  label: z.string(),
});

export const createBookingSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().max(1000).default(""),
  scheduledAt: z.string().datetime(),
  timezone: z.string().min(1).max(100),
  durationMins: z.number().int().min(15).max(120).default(30),
});

export const bookingSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  scheduledAt: z.coerce.date(),
  durationMins: z.number(),
  timezone: z.string(),
  googleEventId: z.string().nullable(),
  status: z.enum(["confirmed", "cancelled"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["confirmed", "cancelled"]),
});

export type BookingSlot = z.infer<typeof bookingSlotSchema>;
export type CreateBooking = z.infer<typeof createBookingSchema>;
export type Booking = z.infer<typeof bookingSchema>;
