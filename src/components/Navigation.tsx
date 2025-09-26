"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  sections: string[];
}

export default function Navigation({ sections }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-nav")) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        // Tab navigation within menu
        if (e.key === "Tab") {
          const focusableElements = document.querySelectorAll(
            '.mobile-nav button, .mobile-nav [href], .mobile-nav [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
      
      // Focus first menu item when opened
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.mobile-nav .menu-item') as HTMLElement;
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
      setIsOpen(false);
    }
  };

  const getSectionLabel = (section: string) => {
    const labels: Record<string, string> = {
      hero: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact"
    };
    return labels[section] || section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 relative">
            {/* Logo/Brand - Positioned absolutely on the left */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute left-0 flex items-center"
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Portfolio
              </button>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  whileHover={{ y: -2 }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === section
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {getSectionLabel(section)}
                  {activeSection === section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button - Positioned absolutely on the right */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button absolute right-0 block md:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors touch-target"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                  }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full origin-center transition-all duration-300"
                />
                <motion.span
                  animate={{
                    opacity: isOpen ? 0 : 1,
                  }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full mt-1.5 transition-all duration-300"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                  }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full mt-1.5 origin-center transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav fixed inset-0 z-50 block md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl"
              id="mobile-menu"
              role="menu"
              aria-label="Main navigation"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-6">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => scrollToSection(section)}
                      className={`menu-item w-full text-left px-6 py-4 text-lg font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset touch-target ${
                        activeSection === section
                          ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                          : "text-gray-700"
                      }`}
                      aria-current={activeSection === section ? "page" : undefined}
                      role="menuitem"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          activeSection === section ? "bg-blue-600" : "bg-gray-300"
                        }`} />
                        {getSectionLabel(section)}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Swipe right or tap outside to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
}