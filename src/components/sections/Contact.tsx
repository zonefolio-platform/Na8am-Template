'use client';
import React from "react";
import { motion } from "motion/react";

type ContactProps = {
  data?: {
    email: string;
    phone?: string;
    location?: string;
    whatsapp?: string;
    socialLinks?: Record<string, string>;
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-gray-500 bg-gray-50 px-4 py-1 rounded-full inline-block">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mt-6">
            Let&apos;s Connect
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Contact */}
          <motion.a
            href={`mailto:${data.email}`}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{data.email}</p>
              </div>
            </div>
          </motion.a>

          {/* Phone Contact */}
          {data.phone && (
            <motion.a
              href={`tel:${data.phone}`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{data.phone}</p>
                </div>
              </div>
            </motion.a>
          )}

          {/* WhatsApp Contact */}
          {data.whatsapp && (
            <motion.a
              href={`https://wa.me/${data.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Message on WhatsApp</p>
                </div>
              </div>
            </motion.a>
          )}

          {/* Location */}
          {data.location && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">{data.location}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Social Links */}
        {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6"
          >
            {Object.entries(data.socialLinks).map(([platform, url]) => (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="capitalize text-gray-600">{platform}</span>
                </a>
              )
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
