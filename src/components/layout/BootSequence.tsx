"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { useBootStore } from "@/store/useBootStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { typeText } from "@/lib/animations";

interface BootSequenceProps {
  children: ReactNode;
}

// Boot sequence timeline (ms)
const TIMELINE = {
  POWER_ON_DURATION: 400,
  CURSOR_APPEAR: 800,
  LINE_1_START: 800,
  LINE_1_END: 1400,
  LINE_2_START: 1400,
  LINE_2_END: 1800,
  FLICKER: 1800,
  CONTENT_REVEAL: 2000,
  COMPLETE: 2500,
} as const;

// Boot sequence text
const BOOT_LINE_1 = "> INITIALIZING AI-READY VAULT";
const BOOT_LINE_2 = "CLAUDE.MD: FOUND | PLUGINS: OK";

type BootPhase =
  | "power-on"
  | "cursor"
  | "typing-1"
  | "typing-2"
  | "flicker"
  | "reveal"
  | "complete";

/**
 * Boot sequence animation orchestrator.
 *
 * - First visit: full boot sequence (CRT power-on, typing, reveal)
 * - Return visits: skip immediately
 * - Reduced motion: skip immediately
 * - Skip triggers: any keypress or click
 */
export function BootSequence({ children }: BootSequenceProps) {
  const { isBootComplete, hasSeenBootBefore, skipBootSequence, markBootComplete } =
    useBootStore();
  const reducedMotion = useReducedMotion();

  // Track hydration to prevent SSR/client mismatch
  const [hasMounted, setHasMounted] = useState(false);
  const [phase, setPhase] = useState<BootPhase>("power-on");
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showFlicker, setShowFlicker] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Skip handler for keyboard/mouse
  const handleSkip = useCallback(() => {
    if (!isBootComplete) {
      skipBootSequence();
    }
  }, [isBootComplete, skipBootSequence]);

  // Skip on keypress/click
  useEffect(() => {
    if (isBootComplete) return;

    const handleKeyDown = () => handleSkip();
    const handleClick = () => handleSkip();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [isBootComplete, handleSkip]);

  // Boot sequence timeline orchestration
  useEffect(() => {
    // Wait for hydration before checking localStorage state
    if (!hasMounted) return;

    // Skip if already seen or reduced motion preferred
    if (hasSeenBootBefore || reducedMotion) {
      skipBootSequence();
      return;
    }

    if (isBootComplete) return;

    // Track all cleanup functions
    let line1Cleanup: (() => void) | null = null;
    let line2Cleanup: (() => void) | null = null;
    let flickerInnerTimer: ReturnType<typeof setTimeout> | null = null;

    // Power-on phase (CRT animation via CSS)
    const cursorTimer = setTimeout(() => {
      setShowCursor(true);
      setPhase("cursor");
    }, TIMELINE.CURSOR_APPEAR);

    // Typing line 1
    const line1Timer = setTimeout(() => {
      setPhase("typing-1");
      line1Cleanup = typeText(BOOT_LINE_1, setTypedLine1, TIMELINE.LINE_1_END - TIMELINE.LINE_1_START);
    }, TIMELINE.LINE_1_START);

    // Typing line 2
    const line2Timer = setTimeout(() => {
      setPhase("typing-2");
      line2Cleanup = typeText(BOOT_LINE_2, setTypedLine2, TIMELINE.LINE_2_END - TIMELINE.LINE_2_START);
    }, TIMELINE.LINE_2_START);

    // Flicker effect
    const flickerTimer = setTimeout(() => {
      setShowFlicker(true);
      setPhase("flicker");
      flickerInnerTimer = setTimeout(() => setShowFlicker(false), 80);
    }, TIMELINE.FLICKER);

    // Content reveal (hard cut)
    const revealTimer = setTimeout(() => {
      setPhase("reveal");
    }, TIMELINE.CONTENT_REVEAL);

    // Complete
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      markBootComplete();
    }, TIMELINE.COMPLETE);

    return () => {
      clearTimeout(cursorTimer);
      clearTimeout(line1Timer);
      clearTimeout(line2Timer);
      clearTimeout(flickerTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
      // Clean up typing animation timeouts
      line1Cleanup?.();
      line2Cleanup?.();
      // Clean up nested flicker timer
      if (flickerInnerTimer) {
        clearTimeout(flickerInnerTimer);
      }
    };
  }, [hasMounted, hasSeenBootBefore, reducedMotion, isBootComplete, skipBootSequence, markBootComplete]);

  // During SSR and hydration, render nothing to avoid mismatch
  // After mount, if boot complete, render children
  if (!hasMounted) {
    // Render boot overlay during SSR/hydration to avoid layout shift
    return (
      <div className="fixed inset-0 z-50 bg-void" data-boot-sequence>
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  // If boot complete, just render children
  if (isBootComplete) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-void flex items-center justify-center"
      data-boot-sequence
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Screen reader announcement */}
      <span className="sr-only">Loading AI-Ready Vault. Press any key to skip.</span>

      {/* CRT Power-on container */}
      <div
        className="w-full h-full bg-void flex items-center justify-center"
        style={{
          animation: `crt-power-on ${TIMELINE.POWER_ON_DURATION}ms ease-out forwards`,
        }}
      >
        <div className="font-mono text-base p-8 max-w-2xl w-full">
          {/* Line 1 */}
          <div className="min-h-[1.65em]">
            <span className="text-phosphor glow" aria-hidden="true">
              {typedLine1}
            </span>
            {phase === "typing-1" && showCursor && (
              <span className="text-phosphor-bright animate-[blink_1s_steps(1)_infinite]">
                {"\u2588"}
              </span>
            )}
          </div>

          {/* Line 2 */}
          <div className="min-h-[1.65em] mt-1">
            <span className="text-success" aria-hidden="true">
              {typedLine2}
            </span>
            {phase === "typing-2" && showCursor && (
              <span className="text-phosphor-bright animate-[blink_1s_steps(1)_infinite]">
                {"\u2588"}
              </span>
            )}
          </div>

          {/* Cursor after typing */}
          {(phase === "flicker" || phase === "reveal") && showCursor && (
            <div className="mt-4">
              <span className="text-phosphor-dim">{"> "}</span>
              <span className="text-phosphor">READY</span>
              <span className="text-phosphor-bright animate-[blink_1s_steps(1)_infinite] ml-1">
                {"\u2588"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Flicker overlay */}
      {showFlicker && (
        <div
          className="fixed inset-0 bg-phosphor-ghost pointer-events-none"
          style={{ opacity: 0.15 }}
        />
      )}
    </div>
  );
}
