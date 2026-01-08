"use client";

import { useState, useEffect, useRef } from "react";

export type PerformanceTier = "minimal" | "reduced" | "full";

/**
 * Detects device performance tier based on viewport width.
 * - minimal: < 768px (mobile) - scanlines only
 * - reduced: 768-1023px (tablet) - scanlines + vignette + subtle glow
 * - full: 1024px+ (desktop) - all CRT effects
 *
 * SSR-safe: defaults to "reduced" during server render.
 * Resize events are debounced to prevent render thrashing.
 */
export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("reduced");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const updateTier = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setTier("minimal");
      } else if (width < 1024) {
        setTier("reduced");
      } else {
        setTier("full");
      }
    };

    // Debounced resize handler (200ms delay)
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(updateTier, 200);
    };

    // Set initial value immediately
    updateTier();

    // Listen for resize events with debouncing
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return tier;
}

/**
 * Returns true if effects should be enabled for the current tier.
 */
export function shouldEnableEffect(
  tier: PerformanceTier,
  effect: "scanlines" | "vignette" | "grain" | "glow" | "curvature"
): boolean {
  switch (effect) {
    case "scanlines":
      // Always enabled
      return true;
    case "vignette":
      // Tablet and desktop
      return tier !== "minimal";
    case "grain":
      // Desktop only (full tier)
      return tier === "full";
    case "glow":
      // Reduced glow on tablet, full on desktop
      return tier !== "minimal";
    case "curvature":
      // Desktop only
      return tier === "full";
    default:
      return true;
  }
}
