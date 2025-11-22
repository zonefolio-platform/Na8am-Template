"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
import type { TemplateData } from "@/libs/server-fetcher";

type TemplateShellProps = {
  data: TemplateData;
};

// Fallback data when no data is provided
const fallbackData: TemplateData = {
  hero: {
    name: "Your Name",
    title: "Creative Professional & Problem Solver",
  },
  about: {
    bio: "Passionate creative professional with expertise in delivering exceptional results across various projects and collaborations.",
  },
  projects: [
    {
      id: 1,
      name: "Featured Portfolio Project",
      description:
        "A comprehensive showcase of creative work featuring modern design principles and user-centered solutions.",
      technologies: ["Design", "Development", "Strategy", "Branding"],
      liveUrl: "https://example.com/project1",
      githubUrl: "https://github.com/example/project1",
    },
    {
      id: 2,
      name: "Creative Campaign",
      description:
        "An innovative marketing campaign that increased engagement and delivered measurable results.",
      technologies: ["Marketing", "Design", "Analytics"],
      liveUrl: "https://example.com/project2",
      githubUrl: "https://github.com/example/project2",
    },
    {
      id: 3,
      name: "Brand Identity System",
      description:
        "Complete brand identity design including logo, typography, and visual guidelines.",
      technologies: ["Branding", "Typography", "Visual Design"],
      liveUrl: "https://example.com/project3",
      githubUrl: "https://github.com/example/project3",
    },
    {
      id: 4,
      name: "Digital Experience",
      description:
        "User-focused digital experience design with emphasis on accessibility and performance.",
      technologies: ["UX/UI", "Accessibility", "Performance"],
      liveUrl: "https://example.com/project4",
      githubUrl: "https://github.com/example/project4",
    },
  ],
  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
  },
};

export default function TemplateShell({ data }: TemplateShellProps) {
  const [sections, setSections] = useState<string[]>([]);

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

  // Use provided data or fallback
  const templateData = Object.keys(data).length > 0 ? data : fallbackData;

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
