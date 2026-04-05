"use client";

import React from "react";
import { motion } from "motion/react";
import { isFilled } from "@/libs/is-filled";
import type { TemplateData } from "@/types/template";

type ContactProps = {
  data?: TemplateData["contact"];
};

interface ContactMethod {
  key: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: React.ReactNode;
}

export default function Contact({ data }: ContactProps) {
  if (!data) return null;

  const methods: ContactMethod[] = [
    ...(isFilled(data.email)
      ? [
          {
            key: "email",
            label: "Email",
            value: data.email!,
            href: `mailto:${data.email}`,
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            ),
          },
        ]
      : []),
    ...(isFilled(data.phone)
      ? [
          {
            key: "phone",
            label: "Phone",
            value: data.phone!,
            href: `tel:${data.phone}`,
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            ),
          },
        ]
      : []),
    ...(isFilled(data.whatsapp)
      ? [
          {
            key: "whatsapp",
            label: "WhatsApp",
            value: "Message on WhatsApp",
            href: `https://wa.me/${data.whatsapp!.replace(/\D/g, "")}`,
            external: true,
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109" />
              </svg>
            ),
          },
        ]
      : []),
    ...(isFilled(data.location)
      ? [
          {
            key: "location",
            label: "Location",
            value: data.location!,
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ),
          },
        ]
      : []),
  ];

  if (methods.length === 0) return null;

  return (
    <section
      className="w-full"
      style={{
        background: "var(--brand-secondary)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div className="max-w-[960px] mx-auto px-6 lg:px-8 py-20 space-y-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span
            className="pill-badge"
            style={{
              color: "var(--brand-primary)",
              background: "rgba(58,123,255,0.12)",
              border: "1px solid rgba(58,123,255,0.2)",
            }}
          >
            <span className="pill-badge-dot" />
            Get in touch
          </span>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--brand-font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              letterSpacing: "-0.8px",
            }}
          >
            Let&apos;s connect
          </h2>
        </motion.div>

        {/* ── Contact cards ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          {methods.map((method, i) => {
            const isLink = !!method.href;
            const commonStyle = {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            };

            const cardContent = (
              <div className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--brand-primary)" }}
                >
                  {method.icon}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-xs font-medium mb-0.5"
                    style={{
                      fontFamily: "var(--brand-font-body)",
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {method.label}
                  </p>
                  <p
                    className="text-sm font-medium truncate"
                    style={{
                      fontFamily: "var(--brand-font-body)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {method.value}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={method.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                {isLink ? (
                  <a
                    href={method.href}
                    {...(method.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center p-5 rounded-[14px] transition-all duration-200"
                    style={commonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(58,123,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div
                    className="flex items-center p-5 rounded-[14px]"
                    style={commonStyle}
                  >
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
