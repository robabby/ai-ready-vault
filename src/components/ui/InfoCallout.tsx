import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CalloutVariant = "info" | "tip" | "note";

interface InfoCalloutProps {
  children: ReactNode;
  /** Visual variant. Default: "info" */
  variant?: CalloutVariant;
  /** Optional leading icon/symbol. Default: based on variant */
  icon?: string;
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  { icon: string; borderClass: string; bgClass: string }
> = {
  info: {
    icon: "i",
    borderClass: "border-phosphor-dim",
    bgClass: "bg-phosphor-ghost",
  },
  tip: {
    icon: "→",
    borderClass: "border-phosphor",
    bgClass: "bg-phosphor-ghost",
  },
  note: {
    icon: "#",
    borderClass: "border-text-muted/40",
    bgClass: "bg-elevated/50",
  },
};

/**
 * Lightweight callout for secondary/supporting information.
 * Uses left accent bar instead of full terminal box treatment.
 * Reduces visual weight while maintaining terminal aesthetic.
 *
 * @example
 * <InfoCallout variant="tip">
 *   Start with the First Session Tutorial for a hands-on walkthrough.
 * </InfoCallout>
 */
export function InfoCallout({
  children,
  variant = "info",
  icon,
  className,
}: InfoCalloutProps) {
  const config = variantConfig[variant];
  const displayIcon = icon ?? config.icon;

  return (
    <div
      className={cn(
        "relative pl-4 py-3 pr-4 rounded-r-lg",
        "border-l-2",
        config.borderClass,
        config.bgClass,
        className
      )}
    >
      <div className="flex gap-3">
        <span
          className="text-phosphor-dim font-mono text-sm shrink-0 select-none"
          aria-hidden="true"
        >
          {displayIcon}
        </span>
        <div className="text-text text-sm">{children}</div>
      </div>
    </div>
  );
}
