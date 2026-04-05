import axios from "axios";
import { readFile } from "fs/promises";
import { join } from "path";
import type { TemplateData } from "@/types/template";

/**
 * Fetch template data server-side.
 * Supports local file paths (e.g. /mock-portfolio-api-response.json → public/)
 * and external URLs. Returns {} on error so the app renders with fallback data.
 */
export async function fetchTemplateData(): Promise<TemplateData> {
  const apiUrl = process.env.NEXT_PUBLIC_DATA_API_URL;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_DATA_API_URL not set, returning empty data");
    return {};
  }

  try {
    if (apiUrl.startsWith("/")) {
      const filePath = join(process.cwd(), "public", apiUrl);
      const fileContent = await readFile(filePath, "utf-8");
      return JSON.parse(fileContent) as TemplateData;
    }

    const response = await axios.get<TemplateData>(apiUrl, { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch template data:", error);
    return {};
  }
}

export type { TemplateData };
