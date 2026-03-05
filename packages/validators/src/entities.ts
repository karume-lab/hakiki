import * as schema from "@repo/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const selectPoliticianSchema = createSelectSchema(schema.politician).extend({
  socials: z.string().nullish(),
  termHistory: z.string().nullish(),
});

export const selectPartySchema = createSelectSchema(schema.party);
export const selectConstituencySchema = createSelectSchema(schema.constituency);

export const getPoliticiansInputSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().nullish(),
  role: z.string().nullish(),
  county: z.string().nullish(),
  partyId: z.string().nullish(),
});

export type GetPoliticiansInput = z.infer<typeof getPoliticiansInputSchema>;
