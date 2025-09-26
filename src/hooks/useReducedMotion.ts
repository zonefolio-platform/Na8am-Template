"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Animation variants that respect reduced motion
export const getAnimationVariants = (prefersReducedMotion: boolean) => ({
  initial: prefersReducedMotion 
    ? { opacity: 1 } 
    : { opacity: 0, y: 20 },
  animate: prefersReducedMotion 
    ? { opacity: 1 } 
    : { opacity: 1, y: 0 },
  exit: prefersReducedMotion 
    ? { opacity: 1 } 
    : { opacity: 0, y: -20 }
});

export const getHoverVariants = (prefersReducedMotion: boolean) => ({
  hover: prefersReducedMotion 
    ? {} 
    : { scale: 1.05, y: -2 },
  tap: prefersReducedMotion 
    ? {} 
    : { scale: 0.95 }
});

export const getTransition = (prefersReducedMotion: boolean) => 
  prefersReducedMotion ? { duration: 0 } : { duration: 0.3 };