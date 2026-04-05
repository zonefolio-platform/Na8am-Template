// src/components/Navigation.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { isFilled } from "@/libs/is-filled";

interface NavigationProps {
  sections: string[];
  heroName?: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  projects: "Projects",
  contact: "Contact",
};

export default function Navigation({ sections, heroName }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 80;
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  const displayName = isFilled(heroName) ? heroName! : "Portfolio";

  return (
    <>
      {/* ── Desktop & Mobile bar ── */}
      <nav
        className="sticky top-0 z-40 w-full h-14 flex items-center px-6 lg:px-12"
        style={{
          background: "var(--brand-secondary)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 1px 8px rgba(13,17,23,0.06)",
        }}
      >
        {/* Logo — left */}
        <div className="flex-1">
          <button
            onClick={() => scrollTo("hero")}
            className="text-white text-[15px] tracking-[-0.3px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--brand-font-heading)", fontWeight: 700 }}
          >
            {displayName}
          </button>
        </div>

        {/* Desktop links — centered */}
        <div className="hidden md:flex items-center gap-8">
          {sections
            .filter((s) => s !== "hero")
            .map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="relative text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "var(--brand-font-body)",
                  color:
                    activeSection === section
                      ? "var(--brand-primary)"
                      : "rgba(255,255,255,0.7)",
                }}
              >
                {SECTION_LABELS[section] ?? section}
                {activeSection === section && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "var(--brand-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
        </div>

        {/* Right slot — hamburger on mobile, spacer on desktop */}
        <div className="flex-1 flex justify-end">
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
              className="w-5 h-0.5 bg-white rounded-full block origin-center"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-5 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
              className="w-5 h-0.5 bg-white rounded-full block origin-center"
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "var(--brand-secondary)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-6 text-white opacity-60 hover:opacity-100 transition-opacity touch-target"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {sections.map((section, i) => (
              <motion.button
                key={section}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => scrollTo(section)}
                className="text-2xl font-semibold transition-colors"
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  color:
                    activeSection === section
                      ? "var(--brand-primary)"
                      : "rgba(255,255,255,0.85)",
                }}
              >
                {SECTION_LABELS[section] ?? section}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
