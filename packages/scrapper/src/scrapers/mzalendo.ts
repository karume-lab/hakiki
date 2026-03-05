import * as cheerio from "cheerio";
import { DbSync } from "@/lib/db-sync";
import { DocumentStore } from "@/lib/document-store";
import { HttpClient } from "@/lib/http-client";

const DISCOVERY_ENDPOINTS = [
  {
    name: "Member of the National Assembly",
    path: "/position/member-national-assembly/governmental/parliament/",
    isGovernor: false,
  },
  {
    name: "Governor",
    path: "/position/governor/",
    isGovernor: true,
  },
];

const RATE_LIMIT_MS = 400;

interface DiscoveredPerson {
  slug: string;
  fullName: string;
  constituencyName: string;
  countyName: string;
  partyName: string;
  partySlug: string;
  position: string;
}

export class MzalendoScraper {
  private baseUrl = "https://info.mzalendo.com";
  private client = new HttpClient(this.baseUrl);
  private store = new DocumentStore();
  private dbSync = new DbSync();

  async run() {
    console.log("Starting Mzalendo scraper...");

    try {
      // Phase 1: Discover all targeted people from the listing pages
      const people = await this.discoverAllTargeted();
      console.log(`Discovered ${people.length} total targeted people.`);

      // Phase 2: Upsert each person into the DB
      for (const person of people) {
        await this.syncPolitician(person);
        await this.delay(RATE_LIMIT_MS);
      }

      console.log("Mzalendo scraper finished.");
    } catch (error) {
      console.error("Mzalendo scraper failed:", error);
      throw error;
    }
  }

  private async discoverAllTargeted(): Promise<DiscoveredPerson[]> {
    const allResults: DiscoveredPerson[] = [];

    for (const endpoint of DISCOVERY_ENDPOINTS) {
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        console.log(`Fetching ${endpoint.name} listing page ${page}...`);

        const url = `${endpoint.path}?page=${page}`;
        const response = await this.client.get(url);

        if (!response?.data) {
          console.warn(`Empty response on page ${page}, stopping.`);
          break;
        }

        const $ = cheerio.load(response.data);
        const people = this.parseListingPage($, endpoint.name, endpoint.isGovernor);

        if (people.length === 0) {
          console.log(`No people found on page ${page}, stopping.`);
          break;
        }

        allResults.push(...people);
        console.log(
          `${endpoint.name} Page ${page}: found ${people.length} (total so far: ${allResults.length})`,
        );

        // Check for next page link
        hasNext = false;
        $("a").each((_, el) => {
          const text = $(el).text().toLowerCase().trim();
          if (text.includes("next")) {
            hasNext = true;
          }
        });

        if (hasNext) page++;
      }
    }

    // Deduplicate by slug
    const seen = new Set<string>();
    return allResults.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  }

  private parseListingPage(
    $: cheerio.CheerioAPI,
    position: string,
    isGovernor: boolean,
  ): DiscoveredPerson[] {
    const people: DiscoveredPerson[] = [];

    $("li").each((_, el) => {
      const li = $(el);
      const personLink = li.find('a[href*="/person/"]').first();
      if (!personLink.length) return;

      const href = personLink.attr("href") || "";
      const slug = href.replace("/person/", "").replace(/\/$/, "").trim();
      if (!slug) return;

      const rawName = personLink
        .text()
        .replace(/more[….]+$/i, "")
        .trim();
      const fullName = rawName.replace(/\s+/g, " ").trim();
      if (!fullName) return;

      const allPlaceLinks = li.find('a[href*="/place/"]');
      let constituencyName = "Unknown";
      let countyName = "Unknown";

      if (isGovernor) {
        // Governor layout: "Governor for [County] (in [Province] Province)"
        const countyLink = li.find('a[href*="/place/"]').first();
        if (countyLink.length) {
          countyName = countyLink.text().trim();
          constituencyName = countyName; // For Governor, we store the county in constituencyName too
        }
      } else {
        // MP layout: "Member of NA for [Constituency] (in [County] County)"
        if (allPlaceLinks.length >= 1) {
          constituencyName = $(allPlaceLinks[0]).text().trim();
        }

        if (allPlaceLinks.length >= 2) {
          countyName = $(allPlaceLinks[1]).text().trim();
        }
      }

      // Party: /organisation/ link
      const partyLink = li.find('a[href*="/organisation/"]').first();
      const partyName = partyLink.text().trim() || "Independent";
      const partyHref = partyLink.attr("href") || "";
      const partySlug =
        partyHref.replace("/organisation/", "").replace(/\/$/, "").trim() || "independent";

      people.push({
        slug,
        fullName,
        constituencyName,
        countyName: countyName.replace(/\s+County$/i, ""),
        partyName,
        partySlug,
        position,
      });
    });

    return people;
  }

  private async syncPolitician(person: DiscoveredPerson): Promise<void> {
    const url = `${this.baseUrl}/person/${person.slug}/`;

    if (await this.store.isAlreadyProcessed(url)) {
      console.log(`Already synced: ${person.fullName}, skipping.`);
      return;
    }

    console.log(
      `Syncing: ${person.fullName} | ${person.position} | ${person.constituencyName}, ${person.countyName}`,
    );

    try {
      const partyId = await this.dbSync.upsertParty(person.partyName, person.partySlug);
      const constituencyId = await this.dbSync.upsertConstituency(
        person.constituencyName,
        person.countyName,
      );

      const politicianId = await this.dbSync.upsertPolitician({
        mzalendoId: person.slug,
        fullName: person.fullName,
        partyId,
        constituencyId,
        position: person.position,
      });

      await this.store.trackDocument({
        source: "Mzalendo",
        url,
        status: "parsed",
        politicianId,
      });
    } catch (error) {
      console.error(`Failed to sync ${person.fullName}:`, error);
      await this.store.trackDocument({
        source: "Mzalendo",
        url,
        status: "error",
        metadata: JSON.stringify({ error: String(error) }),
      });
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
