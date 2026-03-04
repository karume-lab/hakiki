/**
 * Scraper Configuration
 */
export const scraperConfig = {
  // Spending limits per position (Example KES)
  spendingLimits: {
    MP: 33400000,
    Governor: 123000000,
    Senator: 87000000,
  },

  // Thresholds for donor disclosure
  disclosureThreshold: 5000000,

  // Schedules (Cron strings)
  schedules: {
    mzalendo: "0 0 * * 0", // Weekly
    iebc: "0 0 * * *", // Daily
    orpp: "0 0 1 * *", // Monthly
    gazette: "0 12 * * *", // Daily at noon
  },

  // Retry logic settings
  retries: 3,
  retryDelay: 5000,
};
