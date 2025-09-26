"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion, getAnimationVariants, getHoverVariants } from "@/hooks/useReducedMotion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const animationVariants = getAnimationVariants(prefersReducedMotion);
  const hoverVariants = getHoverVariants(prefersReducedMotion);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={animationVariants.initial}
          animate={animationVariants.animate}
          exit={animationVariants.exit}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
          whileHover={hoverVariants.hover}
          whileTap={hoverVariants.tap}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-target group will-change-transform"
          aria-label="Scroll to top"
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ y: 0 }}
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -2, 0] }}
            transition={prefersReducedMotion ? { duration: 0 } : { 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Back to top
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}