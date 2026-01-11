import type { ReactNode } from "react";
import { TerminalBox } from "@/components/ui/TerminalBox";
import { CommandHeader } from "@/components/ui/CommandHeader";

interface FeatureCardProps {
  /** Title displayed in CommandHeader format */
  title: string;
  /** Filename shown in terminal title bar */
  filename: string;
  /** Card content (description text) */
  children: ReactNode;
  /** Background variant passed to TerminalBox */
  variant?: "default" | "elevated" | "code";
  /** Show window control dots in title bar. Default: false */
  showControls?: boolean;
}

/**
 * Feature card combining TerminalBox and CommandHeader.
 * Server component for optimal performance.
 *
 * @example
 * <FeatureCard title="Structure" filename="structure.md">
 *   <p>PARA-inspired folder organization...</p>
 * </FeatureCard>
 */
export function FeatureCard({
  title,
  filename,
  children,
  variant = "default",
  showControls = false,
}: FeatureCardProps) {
  return (
    <TerminalBox title={filename} variant={variant} showControls={showControls}>
      <CommandHeader level={2}>{title}</CommandHeader>
      <div className="mt-4 text-text">{children}</div>
    </TerminalBox>
  );
}
