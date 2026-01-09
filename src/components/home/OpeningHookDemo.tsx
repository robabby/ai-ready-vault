"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { Cursor } from "@/components/ui/Cursor";

// Demo content
const DEMO_CONTENT = {
  prompt: "> What's the status of the website redesign project?",
  files: [
    "Reading: Projects/Active/Website-Redesign/overview.md",
    "Reading: Areas/AI/Memory/Semantic/design-decisions.md",
    "Reading: Planner/2025/Q1/weekly-03.md",
  ],
  response: `Based on your project notes and recent decisions:

The redesign is in Phase 2 (Component Library). Last week you
decided to use Tailwind over styled-components. The homepage
hero is blocked on copy approval - you noted this in your
Jan 15 session.

Next step: Review the draft copy in Inbox/hero-copy-v2.md`,
} as const;

// Animation timing (ms)
const TIMELINE = {
  PROMPT_DURATION: 1200,
  FILE_1_DELAY: 400,
  FILE_2_DELAY: 600,
  FILE_3_DELAY: 500,
  RESPONSE_DELAY: 800,
  RESPONSE_DURATION: 3500,
} as const;

type DemoPhase =
  | "idle"
  | "prompt"
  | "reading-1"
  | "reading-2"
  | "reading-3"
  | "pause"
  | "response"
  | "complete";

/**
 * Opening Hook Demo - shows cross-file synthesis in action.
 *
 * - Auto-plays when scrolled into view (Intersection Observer)
 * - Skippable via Escape, Space, Enter, or click
 * - Replay button after completion
 * - Respects prefers-reduced-motion
 */
