import { CogScraper, IebcScraper, MzalendoScraper } from "@repo/scrapper";

async function main() {
  console.log("-------------------");
  console.log("Scraper app started");
  console.log("-------------------");

  // Phase 1: Mzalendo MP sync
  console.log("Triggering Mzalendo sync...");
  try {
    await new MzalendoScraper().run();
    console.log("Mzalendo check completed.");
  } catch (error) {
    console.error("Mzalendo check failed:", error);
  }

  // Phase 2: COG Governor sync
  console.log("Triggering COG sync...");
  try {
    await new CogScraper().run();
    console.log("COG sync completed.");
  } catch (error) {
    console.error("COG sync failed:", error);
  }

  // Phase 3: IEBC Spending Limits sync
  console.log("Triggering IEBC sync...");
  try {
    await new IebcScraper().run();
    console.log("IEBC sync completed.");
  } catch (error) {
    console.error("IEBC sync failed:", error);
  }

  // --- Scheduled Jobs ---

  // Mzalendo: Weekly schedule
  // cron.schedule(scraperConfig.schedules.mzalendo, async () => {
  //   console.log("[CRON] Running Mzalendo scraper...");
  //   try {
  //     await new MzalendoScraper().run();
  //     console.log("[CRON] Mzalendo scraper completed.");
  //   } catch (error) {
  //     console.error("[CRON] Mzalendo scraper failed:", error);
  //   }
  // });

  // IEBC: Daily schedule
  // cron.schedule(scraperConfig.schedules.iebc, async () => {
  //   console.log("[CRON] Running IEBC scraper...");
  //   try {
  //     await new IebcScraper().run();
  //     console.log("[CRON] IEBC scraper completed.");
  //   } catch (error) {
  //     console.error("[CRON] IEBC scraper failed:", error);
  //   }
  // });

  // ORPP: Monthly schedule
  // cron.schedule(scraperConfig.schedules.orpp, async () => {
  //   console.log("[CRON] Running ORPP scraper...");
  //   try {
  //     await new OrppScraper().run();
  //     console.log("[CRON] ORPP scraper completed.");
  //   } catch (error) {
  //     console.error("[CRON] ORPP scraper failed:", error);
  //   }
  // });

  // Gazette: Daily schedule
  //   cron.schedule(scraperConfig.schedules.gazette, async () => {
  //     console.log("[CRON] Running Gazette scraper...");
  //     try {
  //       await new GazetteScraper().run();
  //       console.log("[CRON] Gazette scraper completed.");
  //     } catch (error) {
  //       console.error("[CRON] Gazette scraper failed:", error);
  //     }
  //   });

  //   console.log("All cron jobs scheduled.");
}

// Global error handling
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Run
main().catch((err) => {
  console.error("Fatal error in main loop:", err);
  process.exit(1);
});
