import { join } from "node:path";
import { and, db, eq } from "@repo/db";
import { spendingLimit } from "@repo/db/schema";
import { DbSync } from "@repo/scrapper/lib/db-sync";
import { nanoid } from "@repo/utils";
import { $ } from "bun";

export class IebcScraper {
  async run() {
    console.log("Starting IEBC Gazette Scraper (2022 Spending Limits)...");

    const pdfPath = join(import.meta.dir, "../data/iebc-2022-gazette.pdf");

    console.log(`Extracting text from ${pdfPath} using pdftotext...`);
    // Require pdftotext to be installed on system
    const result = await $`pdftotext -layout ${pdfPath} -`.quiet();
    const text = result.stdout.toString("utf-8");

    const s2idx = text.indexOf("SECOND SCHEDULE—COUNTY ELECTION");
    const s3idx = text.indexOf("THIRD SCHEDULE—NATIONAL ASSEMBLY ELECTION");
    const s4idx = text.indexOf("FOURTH SCHEDULE—COUNTY ASSEMBLY WARD ELECTION");

    if (s2idx === -1 || s3idx === -1 || s4idx === -1) {
      throw new Error("Could not find SCHEDULE 2, 3, or 4 markers in PDF text.");
    }

    const schedule2Text = text.slice(s2idx, s3idx);
    const schedule3Text = text.slice(s3idx, s4idx);

    console.log("Parsing Schedule 2 (County/Governors)...");
    const countyLimits = this.parseTable(schedule2Text, "county");

    console.log("Parsing Schedule 3 (Constituency/MPs)...");
    const constLimits = this.parseTable(schedule3Text, "constituency");

    const allLimits = [...countyLimits, ...constLimits];
    console.log(`Parsed ${allLimits.length} total records from PDF.`);

    let inserted = 0;
    const dbSync = new DbSync();

    for (const limit of allLimits) {
      // Create or find constituency ID to map FK
      // DbSync automatically maps constituencies to their counties via geo-data if 'Unknown'
      const constituencyId = await dbSync.upsertConstituency(
        limit.entityName,
        limit.entityType === "county" ? limit.entityName : "Unknown",
      );

      const existing = await db.query.spendingLimit.findFirst({
        where: and(
          eq(spendingLimit.entityName, limit.entityName),
          eq(spendingLimit.entityType, limit.entityType),
          eq(spendingLimit.year, limit.year),
        ),
      });

      if (existing) {
        // Just in case existing record lacks constituencyId, update it
        if (!existing.constituencyId && constituencyId) {
          await db
            .update(spendingLimit)
            .set({ constituencyId })
            .where(eq(spendingLimit.id, existing.id));
        }
      } else {
        await db.insert(spendingLimit).values({
          id: `sl_${nanoid()}`,
          ...limit,
          constituencyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        inserted++;
      }
    }

    console.log(`Saved ${inserted} new spending_limit records.`);
    console.log("IEBC Scraper completed.");
  }

  private parseTable(textBlock: string, entityType: "county" | "constituency") {
    const limits: Array<{
      entityName: string;
      entityType: "county" | "constituency";
      areaSqKm: number;
      registeredVoters: number;
      limitKes: number;
      year: number;
    }> = [];

    // Match lines starting with a number, then name, then 3 numbers with commas
    // Example: "  1     Mombasa                                      1,208,333                             219                                39,648,833"
    const regex = /^\s*\d+\s+([A-Za-z\-'\s/.]+?)\s+([\d,]+)\s+([\d,]+|-|\.)\s+([\d,]+)\s*$/gm;

    const matches = Array.from(textBlock.matchAll(regex));
    for (const match of matches) {
      if (!match[1] || !match[2] || !match[3] || !match[4]) continue;

      let rawName = match[1].trim();
      const popStr = match[2].replace(/,/g, "");
      const areaStr = match[3].replace(/,/g, "").replace(/\./g, ""); // Sometimes area is '.' or '-' if missing?
      const limitStr = match[4].replace(/,/g, "");

      // Normalize name (e.g., "Tana-River" -> "Tana River", "Ol - Jorok" -> "Ol Jorok")
      rawName = rawName.replace(/\s*-\s*/g, " ");

      const areaSqKm = parseInt(areaStr, 10);
      const registeredVoters = parseInt(popStr, 10);
      const limitKes = parseInt(limitStr, 10);

      limits.push({
        entityName: rawName,
        entityType,
        areaSqKm: Number.isNaN(areaSqKm) ? 0 : areaSqKm, // Handle parsing fails for area safely
        registeredVoters,
        limitKes,
        year: 2022,
      });
    }

    return limits;
  }
}
