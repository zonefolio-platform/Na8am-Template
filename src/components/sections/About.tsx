// src/components/sections/About.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import TruncatedText from "@/components/TruncatedText";
import { isFilled } from "@/libs/is-filled";
import type { TemplateData } from "@/types/template";

type AboutProps = {
  data?: TemplateData["about"];
};

export default function About({ data }: AboutProps) {
  if (!data) return null;

  const validSkills = data.skills?.filter((s) => isFilled(s)) ?? [];
  const validExperience = (data.experience ?? []).filter(
    (e) =>
      isFilled(e.position) ||
      isFilled(e.company) ||
      isFilled(e.duration) ||
      isFilled(e.description)
  );
  const validEducation = (data.education ?? []).filter(
    (e) => isFilled(e.degree) && isFilled(e.university)
  );
  const hasBio = isFilled(data.bio);
  const hasImage = isFilled(data.image);

  if (
    !hasBio &&
    validSkills.length === 0 &&
    validExperience.length === 0 &&
    validEducation.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="w-full"
      style={{ background: "var(--brand-surface-alt)" }}
    >
      <div className="max-w-[960px] mx-auto px-6 lg:px-8 py-20 space-y-20">
        {/* ── Bio ── */}
        {hasBio && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`grid gap-12 ${
              hasImage ? "lg:grid-cols-2 lg:items-center" : ""
            }`}
          >
            <div className="space-y-6">
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                About me
              </span>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw, 2rem)",
                  letterSpacing: "-0.8px",
                  color: "var(--brand-text-primary)",
                }}
              >
                Professional summary
              </h2>
              <div
                style={{
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                  color: "var(--brand-text-secondary)",
                  fontFamily: "var(--brand-font-body)",
                }}
              >
                <TruncatedText
                  text={data.bio!}
                  limit={300}
                  className="text-base leading-relaxed"
                />
              </div>
            </div>

            {hasImage && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="hidden lg:block"
              >
                <div
                  className="relative h-[400px] overflow-hidden"
                  style={{ borderRadius: "14px" }}
                >
                  <Image
                    src={data.image!}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── Skills ── */}
        {validSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                Skills &amp; expertise
              </span>
              <h2
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                  letterSpacing: "-0.6px",
                  color: "var(--brand-text-primary)",
                }}
              >
                Technical proficiency
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {validSkills.map((skill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{
                    fontFamily: "var(--brand-font-body)",
                    color: "var(--brand-primary)",
                    background: "rgba(58,123,255,0.06)",
                    border: "1px solid rgba(58,123,255,0.3)",
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Experience ── */}
        {validExperience.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                Professional journey
              </span>
              <h2
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                  letterSpacing: "-0.6px",
                  color: "var(--brand-text-primary)",
                }}
              >
                Work experience
              </h2>
            </div>
            <div className="space-y-4">
              {validExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="p-6 bg-white"
                  style={{
                    borderRadius: "14px",
                    border: "1px solid var(--brand-border)",
                    borderLeft: "3px solid var(--brand-primary)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      {isFilled(exp.position) && (
                        <h3
                          className="text-base font-semibold"
                          style={{
                            fontFamily: "var(--brand-font-heading)",
                            color: "var(--brand-text-primary)",
                          }}
                        >
                          {exp.position}
                        </h3>
                      )}
                      {isFilled(exp.company) && (
                        <p
                          className="text-sm font-medium mt-0.5"
                          style={{
                            color: "var(--brand-primary)",
                            fontFamily: "var(--brand-font-body)",
                          }}
                        >
                          {exp.company}
                        </p>
                      )}
                    </div>
                    {isFilled(exp.duration) && (
                      <span
                        className="text-xs px-3 py-1 rounded-full shrink-0"
                        style={{
                          fontFamily: "var(--brand-font-body)",
                          color: "var(--brand-text-secondary)",
                          background: "var(--brand-background)",
                          border: "1px solid var(--brand-border)",
                        }}
                      >
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {isFilled(exp.description) && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "var(--brand-font-body)",
                        color: "var(--brand-text-secondary)",
                      }}
                    >
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Education ── */}
        {validEducation.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="pill-badge">
                <span className="pill-badge-dot" />
                Academic background
              </span>
              <h2
                style={{
                  fontFamily: "var(--brand-font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                  letterSpacing: "-0.6px",
                  color: "var(--brand-text-primary)",
                }}
              >
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {validEducation.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="p-6 bg-white"
                  style={{
                    borderRadius: "14px",
                    border: "1px solid var(--brand-border)",
                    borderLeft: "3px solid var(--brand-primary)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3
                        className="text-base font-semibold"
                        style={{
                          fontFamily: "var(--brand-font-heading)",
                          color: "var(--brand-text-primary)",
                        }}
                      >
                        {edu.degree}
                      </h3>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{
                          color: "var(--brand-primary)",
                          fontFamily: "var(--brand-font-body)",
                        }}
                      >
                        {edu.university}
                      </p>
                      {isFilled(edu.GPA) && (
                        <p
                          className="text-xs mt-1"
                          style={{
                            color: "var(--brand-text-secondary)",
                            fontFamily: "var(--brand-font-body)",
                          }}
                        >
                          GPA: {edu.GPA}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full shrink-0 self-start"
                      style={{
                        fontFamily: "var(--brand-font-body)",
                        color: "var(--brand-text-secondary)",
                        background: "var(--brand-background)",
                        border: "1px solid var(--brand-border)",
                      }}
                    >
                      {edu.from} – {edu.to}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
