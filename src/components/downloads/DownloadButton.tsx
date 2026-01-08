"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DownloadAnimation } from "./DownloadAnimation";
import type { TierInfo } from "./TierCard";
import { cn } from "@/lib/cn";

type DownloadState = "idle" | "downloading" | "complete";

interface DownloadButtonProps {
  tier: TierInfo;
  className?: string;
}

/**
 * Download button with animation state machine.
 *
 * Flow:
 * 1. User clicks → state: "downloading"
 * 2. Animation plays → state: "complete"
 * 3. Browser download triggers → reset to "idle" after delay
 *
 * Reduced motion: skips animation, triggers download immediately
 */
export function DownloadButton({ tier, className }: DownloadButtonProps) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<DownloadState>("idle");
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  // Trigger the actual browser download
  const triggerDownload = useCallback(() => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  }, []);

  // Handle download button click
  const handleClick = useCallback(() => {
    if (state !== "idle") return;

    // Reduced motion: skip animation, download immediately
    if (reducedMotion) {
      triggerDownload();
      return;
    }

    setState("downloading");
  }, [state, reducedMotion, triggerDownload]);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    setState("complete");
    triggerDownload();

    // Reset to idle after showing complete state
    resetTimeoutRef.current = setTimeout(() => {
      setState("idle");
    }, 2000);
  }, [triggerDownload]);

  return (
    <div className={cn("relative", className)}>
      {/* Hidden download link */}
      <a
        ref={downloadLinkRef}
        href={tier.downloadPath}
        download={`${tier.name}-vault.zip`}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        Download {tier.name} vault
      </a>

      {/* Show animation during downloading state */}
      {state === "downloading" && (
        <DownloadAnimation
          tierName={tier.name}
          fileCount={tier.fileCount}
          onComplete={handleAnimationComplete}
          className="mb-4"
        />
      )}

      {/* Download button */}
      <button
        onClick={handleClick}
        disabled={state === "downloading"}
        className={cn(
          "w-full py-3 px-4 rounded-md font-mono text-sm",
          "border transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-phosphor focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          state === "idle" && "bg-phosphor-ghost border-phosphor-dim text-phosphor-bright hover:bg-phosphor/20 hover:border-phosphor active:bg-phosphor/30",
          state === "downloading" && "bg-surface border-border text-text-muted cursor-wait",
          state === "complete" && "bg-success/20 border-success/40 text-success"
        )}
        aria-describedby={`download-${tier.name}-desc`}
      >
        {state === "idle" && (
          <>
            <span className="text-phosphor-dim mr-2">&gt;</span>
            DOWNLOAD {tier.name.toUpperCase()}
          </>
        )}
        {state === "downloading" && (
          <>
            <span className="text-phosphor-dim mr-2 animate-pulse">...</span>
            PREPARING
          </>
        )}
        {state === "complete" && (
          <>
            <span className="mr-2">[OK]</span>
            DOWNLOAD STARTED
          </>
        )}
      </button>

      {/* Hidden description for screen readers */}
      <span id={`download-${tier.name}-desc`} className="sr-only">
        Download the {tier.name} vault containing {tier.fileCount} files ({tier.fileSize})
      </span>
    </div>
  );
}
