"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
import fetcher from "@/libs/fetcher";

// ==== Types ====
type SocialLink = {
  name: string;
  url: string;
};

type HeroData = {
  name: string;
  title: string;
  image?: string;
  socialLinks?: SocialLink[];
};

type AboutData = {
  bio: string;
};

type Project = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
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

  // Fallback sample data when API fails
  const fallbackData: TemplateData = {
    hero: {
      name: "Your Name",
      title: "Creative Professional & Problem Solver"
    },
    about: {
      bio: "Passionate creative professional with expertise in delivering exceptional results across various projects and collaborations."
    },
    projects: [
      {
        id: 1,
        name: "Featured Portfolio Project",
        description: "A comprehensive showcase of creative work featuring modern design principles and user-centered solutions.",
        technologies: ["Design", "Development", "Strategy", "Branding"],
        liveUrl: "https://example.com/project1",
        githubUrl: "https://github.com/example/project1"
      },
      {
        id: 2,
        name: "Creative Campaign",
        description: "An innovative marketing campaign that increased engagement and delivered measurable results.",
        technologies: ["Marketing", "Design", "Analytics"],
        liveUrl: "https://example.com/project2",
        githubUrl: "https://github.com/example/project2"
      },
      {
        id: 3,
        name: "Brand Identity System",
        description: "Complete brand identity design including logo, typography, and visual guidelines.",
        technologies: ["Branding", "Typography", "Visual Design"],
        liveUrl: "https://example.com/project3",
        githubUrl: "https://github.com/example/project3"
      },
      {
        id: 4,
        name: "Digital Experience",
        description: "User-focused digital experience design with emphasis on accessibility and performance.",
        technologies: ["UX/UI", "Accessibility", "Performance"],
        liveUrl: "https://example.com/project4",
        githubUrl: "https://github.com/example/project4"
      }
    ],
    contact: {
      email: "hello@example.com",
      phone: "+1 (555) 123-4567"
    }
  };

  // Use fallback data if API fails
  const templateData = isError ? fallbackData : data;

  if (!sections.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No sections configured.
      </div>
    );
  }

  return (
    <div className="">
      <Navigation sections={sections} />
      {sections.includes("hero") && (
        <section id="hero">
          <Hero data={templateData?.hero} />
        </section>
      )}
      {sections.includes("about") && (
        <section id="about">
          <About data={templateData?.about} />
        </section>
      )}
      {sections.includes("projects") && (
        <section id="projects">
          <Projects data={templateData?.projects} />
        </section>
      )}
      {sections.includes("contact") && (
        <section id="contact">
          <Contact data={templateData?.contact} />
        </section>
      )}
      <ScrollToTop />
    </div>
  );
}
