"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CursorProps {
  /** Cursor variant. Default: "block" */
  variant?: "block" | "underline";
  className?: string;
}

/**
 * Blinking terminal cursor.
 * Respects user's reduced motion preference by showing static cursor.
 *
 * @example
 * <p>Type something<Cursor /></p>
 */
export function Cursor({ variant = "block", className }: CursorProps) {
  const reducedMotion = useReducedMotion();

  if (variant === "underline") {
    return (
      <span
        className={cn(
          "inline-block w-2 h-0.5 bg-phosphor-bright align-baseline ml-0.5",
          className
        )}
        style={
          !reducedMotion
            ? { animation: "blink 1s steps(1) infinite" }
            : undefined
        }
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={cn("inline-block text-phosphor-bright", className)}
      style={
        !reducedMotion
          ? { animation: "blink 1s steps(1) infinite" }
          : undefined
      }
      aria-hidden="true"
    >
      {"\u2588"}
    </span>
  );
}
