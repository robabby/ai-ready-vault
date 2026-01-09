"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

// ASCII art frames - folder with files cascading in
const FOLDER_BASE = `
   _______________
  /              /|
 /              / |
/______________/  |
|              |  |
|              |  /
|______________|/`;

const FOLDER_CLOSED = `
   _______________
  |_______________|
  |               |
  |   COMPLETE    |
  |               |
  |_______________|`;

// File representations that "fall" into folder
const FILES = ["CLAUDE.md", "Home.md", "Templates/", "Memory/", ".obsidian/"];

interface DownloadAnimationProps {
  /** Vault name for display */
  vaultName: string;
  /** File count for display */
  fileCount: number;
  /** Duration in ms (default 2500) */
  duration?: number;
  /** Called when animation completes or is skipped */
  onComplete: () => void;
  className?: string;
}

/**
 * ASCII animation showing files cascading into a folder.
 * Skippable via click or keypress.
 *
 * Accessibility:
 * - Screen reader gets status updates, not the visual animation
 * - Reduced motion: shows completion state immediately
 */
export function DownloadAnimation({
  vaultName,
  fileCount,
  duration = 2500,
  onComplete,
  className,
}: DownloadAnimationProps) {
  const reducedMotion = useReducedMotion();
  const [currentFileIndex, setCurrentFileIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [displayedFiles, setDisplayedFiles] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Handle skip
  const handleSkip = useCallback(() => {
    // Clear pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsComplete(true);
    onComplete();
  }, [onComplete]);

  // Keyboard skip handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Animation effect
  useEffect(() => {
    // Reduced motion: skip to completion
    if (reducedMotion) {
      setIsComplete(true);
      onComplete();
      return;
    }

    const fileDelay = duration / (FILES.length + 1);
    const filesToShow = FILES.slice(0, Math.min(FILES.length, 5));

    // Animate each file dropping in
    filesToShow.forEach((file, index) => {
      const timeout = setTimeout(() => {
        setCurrentFileIndex(index);
        setDisplayedFiles((prev) => [...prev, file]);
      }, fileDelay * (index + 1));
      timeoutsRef.current.push(timeout);
    });

    // Complete animation
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, duration);
    timeoutsRef.current.push(completeTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [duration, reducedMotion, onComplete]);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className={cn(
        "relative cursor-pointer select-none",
        "p-4 bg-code rounded-lg border border-border",
        className
      )}
      role="progressbar"
      aria-valuenow={isComplete ? 100 : Math.round((currentFileIndex + 1) / FILES.length * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Downloading ${vaultName}`}
    >
      {/* Screen reader status */}
      <div className="sr-only" aria-live="polite">
        {isComplete
          ? `Download complete. ${fileCount} files ready.`
          : `Preparing download... ${displayedFiles.length} of ${FILES.length} file types processed.`}
      </div>

      {/* Visual animation */}
      <div aria-hidden="true" className="font-mono text-xs leading-tight">
        {/* Header */}
        <div className="text-phosphor-dim mb-2">
          {"> "}
          <span className="text-phosphor">DOWNLOADING</span>
          {" "}
          <span className="text-text-bright">{vaultName.toUpperCase()}</span>
        </div>

        {/* Folder ASCII art */}
        <pre className="text-phosphor-dim whitespace-pre">
          {isComplete ? FOLDER_CLOSED : FOLDER_BASE}
        </pre>

        {/* Flying files */}
        {!isComplete && (
          <div className="mt-2 space-y-0.5">
            {displayedFiles.map((file, i) => (
              <div
                key={file}
                className={cn(
                  "text-text-muted transition-opacity duration-200",
                  i === currentFileIndex && "text-phosphor-bright animate-pulse"
                )}
              >
                <span className="text-success">+</span> {file}
              </div>
            ))}
          </div>
        )}

        {/* Completion status */}
        {isComplete && (
          <div className="mt-3 text-success">
            <span className="text-phosphor-dim">[</span>
            OK
            <span className="text-phosphor-dim">]</span>
            {" "}
            <span className="text-text-bright">{fileCount} files</span> ready
          </div>
        )}

        {/* Skip hint */}
        {!isComplete && (
          <div className="mt-3 text-text-muted text-xs opacity-60">
            Press any key or click to skip
          </div>
        )}
      </div>
    </div>
  );
}
