"use client";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Navigation from "./Navigation";
import { isFilled } from "@/libs/is-filled";
import type { TemplateData } from "@/types/template";

type TemplateShellProps = {
  data: TemplateData;
};

export default function TemplateShell({ data }: TemplateShellProps) {
  const templateData = data;

  // Section visibility — only render sections that have data
  const showHero =
    isFilled(templateData.hero?.name) || isFilled(templateData.hero?.title);
  const showAbout =
    isFilled(templateData.about?.bio) ||
    (templateData.about?.skills ?? []).filter(isFilled).length > 0 ||
    (templateData.about?.experience ?? []).length > 0 ||
    (templateData.about?.education ?? []).length > 0;
  const showProjects =
    (templateData.projects?.projects ?? []).filter((p) =>
      isFilled(p.name)
    ).length > 0;
  const showContact =
    isFilled(templateData.contact?.email) ||
    isFilled(templateData.contact?.phone) ||
    isFilled(templateData.contact?.whatsapp) ||
    isFilled(templateData.contact?.location);

  // Only include sections that have data for the nav
  const sections = [
    showHero && "hero",
    showAbout && "about",
    showProjects && "projects",
    showContact && "contact",
  ].filter(Boolean) as string[];

  return (
    <div>
      <Navigation
        sections={sections}
        heroName={templateData.hero?.name}
      />

      {showHero && (
        <section id="hero">
          <Hero data={templateData.hero} />
        </section>
      )}

      {showAbout && (
        <section id="about">
          <About data={templateData.about} />
        </section>
      )}

      {showProjects && (
        <section id="projects">
          <Projects data={templateData.projects} />
        </section>
      )}

      {showContact && (
        <section id="contact">
          <Contact data={templateData.contact} />
        </section>
      )}

      {/* ZoneFolio badge — always visible on free tier */}
      <a
        href="https://zonefolio.app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Made with ZoneFolio"
        className="fixed z-50 flex items-center gap-3 px-4 py-3 rounded-full transition-opacity duration-200 hover:opacity-80"
        style={{
          bottom: "24px",
          right: "24px",
          background: "var(--brand-secondary)",
          boxShadow: "0 4px 20px rgba(13,17,23,0.35)",
        }}
      >
        <span
          className="flex items-center justify-center w-9 h-9 text-white text-sm font-extrabold rounded-xl"
          style={{
            background: "var(--brand-primary)",
            fontFamily: "var(--brand-font-heading)",
            letterSpacing: "-0.5px",
          }}
        >
          Zf
        </span>
        <span
          className="text-white text-sm font-medium pr-1"
          style={{ fontFamily: "var(--brand-font-body)" }}
        >
          Made with ZoneFolio
        </span>
      </a>
    </div>
  );
}
