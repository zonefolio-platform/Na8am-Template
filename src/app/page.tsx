import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TemplateShell from "@/components/TemplateShell";
import { fetchTemplateData } from "@/libs/server-fetcher";
import { generateMetadataFromData } from "@/libs/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchTemplateData();
  if (!result.ok) return { title: "Portfolio" };
  return generateMetadataFromData(result.data);
}

export default async function Page() {
  const result = await fetchTemplateData();

  if (!result.ok) {
    // 404 → portfolio is unpublished/inactive → standard Next.js not-found page
    if (result.status === 404) notFound();

    // Any other error (network, misconfiguration) → inline message
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--brand-secondary)" }}
      >
        <p
          className="text-white text-lg"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          Portfolio temporarily unavailable
        </p>
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--brand-font-body)",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Please try again later.
        </p>
      </div>
    );
  }

  return <TemplateShell data={result.data} />;
}
