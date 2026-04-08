// src/components/sections/Hero.tsx
"use client";

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
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                className="text-white leading-[1.05]"
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  letterSpacing: "-2px",
                  overflowWrap: "break-word",
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
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                  priority
                  loading="eager"
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
    case "instagram":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "behance":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.16 1.36-.49.37-1.06.64-1.71.83-.64.18-1.32.27-2.03.27H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.43-.3.695-.62.795-.96h2.84c-.453 1.408-1.15 2.413-2.083 3.015-.932.6-2.06.9-3.37.9-0.915 0-1.74-.146-2.47-.44-.73-.29-1.353-.71-1.867-1.25-.51-.54-.905-1.19-1.18-1.94-.278-.75-.415-1.58-.415-2.48 0-.87.14-1.67.42-2.42.28-.74.68-1.39 1.19-1.93.51-.55 1.13-.975 1.86-1.28.73-.31 1.54-.46 2.43-.46.99 0 1.86.19 2.59.57.73.38 1.33.89 1.8 1.54.47.65.81 1.39 1.02 2.23.21.84.29 1.72.25 2.66H15.44c0 1.00.36 1.93.99 2.37l.51-.33zM9.5 9.5c-.283 0-.567.025-.85.075-.167.033-.325.088-.475.162-.15.075-.275.182-.375.32-.1.137-.15.33-.15.575 0 .23.04.42.12.57.08.15.197.275.35.375.15.1.335.175.55.225.215.05.458.075.725.075h2.65c.267 0 .483-.025.65-.075.167-.05.3-.137.4-.262.1-.127.175-.3.225-.52.05-.22.075-.5.075-.84V9.5H9.5zm7.99 1.24c-.27-.263-.645-.395-1.12-.395-.31 0-.575.05-.79.15-.215.1-.39.23-.525.39-.135.16-.23.34-.285.54-.055.2-.09.395-.1.585h3.32c-.04-.47-.23-.85-.5-1.27zM8.98 13.21h-3.48v2.7h3.48c.26 0 .5-.027.72-.082.22-.055.41-.143.57-.262.16-.12.285-.278.375-.475.09-.197.135-.44.135-.728 0-.55-.165-.953-.495-1.21-.33-.255-.785-.382-1.305-.382v-.462z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.36 1.73 1.35 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.396 3.045-5.157 8.332-6.82.138-.045.276-.088.415-.127-.265-.6-.537-1.2-.811-1.79-4.53 1.24-9.68 1.26-10.09 1.26-.043 0-.085 0-.127-.002-.002.133-.01.266-.01.4 0 2.54.87 4.865 2.283 6.74zm-2.42-8.955c.42.008 4.853.086 9.484-1.249-1.698-3.018-3.51-5.558-3.805-5.97-2.91 1.37-4.944 4.093-5.68 7.22zm7.64-9.05c.28.404 2.12 2.953 3.797 6.01 3.626-1.358 5.16-3.415 5.348-3.67C18.13 3.666 15.2 2.427 12 2.427c-.63 0-1.248.055-1.848.16z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case "vimeo":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z" />
        </svg>
      );
    case "medium":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
}
