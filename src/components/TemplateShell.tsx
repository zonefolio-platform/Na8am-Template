"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import fetcher from "@/libs/fetcher";

// ==== Types ====
type HeroData = {
  title: string;
  subtitle: string;
};

type AboutData = {
  bio: string;
};

type Project = {
  id: number;
  name: string;
  description?: string;
};

type ContactData = {
  email: string;
  phone?: string;
};

type TemplateData = {
  hero?: HeroData;
  about?: AboutData;
  projects?: Project[];
  contact?: ContactData;
};

// ==== Fetch function ====
async function fetchTemplateData(apiUrl: string): Promise<TemplateData> {
  if (!apiUrl) return {};
  return await fetcher(apiUrl);
}

export default function TemplateShell() {
  const [sections, setSections] = useState<string[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DATA_API_URL || "";

  // Parse sections once on mount
  useEffect(() => {
    try {
      const raw = process.env.NEXT_PUBLIC_SECTIONS;
      const arr = raw
        ? JSON.parse(raw)
        : ["hero", "about", "projects", "contact"];
      setSections(arr);
    } catch {
      setSections(["hero", "about", "projects", "contact"]);
    }
  }, []);

  // Query with React Query
  const { data, isLoading, isError, error } = useQuery<TemplateData>({
    queryKey: ["templateData", apiUrl],
    queryFn: () => fetchTemplateData(apiUrl),
    enabled: !!apiUrl, // only run if apiUrl exists
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-4 border-t-transparent rounded-full border-primary"
        ></motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load data: {(error as Error).message}
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No sections configured.
      </div>
    );
  }

  return (
    <div className="">
      {sections.includes("hero") && <Hero data={data?.hero} />}
      {sections.includes("about") && <About data={data?.about} />}
      {sections.includes("projects") && <Projects data={data?.projects} />}
      {sections.includes("contact") && <Contact data={data?.contact} />}
    
    </div>
  );
}
