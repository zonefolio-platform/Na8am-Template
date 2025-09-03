import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

type AboutProps = {
  data?: {
    bio: string;
    skills?: string[];
    image?: string;
    experience?: {
      years: string;
      companies: string;
      projects: string;
    };
  };
};

export default function About({ data }: AboutProps) {
  if (!data) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-white"
    >
      <div className="w-full h-full flex flex-col lg:flex-row-reverse items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Left Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 w-full lg:max-w-2xl space-y-8 lg:pl-12"
        >
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-gray-500 bg-gray-50 px-4 py-1 rounded-full inline-block">
              About Me
            </span>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {data.bio}
            </p>

            {/* Skills Grid */}
            {data.skills && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 px-4 py-3 rounded-lg text-gray-600"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}

            {/* Experience Stats */}
            {data.experience && (
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {data.experience.years}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Years of Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {data.experience.companies}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Companies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {data.experience.projects}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Projects Completed
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Image - Hidden on mobile */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden lg:block flex-1 w-full lg:max-w-xl mb-12 lg:mb-0"
        >
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
            {data.image ? (
              <Image
                src={data.image}
                alt="About Me"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
