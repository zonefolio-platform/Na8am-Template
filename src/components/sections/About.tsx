'use client';
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
type AboutProps = {
  data?: {
    bio: string;
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
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Bio Section - Always visible if data exists */}
        {data.bio && (
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              <span className="text-sm uppercase tracking-wider text-gray-500 bg-gray-50 px-4 py-1 rounded-full inline-block">
                About Me
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                Professional Summary
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.bio}
              </p>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:block relative h-[400px] rounded-2xl overflow-hidden"
            >
              {data.image ? (
                <Image
                  src={data.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Skills Section - Only visible if skills exist */}
        {hasSkills && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(data.skills ?? []).map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 px-6 py-4 rounded-xl text-gray-600 font-medium text-center hover:bg-gray-100 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Experience Section - Only visible if experiences exist */}
        {experiences.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Work Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-8 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                  <div className="text-gray-600 mt-1">{exp.company}</div>
                  <div className="text-sm text-gray-500 mt-1">{exp.duration}</div>
                  {exp.description && (
                    <p className="text-gray-600 mt-4">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Education Section - Only visible if education exists */}
        {educations.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-8 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-gray-600 mt-1">{edu.university}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatEducationDate(edu.from, edu.to)}
                  </div>
                  {edu.GPA && (
                    <div className="text-sm text-gray-500 mt-1">
                      GPA: {edu.GPA}
                    </div>
                  )}
                  
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
