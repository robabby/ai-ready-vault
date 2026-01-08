import type { ReactNode, AnchorHTMLAttributes } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Opens in new tab with security attributes. Default: false */
  external?: boolean;
  /** Apply glow effect on hover. Default: true */
  glow?: boolean;
  className?: string;
}

/**
 * Terminal-styled link with phosphor colors and glow effect.
 * Uses Next.js Link for internal navigation.
 *
 * @example
 * <Link href="/guide">Read the guide</Link>
 * <Link href="https://example.com" external>External site</Link>
 */
export function Link({
  href,
  children,
  external = false,
  glow = true,
  className,
  ...props
}: LinkProps) {
  const linkClasses = cn(
    "terminal-link",
    glow && "hover:glow-subtle",
    className
  );

  // External links: use regular anchor with security attributes
  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal links: use Next.js Link for client-side navigation
  return (
    <NextLink href={href} className={linkClasses} {...props}>
      {children}
    </NextLink>
  );
}
