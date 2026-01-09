"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  /** HTML id attribute for anchor linking */
  id?: string;
  /** Show CRT bezel frame. Default: true */
  showBezel?: boolean;
  /**
   * Force minimal effects regardless of screen size.
   * Use this for inline CRT elements that shouldn't have full effects.
   * - "full": Use tier-based effects (default)
   * - "minimal": Force minimal effects (scanlines only)
   */
  forceMinimal?: boolean;
}

/**
 * CRT screen wrapper that applies phosphor terminal effects.
 * Automatically adjusts effects based on device performance tier
 * and user's reduced motion preference.
 *
 * Effects by tier:
 * - minimal (mobile): scanlines only
 * - reduced (tablet): scanlines + vignette + subtle glow
 * - full (desktop): all effects (scanlines, vignette, grain, glow, curvature)
 *
 * Use `forceMinimal` to override tier detection for specific use cases
 * (e.g., small inline elements that shouldn't have heavy effects).
 */
export function CRTScreen({
  children,
  className,
  id,
  showBezel = true,
  forceMinimal = false,
}: CRTScreenProps) {
  const tier = usePerformanceTier();
  const reducedMotion = useReducedMotion();

  // forceMinimal overrides tier detection
  const effectiveTier = forceMinimal ? "minimal" : tier;

  // Determine which effects to show based on effective tier and motion preference
  const showGrain = effectiveTier === "full" && !reducedMotion;
  const showVignette = effectiveTier !== "minimal";
  const showFlicker = effectiveTier === "full" && !reducedMotion;
  const showCurvature = effectiveTier === "full";

  const screenContent = (
    <div
      id={id}
      className={cn(
        "crt-screen relative overflow-hidden bg-bg",
        showCurvature && "crt-curve",
        "scanlines",
        showVignette && "vignette",
        showGrain && "grain",
        showFlicker && "crt-flicker",
        className
      )}
    >
      {children}
    </div>
  );

  if (!showBezel) {
    return screenContent;
  }

  return <div className="crt-bezel">{screenContent}</div>;
}
