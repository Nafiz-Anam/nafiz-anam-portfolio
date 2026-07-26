import { z } from "zod";

export const contactLeadSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  category: z.string().min(1),
  budget: z.string().min(1),
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
