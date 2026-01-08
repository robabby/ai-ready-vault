import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface CommandHeaderProps {
  children: string;
  /** Semantic heading level (h1-h6). Default: 2 */
  level?: HeadingLevel;
  /** Apply phosphor glow effect. Default: true */
  glow?: boolean;
  className?: string;
}

/**
 * Terminal-style section header with "> PREFIX" format.
 * Renders accessible semantic heading (sr-only) alongside
 * decorative visual version.
 *
 * @example
 * <CommandHeader level={1}>Build an AI-Ready Vault</CommandHeader>
 * // Renders: > BUILD AN AI-READY VAULT (visually)
 * // Screen readers get: "Build an AI-Ready Vault" as h1
 */
export function CommandHeader({
  children,
  level = 2,
  glow = true,
  className,
}: CommandHeaderProps) {
  const HeadingTag = `h${level}` as const;

  return (
    <div className={cn("relative", className)}>
      {/* Screen reader accessible heading */}
      <HeadingTag className="sr-only">{children}</HeadingTag>

      {/* Visual decorative version */}
      <div
        aria-hidden="true"
        className={cn(
          "command-header",
          glow && "glow",
          "text-phosphor font-mono"
        )}
      >
        <span className="text-phosphor-dim mr-2">&gt;</span>
        {children.toUpperCase()}
      </div>
    </div>
  );
}
