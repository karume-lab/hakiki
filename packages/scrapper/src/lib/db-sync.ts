import { and, db, eq, isNull } from "@repo/db";
import { constituency, party, politician } from "@repo/db/schema";
import { CONSTITUENCY_TO_COUNTY, KENYA_COUNTIES } from "@repo/scrapper/lib/geo-data";
import { nanoid } from "@repo/utils";

export class DbSync {
  async upsertParty(name: string, slug: string): Promise<string | null> {
    if (!name) return null;

    const existing = await db.query.party.findFirst({
      where: eq(party.name, name),
    });

    if (existing) return existing.id;

    const inserted = await db
      .insert(party)
      .values({
        id: `party_${nanoid()}`,
        name,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return inserted[0]?.id ?? null;
  }

  async upsertConstituency(name: string, county: string): Promise<string | null> {
    if (!name || name === "Unknown") return null;

    // --- Strategy: Three-Layer Lookup ---
    let finalCounty = county;

    // Layer 1 & 2: Exact & Normalised match against CONSTITUENCY_TO_COUNTY
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();
    const normalizedName = normalize(name);

    // Direct match (Layer 1)
    if (CONSTITUENCY_TO_COUNTY[name]) {
      finalCounty = CONSTITUENCY_TO_COUNTY[name];
    } else {
      // Normalised match (Layer 2)
      const mappedKey = Object.keys(CONSTITUENCY_TO_COUNTY).find(
        (key) => normalize(key) === normalizedName,
      );
      if (mappedKey) {
        finalCounty = CONSTITUENCY_TO_COUNTY[mappedKey] || finalCounty;
      }
    }

    // Layer 3: County-as-constituency pattern
    // If the name matches a county name directly, it is its own county
    const countyMatch = Array.from(KENYA_COUNTIES).find((c) => normalize(c) === normalizedName);
    if (countyMatch) {
      // Normalise "Nairobi" to "Nairobi City" for consistency
      if (normalize(countyMatch) === "nairobi") {
        finalCounty = "Nairobi City";
      } else {
        finalCounty = countyMatch;
      }
    }

    let existing = await db.query.constituency.findFirst({
      where: eq(constituency.name, name),
    });

    if (!existing) {
      // Try normalized match against all constituencies in DB to catch naming variations
      const all = await db.query.constituency.findMany();
      existing = all.find((c) => normalize(c.name) === normalizedName);
    }

    if (existing) {
      // Back-fill county if it was previously Unknown or if we have a better one now
      if (existing.county === "Unknown" && finalCounty !== "Unknown") {
        await db
          .update(constituency)
          .set({ county: finalCounty, updatedAt: new Date() })
          .where(eq(constituency.id, existing.id));
      }
      return existing.id;
    }

    const inserted = await db
      .insert(constituency)
      .values({
        id: `const_${nanoid()}`,
        name,
        county: finalCounty,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return inserted[0]?.id ?? null;
  }

  async upsertPolitician(data: {
    mzalendoId: string;
    fullName: string;
    partyId: string | null;
    constituencyId: string | null;
    position: string;
    image?: string;
  }): Promise<string> {
    // 1. Check by mzalendoId (primary key for Mzalendo sync)
    const existingById = await db.query.politician.findFirst({
      where: eq(politician.mzalendoId, data.mzalendoId),
    });

    if (existingById) {
      await db
        .update(politician)
        .set({
          fullName: data.fullName,
          partyId: data.partyId,
          constituencyId: data.constituencyId,
          position: data.position,
          image: data.image ?? existingById.image,
          updatedAt: new Date(),
        })
        .where(eq(politician.id, existingById.id));
      return existingById.id;
    }

    // FIX 2: Deduplication for nominated MPs (no constituency)
    // If no constituency, check if same full_name exists WITHOUT a constituency
    if (!data.constituencyId) {
      const existingByName = await db.query.politician.findFirst({
        where: and(
          eq(politician.fullName, data.fullName),
          isNull(politician.constituencyId),
          eq(politician.position, data.position),
        ),
      });

      if (existingByName) {
        // Link the mzalendoId to this existing record if it wasn't there
        await db
          .update(politician)
          .set({
            mzalendoId: data.mzalendoId,
            updatedAt: new Date(),
          })
          .where(eq(politician.id, existingByName.id));
        return existingByName.id;
      }
    }

    const id = `pol_${nanoid()}`;
    await db.insert(politician).values({
      id,
      mzalendoId: data.mzalendoId,
      fullName: data.fullName,
      slug: data.mzalendoId,
      partyId: data.partyId,
      constituencyId: data.constituencyId,
      position: data.position,
      image: data.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return id;
  }
}
