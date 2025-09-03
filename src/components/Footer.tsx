"use client"
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Powered by</span>
            <Link 
              href="https://zonefolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Zonefolio
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}