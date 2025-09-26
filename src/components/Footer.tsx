"use client"
import { motion } from "motion/react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-600 font-medium">
              © {currentYear} All rights reserved.
            </p>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <p className="text-sm text-gray-500">
              Crafted with passion and precision
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Powered by</span>
            <Link 
              href="https://zonefolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Zonefolio
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Scroll to top button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </motion.footer>
  );
}