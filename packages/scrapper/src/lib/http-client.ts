import type { AxiosInstance } from "axios";
import axios from "axios";
import { scraperConfig } from "@/config";

/**
 * HTTP Client Wrapper
 *
 * Purpose: Centralized axios instance with retry logic and standard headers.
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "User-Agent": "Hakiki-Scraper/1.0 (+https://hakiki.ke)",
      },
    });
  }

  async get(url: string, params?: Record<string, string | number | boolean>) {
    let attempts = 0;
    while (attempts < scraperConfig.retries) {
      try {
        return await this.axiosInstance.get(url, { params });
      } catch (error) {
        attempts++;
        if (attempts >= scraperConfig.retries) throw error;
        await new Promise((resolve) => setTimeout(resolve, scraperConfig.retryDelay));
      }
    }
  }
}
