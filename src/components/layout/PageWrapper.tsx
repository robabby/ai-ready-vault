import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page content wrapper with consistent padding and max-width.
 * Pages decide their own CRT treatment.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={cn("flex-1 px-4 md:px-8 py-6 md:py-8", className)}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </main>
  );
}
