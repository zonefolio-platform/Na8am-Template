"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TruncatedTextProps = {
  text: string;
  limit: number;
  className?: string;
  showMoreClassName?: string;
};

export default function TruncatedText({
  text,
  limit,
  className = "",
  showMoreClassName = "",
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > limit;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  const displayText = isExpanded ? text : text.slice(0, limit) + "...";

  return (
    <div className="space-y-3">
      <motion.p
        className={className}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isExpanded ? "full" : "truncated"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
      </motion.p>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors ${showMoreClassName}`}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isExpanded ? (
          <>
            Show Less
            <svg
              className="w-4 h-4 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </>
        ) : (
          <>
            See More
            <svg
              className="w-4 h-4 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </>
        )}
      </motion.button>
    </div>
  );
}
