/**
 * Utility for conditionally joining class names.
 * Filters out falsy values and empty strings, joins with space.
 *
 * @example
 * cn("base", isActive && "active", className)
 * // Returns "base active" if isActive is true
 */
export function cn(
  ...classes: Array<string | boolean | undefined | null>
): string {
  return classes
    .filter((c): c is string => typeof c === "string" && c.length > 0)
    .join(" ");
}
