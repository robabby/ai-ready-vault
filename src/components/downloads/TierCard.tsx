import type { ReactNode } from "react";
import { TerminalBox } from "@/components/ui/TerminalBox";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { cn } from "@/lib/cn";

export interface TierInfo {
  name: string;
  description: string;
  fileCount: number;
  fileSize: string;
  /** Preview of included files (first ~8) */
  filePreview: string[];
  /** Path to the vault ZIP file */
  downloadPath: string;
}

interface TierCardProps {
  tier: TierInfo;
  /** Download button passed as children */
  children: ReactNode;
  className?: string;
}

/**
 * Displays a vault tier with details and download button.
 * Server component - compose with DownloadButton for interactivity.
 *
 * @example
 * <TierCard tier={minimalTier}>
 *   <DownloadButton tier={minimalTier} />
 * </TierCard>
 */
export function TierCard({ tier, children, className }: TierCardProps) {
  return (
    <TerminalBox
      title={`${tier.name}.vault`}
      variant="elevated"
      className={cn("flex flex-col h-full", className)}
    >
      <CommandHeader level={3} glow={false}>
        {tier.name}
      </CommandHeader>

      <p className="mt-3 text-text-muted text-sm">{tier.description}</p>

      {/* Stats row */}
      <div className="mt-4 flex gap-6 text-sm">
        <div>
          <span className="text-phosphor-dim">FILES:</span>{" "}
          <span className="text-text-bright">{tier.fileCount}</span>
        </div>
        <div>
          <span className="text-phosphor-dim">SIZE:</span>{" "}
          <span className="text-text-bright">{tier.fileSize}</span>
        </div>
      </div>

      {/* File preview */}
      <div className="mt-4 flex-1">
        <div className="text-phosphor-dim text-xs uppercase tracking-wider mb-2">
          Includes:
        </div>
        <div className="font-mono text-xs text-text-muted space-y-0.5">
          {tier.filePreview.map((file) => (
            <div key={file} className="truncate">
              <span className="text-phosphor-dim opacity-50">./</span>
              {file}
            </div>
          ))}
          {tier.fileCount > tier.filePreview.length && (
            <div className="text-text-muted opacity-60">
              ...and {tier.fileCount - tier.filePreview.length} more
            </div>
          )}
        </div>
      </div>

      {/* Download button slot */}
      <div className="mt-6 pt-4 border-t border-border">{children}</div>
    </TerminalBox>
  );
}
