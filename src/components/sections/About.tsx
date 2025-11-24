"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import TruncatedText from "@/components/TruncatedText";
type AboutProps = {
  data?: {
    bio?: string;
    skills?: string[];
    image?: string;
    experience?: Array<{
      position: string;
      company: string;
      duration: string;
      description?: string;
    }>;
    education?: Array<{
      degree: string;
      university: string;
      from: string;
      to: string;
      GPA?: string;
    }>;
  };
};

export default function About({ data }: AboutProps) {
  if (!data) return null;

  const experiences = Array.isArray(data.experience) ? data.experience : [];
  const educations = Array.isArray(data.education) ? data.education : [];
  const hasSkills = data.skills && data.skills.length > 0;

  const formatEducationDate = (from: string, to: string) => {
    return `${from} - ${to}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50/50 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-50 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Bio Section - Always visible if data exists */}
        {data.bio && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-24">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                About Me
              </motion.span>
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                Professional Summary
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <TruncatedText
                  text={data.bio}
                  limit={200}
                  className="text-base sm:text-lg text-gray-600 leading-relaxed font-light max-w-2xl break-all w-full"
                />
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full opacity-40"></div>

                {data.image ? (
                  <Image
                    src={data.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Profile Image</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Skills Section - Only visible if skills exist */}
        {hasSkills && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 sm:mb-24"
          >
            <div className="text-center mb-12">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Skills & Expertise
              </motion.span>
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6"
              >
                Technical Proficiency
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {(data.skills ?? []).map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="group card p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Experience Section - Only visible if experiences exist */}
        {experiences.length > 0 &&
          (() => {
            // Check if all fields in all experiences are null
            const allFieldsNull = experiences.every(
              (exp) =>
                !exp.position &&
                !exp.company &&
                !exp.duration &&
                !exp.description
            );

            return (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-12 sm:mb-24"
              >
                <div className="text-center mb-12">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Professional Journey
                  </motion.span>
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6"
                  >
                    Work Experience
                  </motion.h2>
                </div>

                {allFieldsNull ? (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="card p-8 text-center max-w-2xl mx-auto"
                  >
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Currently building a diverse portfolio of professional
                      experiences. Open to exciting opportunities and
                      collaborations that drive innovation and growth.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    {experiences.map((exp, index) => {
                      // Check if this specific experience has at least one non-null field
                      const hasValidData =
                        exp.position ||
                        exp.company ||
                        exp.duration ||
                        exp.description;

                      if (!hasValidData) return null;

                      return (
                        <motion.div
                          key={index}
                          initial={{ x: -30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                          className="group relative"
                        >
                          <div className="card p-6 sm:p-8 border-l-4 border-blue-500 hover:border-blue-600 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                              <div>
                                {exp.position && (
                                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {exp.position}
                                  </h3>
                                )}
                                {exp.company && (
                                  <p className="text-blue-600 font-semibold text-lg">
                                    {exp.company}
                                  </p>
                                )}
                              </div>
                              {exp.duration && (
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full mt-2 sm:mt-0">
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
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {exp.duration}
                                </span>
                              )}
                            </div>
                            {exp.description && (
                              <p className="text-gray-600 leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })()}

        {/* Education Section - Only visible if education exists */}
        {educations.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12 sm:mb-24"
          >
            <div className="text-center mb-12">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-100"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Academic Background
              </motion.span>
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6"
              >
                Education
              </motion.h2>
            </div>
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="card p-6 sm:p-8 border-l-4 border-purple-500 hover:border-purple-600 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-purple-600 font-semibold text-lg">
                          {edu.university}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full mt-2 sm:mt-0">
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
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                        {formatEducationDate(edu.from, edu.to)}
                      </span>
                    </div>
                    {edu.GPA && (
                      <div className="text-sm text-gray-500 mt-2">
                        GPA: {edu.GPA}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
