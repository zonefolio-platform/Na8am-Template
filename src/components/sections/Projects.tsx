// src/components/sections/Projects.tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import TruncatedText from "@/components/TruncatedText";
import { isFilled } from "@/libs/is-filled";
import type { TemplateData } from "@/types/template";

type ProjectsProps = {
  data?: TemplateData["projects"];
};

export default function Projects({ data }: ProjectsProps) {
  const validProjects = (data?.projects ?? []).filter((p) => isFilled(p.name));
  if (validProjects.length === 0) return null;

  const featured = validProjects[0];
  const rest = validProjects.slice(1);
  const featuredHasImage = isFilled(featured.image);

  return (
    <section
      className="w-full"
      style={{ background: "var(--brand-background)" }}
    >
      <div className="max-w-240 mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="pill-badge">
            <span className="pill-badge-dot" />
            Portfolio showcase
          </span>
          <h2
            className="w-max"
            style={{
              fontFamily: "var(--brand-font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              letterSpacing: "-0.8px",
              color: "var(--brand-text-primary)",
            }}
          >
            Featured work
          </h2>
        </motion.div>

        {/* ── Featured project ── */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 lg:p-8"
          style={{
            background: "var(--brand-surface)",
            borderRadius: "14px",
            border: "1px solid var(--brand-border)",
          }}
        >
          <div
            className={`flex flex-col gap-8 ${
              featuredHasImage ? "lg:flex-row lg:items-center" : ""
            }`}
          >
            {/* Text — full width when no image */}
            <div className={`flex flex-col items-start gap-5 ${featuredHasImage ? "lg:flex-1" : "w-full"}`}>
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                Featured work
              </span>
              <h3
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  letterSpacing: "-0.6px",
                  color: "var(--brand-text-primary)",
                }}
              >
                {featured.name}
              </h3>
              {isFilled(featured.description) && (
                <div
                  style={{
                    color: "var(--brand-text-secondary)",
                    fontFamily: "var(--brand-font-body)",
                  }}
                >
                  <TruncatedText
                    text={featured.description!}
                    lines={featuredHasImage ? 4 : 6}
                    className="text-base leading-relaxed"
                  />
                </div>
              )}
              {isFilled(featured.technologies) && (
                <div className="flex flex-wrap gap-2">
                  {featured.technologies!.filter(isFilled).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        fontFamily: "var(--brand-font-body)",
                        color: "var(--brand-primary)",
                        background: "var(--brand-primary-subtle)",
                        border: "1px solid var(--brand-primary-border-subtle)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {isFilled(featured.liveUrl) && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-200"
                    style={{ fontFamily: "var(--brand-font-body)" }}
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View live
                  </a>
                )}
                {isFilled(featured.githubUrl) && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{
                      fontFamily: "var(--brand-font-body)",
                      color: "var(--brand-text-primary)",
                      border: "1px solid var(--brand-border-mid)",
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Source
                  </a>
                )}
              </div>
            </div>

            {/* Image — only if filled */}
            {featuredHasImage && (
              <div className="lg:flex-1 lg:max-w-105">
                <div
                  className="relative w-full aspect-video overflow-hidden"
                  style={{ borderRadius: "10px" }}
                >
                  <Image
                    src={featured.image!}
                    alt={featured.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.article>

        {/* ── Additional projects grid ── */}
        {rest.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                Additional work
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project, i) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="flex flex-col overflow-hidden"
                  style={{
                    background: "var(--brand-surface)",
                    borderRadius: "14px",
                    border: "1px solid var(--brand-border)",
                  }}
                >
                  {/* Image */}
                  {isFilled(project.image) && (
                    <div className="relative w-full aspect-video overflow-hidden shrink-0">
                      <Image
                        src={project.image!}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content: title + description grow, tech + links fixed at bottom */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Top — grows */}
                    <div className="flex-1 space-y-2 mb-4">
                      <h3
                        className="text-base font-semibold"
                        style={{
                          fontFamily: "var(--brand-font-heading)",
                          color: "var(--brand-text-primary)",
                        }}
                      >
                        {project.name}
                      </h3>
                      {isFilled(project.description) && (
                        <div
                          style={{
                            color: "var(--brand-text-secondary)",
                            fontFamily: "var(--brand-font-body)",
                          }}
                        >
                          <TruncatedText
                            text={project.description!}
                            lines={3}
                            className="text-sm leading-relaxed"
                          />
                        </div>
                      )}
                    </div>

                    {/* Bottom — always pinned */}
                    <div className="space-y-3">
                      {isFilled(project.technologies) && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies!.filter(isFilled).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs rounded-full"
                              style={{
                                fontFamily: "var(--brand-font-body)",
                                color: "var(--brand-text-secondary)",
                                background: "var(--brand-background)",
                                border: "1px solid var(--brand-border)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {(isFilled(project.liveUrl) || isFilled(project.githubUrl)) && (
                        <div className="flex gap-3">
                          {isFilled(project.liveUrl) && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-cta-primary flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors duration-200"
                              style={{ fontFamily: "var(--brand-font-body)" }}
                            >
                              View
                            </a>
                          )}
                          {isFilled(project.githubUrl) && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-cta-ghost flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
                              style={{
                                fontFamily: "var(--brand-font-body)",
                                color: "var(--brand-text-primary)",
                                border: "1px solid var(--brand-border-mid)",
                              }}
                            >
                              Source
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
