// src/components/sections/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { isFilled } from "@/libs/is-filled";
import type { TemplateData } from "@/types/template";

type HeroProps = {
  data?: TemplateData["hero"];
};

export default function Hero({ data }: HeroProps) {
  if (!data) return null;
  if (!isFilled(data.name) && !isFilled(data.title)) return null;

  const validLinks =
    data.socialLinks?.filter((l) => isFilled(l.url) && isFilled(l.platform)) ??
    [];
  const hasImage = isFilled(data.image);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen flex items-center"
      style={{ background: "var(--brand-secondary)" }}
    >
      <div className="w-full max-w-[960px] mx-auto px-6 lg:px-8 py-20">
        <div
          className={`flex flex-col gap-12 ${
            hasImage ? "lg:flex-row lg:items-center lg:justify-between" : ""
          }`}
        >
          {/* ── Left content ── */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`space-y-8 ${hasImage ? "lg:flex-1 lg:max-w-xl" : "max-w-2xl"}`}
          >
            {/* Pill badge — shows title as role indicator */}
            {isFilled(data.title) && (
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="pill-badge"
              >
                <span className="pill-badge-dot" />
                {data.title}
              </motion.span>
            )}

            {/* Name */}
            {isFilled(data.name) && (
              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-white leading-[1.0]"
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  letterSpacing: "-2px",
                }}
              >
                {data.name}
              </motion.h1>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-medium transition-all duration-200"
                style={{
                  background: "var(--brand-primary)",
                  fontFamily: "var(--brand-font-body)",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--brand-primary-dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--brand-primary)")
                }
              >
                Get in touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  border: "1px solid var(--brand-border-mid)",
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "var(--brand-font-body)",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-border-mid)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
              >
                View my work
              </Link>
            </motion.div>

            {/* Social links — icon only, aria-label for accessibility */}
            {validLinks.length > 0 && (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex items-center gap-5 pt-2"
              >
                {validLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--brand-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: profile image — only if filled ── */}
          {hasImage && (
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:flex-1 lg:max-w-[400px]"
            >
              <div
                className="relative w-full aspect-square overflow-hidden"
                style={{
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={data.image!}
                  alt={data.name ?? "Profile photo"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "github":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      );
  }
}
