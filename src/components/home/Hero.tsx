"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { Cursor } from "@/components/ui/Cursor";
import { Link } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

// Hero text content
const HERO_TITLE = "Build an AI-Ready Vault";
const HERO_SUBTITLE = "Structure your Obsidian vault for optimal AI collaboration.";

// Animation timing (ms)
const TITLE_DURATION = 800;
const SUBTITLE_DELAY = 200;
const SUBTITLE_DURATION = 600;

/**
 * Hero section with typing animation.
 *
 * - Reduced motion: shows full text immediately
 * - Normal: types title, then subtitle character-by-character
 * - Proper cleanup of animation timeouts
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [titleComplete, setTitleComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!hasMounted) return;

    // Skip animation if reduced motion preferred
    if (reducedMotion) {
      setTypedTitle(HERO_TITLE);
      setTypedSubtitle(HERO_SUBTITLE);
      setTitleComplete(true);
      setSubtitleComplete(true);
      return;
    }

    let titleCleanup: (() => void) | null = null;
    let subtitleCleanup: (() => void) | null = null;

    // Type title
    titleCleanup = typeText(HERO_TITLE, setTypedTitle, TITLE_DURATION, () => {
      setTitleComplete(true);
    });

    // Type subtitle after title completes
    const subtitleTimer = setTimeout(() => {
      subtitleCleanup = typeText(
        HERO_SUBTITLE,
        setTypedSubtitle,
        SUBTITLE_DURATION,
        () => {
          setSubtitleComplete(true);
        }
      );
    }, TITLE_DURATION + SUBTITLE_DELAY);

    return () => {
      titleCleanup?.();
      subtitleCleanup?.();
      clearTimeout(subtitleTimer);
    };
  }, [hasMounted, reducedMotion]);

  // During SSR, render static content for initial paint
  if (!hasMounted) {
    return (
      <CRTScreen className="p-8 md:p-12">
        <HeroContent
          title={HERO_TITLE}
          subtitle={HERO_SUBTITLE}
          showCursor={false}
        />
      </CRTScreen>
    );
  }

  return (
    <CRTScreen className="p-8 md:p-12">
      <HeroContent
        title={typedTitle}
        subtitle={typedSubtitle}
        showCursor={!subtitleComplete}
        isTypingTitle={!titleComplete}
      />
    </CRTScreen>
  );
}

interface HeroContentProps {
  title: string;
  subtitle: string;
  showCursor?: boolean;
  isTypingTitle?: boolean;
}

function HeroContent({
  title,
  subtitle,
  showCursor = true,
  isTypingTitle = false,
}: HeroContentProps) {
  return (
    <>
      {/* Screen reader accessible heading */}
      <h1 className="sr-only">{HERO_TITLE}</h1>

      {/* Visual decorative title with typing effect */}
      <div
        aria-hidden="true"
        className={cn("command-header glow text-phosphor font-mono")}
      >
        <span className="text-phosphor-dim mr-2">&gt;</span>
        {title.toUpperCase()}
        {isTypingTitle && showCursor && (
          <span className="text-phosphor-bright animate-[blink_1s_steps(1)_infinite] ml-0.5">
            {"\u2588"}
          </span>
        )}
      </div>

      {/* Subtitle with typing effect */}
      <p className="mt-6 text-text-bright text-lg min-h-[1.65em]">
        {subtitle}
        {!isTypingTitle && showCursor && <Cursor />}
      </p>

      <p className="mt-4 text-text-muted">
        A documentation site explaining AI-ready vaults with downloadable
        starter templates.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/guide" className="text-lg">
          Read the Guide
        </Link>
        <Link href="/downloads" className="text-lg">
          Download Vaults
        </Link>
      </div>
    </>
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

  // Return cleanup function
  return () => {
    timeouts.forEach(clearTimeout);
  };
}