export function OpeningHookDemo() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // SSR hydration safety
  const [hasMounted, setHasMounted] = useState(false);

  // Animation state
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [visibleFiles, setVisibleFiles] = useState(0);
  const [typedResponse, setTypedResponse] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);

  const isComplete = phase === "complete";
  const isAnimating = phase !== "idle" && phase !== "complete";

  // Mark as mounted after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Skip to complete state
  const handleSkip = useCallback(() => {
    // Clear all pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Jump to complete state
    setTypedPrompt(DEMO_CONTENT.prompt);
    setVisibleFiles(3);
    setTypedResponse(DEMO_CONTENT.response);
    setPhase("complete");
  }, []);

  // Replay animation - start directly without waiting for scroll trigger
  const handleReplay = useCallback(() => {
    // Clear any pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset state and start animation directly
    setTypedPrompt("");
    setVisibleFiles(0);
    setTypedResponse("");
    setPhase("prompt"); // Start animation immediately
  }, []);

  // Keyboard skip handler
  useEffect(() => {
    if (!isAnimating) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, handleSkip]);

  // Intersection Observer - trigger on scroll into view
  useEffect(() => {
    if (!hasMounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed && phase === "idle") {
          setHasPlayed(true);

          // Skip animation if reduced motion preferred
          if (reducedMotion) {
            handleSkip();
            return;
          }

          // Start animation
          setPhase("prompt");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasMounted, hasPlayed, phase, reducedMotion, handleSkip]);

  // Animation timeline
  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;

    const addTimeout = (fn: () => void, delay: number) => {
      const timeout = setTimeout(fn, delay);
      timeoutsRef.current.push(timeout);
      return timeout;
    };

    if (phase === "prompt") {
      // Type the prompt
      const cleanup = typeText(
        DEMO_CONTENT.prompt,
        setTypedPrompt,
        TIMELINE.PROMPT_DURATION,
        () => setPhase("reading-1")
      );
      return cleanup;
    }

    if (phase === "reading-1") {
      addTimeout(() => {
        setVisibleFiles(1);
        setPhase("reading-2");
      }, TIMELINE.FILE_1_DELAY);
    }

    if (phase === "reading-2") {
      addTimeout(() => {
        setVisibleFiles(2);
        setPhase("reading-3");
      }, TIMELINE.FILE_2_DELAY);
    }

    if (phase === "reading-3") {
      addTimeout(() => {
        setVisibleFiles(3);
        setPhase("pause");
      }, TIMELINE.FILE_3_DELAY);
    }

    if (phase === "pause") {
      addTimeout(() => {
        setPhase("response");
      }, TIMELINE.RESPONSE_DELAY);
    }

    if (phase === "response") {
      const cleanup = typeText(
        DEMO_CONTENT.response,
        setTypedResponse,
        TIMELINE.RESPONSE_DURATION,
        () => setPhase("complete")
      );
      return cleanup;
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // SSR: render static complete state
  if (!hasMounted) {
    return (
      <CRTScreen id="demo" forceMinimal showBezel={false} className="p-6">
        <CommandHeader level={2}>Cross-File Synthesis</CommandHeader>
        <StaticContent />
      </CRTScreen>
    );
  }

  return (
    <CRTScreen id="demo" forceMinimal showBezel={false} className="p-6">
      <CommandHeader level={2}>Cross-File Synthesis</CommandHeader>

      {/* Screen reader content */}
      <div className="sr-only" aria-live="polite">
        <p>Demo: Cross-file synthesis</p>
        <p>Question: {DEMO_CONTENT.prompt}</p>
        <p>
          Claude reads: {DEMO_CONTENT.files.join(", ")}
        </p>
        <p>Response: {DEMO_CONTENT.response}</p>
      </div>

      {/* Visual animated content */}
      <div
        ref={containerRef}
        aria-hidden="true"
        onClick={isAnimating ? handleSkip : undefined}
        className={isAnimating ? "cursor-pointer" : undefined}
      >
        <div className="mt-4 font-mono space-y-3">
          {/* User prompt */}
          <div className="text-text-bright min-h-[1.65em]">
            {typedPrompt}
            {phase === "prompt" && <Cursor />}
          </div>

          {/* File reading status */}
          {visibleFiles > 0 && (
            <div className="space-y-1">
              {DEMO_CONTENT.files.slice(0, visibleFiles).map((file, i) => (
                <div key={i} className="text-phosphor-dim text-sm">
                  {file}
                </div>
              ))}
            </div>
          )}

          {/* AI response */}
          {(phase === "pause" ||
            phase === "response" ||
            phase === "complete") &&
            visibleFiles === 3 && (
              <div className="text-text whitespace-pre-line mt-4">
                {typedResponse}
                {phase === "response" && <Cursor />}
              </div>
            )}

          {/* Skip hint */}
          {isAnimating && (
            <div className="text-text-muted text-xs opacity-60 mt-4">
              Press Escape, Space, or Enter to skip
            </div>
          )}

          {/* Replay button */}
          {isComplete && (
            <button
              onClick={handleReplay}
              className="mt-4 text-text-muted text-xs hover:text-phosphor-dim transition-colors"
              aria-label="Replay demo animation"
            >
              <span className="text-phosphor-dim">[</span>
              Replay
              <span className="text-phosphor-dim">]</span>
            </button>
          )}
        </div>
      </div>
    </CRTScreen>
  );
}

/**
 * Static content for SSR/initial render
 */
function StaticContent() {
  return (
    <div className="mt-4 font-mono space-y-3">
      <div className="text-text-bright">{DEMO_CONTENT.prompt}</div>
      <div className="space-y-1">
        {DEMO_CONTENT.files.map((file, i) => (
          <div key={i} className="text-phosphor-dim text-sm">
            {file}
          </div>
        ))}
      </div>
      <div className="text-text whitespace-pre-line mt-4">
        {DEMO_CONTENT.response}
        <Cursor />
      </div>
    </div>
  );
}

/**
 * Types text character by character over a duration.
 * Returns a cleanup function to clear all pending timeouts.
 */
function typeText(
  text: string,
  setter: (value: string) => void,
  duration: number,
  onComplete?: () => void
): () => void {
  const chars = text.split("");
  const charDelay = duration / chars.length;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  chars.forEach((_, index) => {
    const timeout = setTimeout(() => {
      setter(text.slice(0, index + 1));
      if (index === chars.length - 1 && onComplete) {
        onComplete();
      }
    }, charDelay * index);
    timeouts.push(timeout);
  });

  return () => {
    timeouts.forEach(clearTimeout);
  };
}
