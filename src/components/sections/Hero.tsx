import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

type SocialLink = {
  name: string;
  url: string;
};

type HeroProps = {
  data?: {
    title: string;
    subtitle: string;
    image?: string;
    socialLinks?: SocialLink[];
  };
};

export default function Hero({ data }: HeroProps) {
  if (!data) return null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 w-full lg:max-w-2xl space-y-8 lg:pr-12"
        >
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-gray-500 bg-white px-4 py-1 rounded-full inline-block shadow-sm">
              Welcome to my portfolio
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
              {data.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {data.subtitle}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
              >
                Get in touch
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-lg transition-colors"
              >
                View my work →
              </button>
            </div>
          </div>

          {/* Dynamic Social Links */}
          {data.socialLinks && data.socialLinks.length > 0 && (
            <div className="flex items-center gap-6 pt-8">
              {data.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 w-full lg:max-w-xl mt-12 lg:mt-0"
        >
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {data.image ? (
              <Image
                src={data.image}
                alt="Profile"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
