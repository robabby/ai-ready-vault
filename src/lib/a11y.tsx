import type { ReactNode } from "react";

/**
 * Renders content that is visually hidden but accessible to screen readers.
 */
export function SrOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Renders parallel content tracks for accessibility:
 * - Visual content (hidden from screen readers)
 * - Screen reader content (hidden visually)
 *
 * Use this for animated/decorative content that has text equivalents.
 *
 * @example
 * <ParallelTracks
 *   visual={<TypingAnimation text="Build an AI-ready vault" />}
 *   screenReader="Build an AI-ready vault"
 * />
 */
export function ParallelTracks({
  visual,
  screenReader,
}: {
  visual: ReactNode;
  screenReader: string;
}) {
  return (
    <>
      <span className="sr-only">{screenReader}</span>
      <span aria-hidden="true">{visual}</span>
    </>
  );
}
