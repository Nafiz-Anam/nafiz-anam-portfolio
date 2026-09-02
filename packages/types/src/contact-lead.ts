import { z } from "zod";

export const contactLeadSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  company: z.string().max(200).nullable().optional(),
  email: z.string().email(),
  phone: z.string().max(50).nullable().optional(),
  category: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  timeline: z.string().nullable().optional(),
  message: z.string().min(1),
  status: z.enum(["new", "read", "replied", "archived"]).default("new"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ContactLead = z.infer<typeof contactLeadSchema>;

export const createContactLeadSchema = contactLeadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});
export type CreateContactLeadInput = z.infer<typeof createContactLeadSchema>;

export const updateContactLeadStatusSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]),
});
export type UpdateContactLeadStatusInput = z.infer<typeof updateContactLeadStatusSchema>;
