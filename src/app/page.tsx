import React from "react";
import { Metadata } from "next";
import TemplateShell from "@/components/TemplateShell";
import { fetchTemplateData } from "@/libs/server-fetcher";
import { generateMetadataFromData } from "@/libs/metadata";

/**
 * Generate dynamic metadata from API data
 */
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchTemplateData();
  return generateMetadataFromData(data);
}

export default async function Page() {
  // Fetch data server-side
  const data = await fetchTemplateData();

  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-subtle">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TemplateShell data={data} />
      </div>
    </div>
  );
}
