"use client";

import { useState, useRef, useEffect } from "react";

type TruncatedTextProps = {
  text: string;
  lines?: number;
  // kept for API compat — ignored, CSS clamping is used instead
  limit?: number;
  className?: string;
  showMoreClassName?: string;
};

export default function TruncatedText({
  text,
  lines = 3,
  className = "",
  showMoreClassName = "",
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure with clamp applied — if scrollHeight > visible height, text is cut
    setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, [text]);

  return (
    <div>
      <p
        ref={ref}
        className={className}
        style={
          isExpanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {text}
      </p>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-2 inline-flex items-center gap-1 text-sm font-medium transition-colors ${showMoreClassName}`}
          style={{
            color: "var(--brand-primary)",
            fontFamily: "var(--brand-font-body)",
          }}
        >
          {isExpanded ? "Show less" : "See more"}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
