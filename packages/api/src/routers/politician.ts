import { pubOS } from "@repo/api/os";
import { db, schema } from "@repo/db";
import { getPoliticiansInputSchema, selectPoliticianSchema } from "@repo/validators/entities";
import { and, eq, gt, like, or } from "drizzle-orm";
import { z } from "zod";

export const politicianRouter = pubOS.router({
  list: pubOS
    .input(getPoliticiansInputSchema)
    .output(
      z.object({
        items: z.array(selectPoliticianSchema),
        nextCursor: z.string().nullish(),
      }),
    )
    .route({
      description: "List politicians with filtering and cursor pagination",
    })
    .handler(async ({ input }) => {
      const { limit, cursor, search, role, county, partyId } = input;

      const filters = [];

      if (search) {
        filters.push(or(like(schema.politician.fullName, `%${search}%`)));
      }

      if (role && role !== "All") {
        filters.push(eq(schema.politician.position, role));
      }

      if (partyId) {
        filters.push(eq(schema.politician.partyId, partyId));
      }

      if (cursor) {
        filters.push(gt(schema.politician.id, cursor));
      }

      const items = await db.query.politician.findMany({
        where: filters.length > 0 ? and(...filters) : undefined,
        with: {
          constituency: true,
          party: true,
        },
        limit: limit + 1,
        orderBy: (politicians, { asc }) => [asc(politicians.id)],
      });

      // Filter by county in memory for now
      let filteredItems = items;
      if (county && county !== "All") {
        filteredItems = items.filter((item) => item.constituency?.county === county);
      }

      // Re-apply limit after possible in-memory filtering
      const paginatedItems = filteredItems.slice(0, limit);

      let nextCursor: string | null = null;
      if (filteredItems.length > limit) {
        nextCursor = paginatedItems[paginatedItems.length - 1]?.id ?? null;
      }

      return {
        items: paginatedItems,
        nextCursor,
      };
    }),

  getFilters: pubOS
    .output(
      z.object({
        roles: z.array(z.string()),
        counties: z.array(z.string()),
        parties: z.array(z.object({ id: z.string(), name: z.string() })),
      }),
    )
    .route({ description: "Get available filter options based on data" })
    .handler(async () => {
      const rolesResult = await db
        .selectDistinct({ position: schema.politician.position })
        .from(schema.politician);
      const constituencies = await db
        .selectDistinct({ county: schema.constituency.county })
        .from(schema.constituency);
      const parties = await db.select().from(schema.party);

      return {
        roles: rolesResult.map((r) => r.position),
        counties: constituencies.map((c) => c.county),
        parties: parties.map((p) => ({ id: p.id, name: p.name })),
      };
    }),
});
