import { cache } from "react";
import type { TemplateData } from "@/types/template";

export type FetchResult =
  | { ok: true; data: TemplateData }
  | { ok: false; status: number };

async function _fetchTemplateData(): Promise<FetchResult> {
  const apiUrl = process.env.NEXT_PUBLIC_DATA_API_URL;

  if (!apiUrl) {
    console.warn("[na8am] NEXT_PUBLIC_DATA_API_URL is not set");
    return { ok: false, status: 0 };
  }

  // Dev: read from a local public/ file (e.g. /fakeAPI.json)
  if (apiUrl.startsWith("/")) {
    try {
      const { readFile } = await import("fs/promises");
      const { join } = await import("path");
      const content = await readFile(
        join(process.cwd(), "public", apiUrl),
        "utf-8"
      );
      return { ok: true, data: JSON.parse(content) as TemplateData };
    } catch {
      console.error("[na8am] local file not found:", apiUrl);
      return { ok: false, status: 404 };
    }
  }

  // Production: always fetch fresh — never bake at build time
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`[na8am] API returned ${res.status} for ${apiUrl}`);
      return { ok: false, status: res.status };
    }

    const data = (await res.json()) as TemplateData;
    return { ok: true, data };
  } catch (err) {
    console.error("[na8am] fetch failed:", err);
    return { ok: false, status: 0 };
  }
}

// React cache() deduplicates calls within a single render pass
// so generateMetadata() and Page() share one fetch, not two
export const fetchTemplateData = cache(_fetchTemplateData);

export type { TemplateData };
