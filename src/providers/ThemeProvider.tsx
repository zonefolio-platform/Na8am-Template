"use client";
import React, { useEffect } from "react";

// Palette shape expected in env
type Palette = {
  primary?: string;
  secondary?: string;
  accent?: string;
};

function applyPalette(palette: Palette) {
  if (!palette) return;
  if (palette.primary)
    document.documentElement.style.setProperty(
      "--color-primary",
      palette.primary
    );
  if (palette.secondary)
    document.documentElement.style.setProperty(
      "--color-secondary",
      palette.secondary
    );
  if (palette.accent)
    document.documentElement.style.setProperty(
      "--color-accent",
      palette.accent
    );
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    try {
      const raw = process.env.NEXT_PUBLIC_PALETTE;
      if (!raw) return;
      const palette: Palette = JSON.parse(raw);
      applyPalette(palette);
    } catch (err) {
      // silent fail: keep default palette
      console.warn("Invalid NEXT_PUBLIC_PALETTE", err);
    }
  }, []);

  return <>{children}</>;
}
