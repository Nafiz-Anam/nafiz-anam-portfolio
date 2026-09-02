import { z } from "zod";

export const upsertSiteSecretSchema = z.object({
  value: z.string(),
});

export type UpsertSiteSecretInput = z.infer<typeof upsertSiteSecretSchema>;
