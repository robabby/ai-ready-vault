import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TerminalBoxProps {
  children: ReactNode;
  /** Optional title bar text */
  title?: string;
  /** Background variant. Default: "default" */
  variant?: "default" | "elevated" | "code";
  /** Show window control dots in title bar. Default: true */
  showControls?: boolean;
  className?: string;
}

/**
 * Terminal-styled content container with optional title bar.
 * Use for grouping related content with a consistent look.
 *
 * @example
 * <TerminalBox title="system.log">
 *   <p>CLAUDE.MD: FOUND</p>
 *   <p>PLUGINS: OK</p>
 * </TerminalBox>
 */
export function TerminalBox({
  children,
  title,
  variant = "default",
  showControls = true,
  className,
}: TerminalBoxProps) {
  const bgClass = {
    default: "bg-elevated",
    elevated: "bg-surface",
    code: "bg-code",
  }[variant];

  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden",
        bgClass,
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          {/* Window control dots (optional) */}
          {showControls && (
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-phosphor-dim/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
          )}
          <span className={cn("text-text-muted text-sm", showControls && "ml-2")}>
            {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
