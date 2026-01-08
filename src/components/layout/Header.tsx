"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Guide" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About" },
];

/**
 * Site header with terminal-style logo and navigation.
 * Static positioning (not sticky), phosphor glow on logo.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Logo */}
        <NextLink
          href="/"
          className="text-phosphor glow command-header text-lg tracking-wider hover:text-phosphor-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phosphor focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          {"> AI-READY VAULT"}
        </NextLink>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-4 md:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={cn(
                      "text-sm uppercase tracking-wide transition-colors",
                      "hover:text-phosphor-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phosphor focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                      isActive
                        ? "text-phosphor-bright glow-subtle"
                        : "text-text-muted"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
