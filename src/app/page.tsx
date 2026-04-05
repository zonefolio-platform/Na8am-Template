import type { Metadata } from "next";
import TemplateShell from "@/components/TemplateShell";
import { fetchTemplateData } from "@/libs/server-fetcher";
import { generateMetadataFromData } from "@/libs/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchTemplateData();
  return generateMetadataFromData(data);
}

export default async function Page() {
  const data = await fetchTemplateData();
  return <TemplateShell data={data} />;
}
