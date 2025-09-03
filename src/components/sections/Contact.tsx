import React from "react";
import { motion } from "motion/react";

type ContactProps = {
  data?: {
    email: string;
    phone?: string;
    location?: string;
    socialLinks?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
};

export default function Contact({ data }: ContactProps) {
  if (!data) return null;

  return (
    <motion.section
      id="contact"
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
              Get in Touch
            </span>

            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
              Let&apos;s Work Together
            </h2>

            <div className="space-y-4">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                <a
                  href={`mailto:${data.email}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {data.email}
                </a>
              </div>

              {data.phone && (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Phone</h3>
                  <a
                    href={`tel:${data.phone}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {data.phone}
                  </a>
                </div>
              )}

              {data.location && (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">{data.location}</p>
                </div>
              )}
            </div>

            {data.socialLinks && (
              <div className="flex items-center gap-4 pt-4">
                {Object.entries(data.socialLinks).map(([platform, url]) =>
                  url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <span className="capitalize text-gray-600">
                        {platform}
                      </span>
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Content - Contact Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 w-full lg:max-w-xl mb-12 lg:mb-0"
        >
          <form className="space-y-6 bg-gray-50 p-8 rounded-2xl">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
