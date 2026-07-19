import { z } from "zod";

export const mediaSchema = z.object({
  id: z.string().cuid(),
  filename: z.string(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int().positive(),
  createdAt: z.coerce.date(),
});

export type Media = z.infer<typeof mediaSchema>;
