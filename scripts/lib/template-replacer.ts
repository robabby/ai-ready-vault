/**
 * Template replacement utility
 *
 * Replaces {{PLACEHOLDER}} patterns in file contents with actual values.
 */

export interface TemplateValues {
  [key: string]: string;
}

const PLACEHOLDER_PATTERN = /\{\{(\w+)\}\}/g;

/**
 * Replace template placeholders in content
 */
export function replaceTemplateValues(
  content: string,
  values: TemplateValues
): string {
  return content.replace(PLACEHOLDER_PATTERN, (match, key) => {
    if (key in values) {
      return values[key];
    }
    // Return original placeholder if no value provided
    return match;
  });
}

/**
 * Check if content has unreplaced placeholders
 */
export function hasUnreplacedPlaceholders(content: string): string[] {
  const matches: string[] = [];
  let match;

  while ((match = PLACEHOLDER_PATTERN.exec(content)) !== null) {
    matches.push(match[1]);
  }

  // Reset regex state
  PLACEHOLDER_PATTERN.lastIndex = 0;

  return matches;
}

/**
 * Get default template values
 */
export function getDefaultTemplateValues(): TemplateValues {
  return {
    VAULT_NAME: "My AI-Ready Vault",
    USER_NAME: "Your Name",
    CURRENT_DATE: new Date().toISOString().split("T")[0],
  };
}
