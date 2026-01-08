"use client";

import { useEffect, useState, type ReactNode } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
  /** Code content to highlight */
  children: string;
  /** Language for syntax highlighting */
  language?: string;
  /** Optional filename to display in title bar */
  filename?: string;
  /** Show line numbers. Default: true for multi-line code */
  showLineNumbers?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Custom amber phosphor theme matching our design system
const amberTheme = {
  name: "amber-phosphor",
  type: "dark" as const,
  colors: {
    "editor.background": "#08080c",
    "editor.foreground": "#d9d4c8",
  },
  tokenColors: [
    // Comments - muted
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#8a8577", fontStyle: "italic" },
    },
    // Strings - bright phosphor
    {
      scope: ["string", "string.quoted"],
      settings: { foreground: "#f5c96a" },
    },
    // Keywords - phosphor
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: "#e8b04b" },
    },
    // Functions - text bright
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#f5f0e8" },
    },
    // Types/Classes - phosphor dim
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#e8b04b" },
    },
    // Variables - text
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#d9d4c8" },
    },
    // Numbers - bright phosphor
    {
      scope: ["constant.numeric"],
      settings: { foreground: "#f5c96a" },
    },
    // Constants/Booleans - phosphor
    {
      scope: ["constant.language", "constant.other"],
      settings: { foreground: "#e8b04b" },
    },
    // Operators - muted
    {
      scope: ["keyword.operator"],
      settings: { foreground: "#8a8577" },
    },
    // Punctuation - muted
    {
      scope: ["punctuation"],
      settings: { foreground: "#8a8577" },
    },
    // Properties - text
    {
      scope: ["variable.other.property", "meta.object-literal.key"],
      settings: { foreground: "#d9d4c8" },
    },
    // Tags (HTML/JSX) - phosphor
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#e8b04b" },
    },
    // Attributes - text muted
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#a67c32" },
    },
    // Markdown headings - bright
    {
      scope: ["markup.heading", "entity.name.section"],
      settings: { foreground: "#f5c96a" },
    },
    // Markdown bold/emphasis
    {
      scope: ["markup.bold"],
      settings: { foreground: "#f5f0e8", fontStyle: "bold" },
    },
    {
      scope: ["markup.italic"],
      settings: { foreground: "#d9d4c8", fontStyle: "italic" },
    },
    // Markdown code
    {
      scope: ["markup.inline.raw", "markup.raw"],
      settings: { foreground: "#e8b04b" },
    },
    // Markdown links
    {
      scope: ["markup.underline.link"],
      settings: { foreground: "#f5c96a" },
    },
  ],
};

/**
 * Terminal-styled code block with syntax highlighting.
 * Uses Shiki with a custom amber phosphor theme.
 *
 * @example
 * <CodeBlock language="typescript" filename="example.ts">
 *   {`const greeting = "Hello, World!";`}
 * </CodeBlock>
 */
export function CodeBlock({
  children,
  language = "text",
  filename,
  showLineNumbers,
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Determine if we should show line numbers (default true for multi-line)
  const code = typeof children === "string" ? children.trim() : "";
  const isMultiLine = code.includes("\n");
  const displayLineNumbers = showLineNumbers ?? isMultiLine;

  useEffect(() => {
    async function highlight() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: amberTheme,
        });
        setHtml(highlighted);
      } catch {
        // Fallback for unsupported languages
        setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }

    highlight();
  }, [code, language]);

  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden bg-code",
        className
      )}
    >
      {/* Title bar with filename */}
      {filename && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2 bg-elevated">
          {/* Window control dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-phosphor-dim/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="text-text-muted text-sm ml-2 font-mono">
            {filename}
          </span>
        </div>
      )}

      {/* Code content */}
      <div className={cn("relative", displayLineNumbers && "code-with-lines")}>
        {isLoading ? (
          <pre className="p-4 font-mono text-text overflow-x-auto">
            <code>{code}</code>
          </pre>
        ) : (
          <div
            className="code-block-content p-4 font-mono text-sm overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Inline code component matching the terminal aesthetic.
 */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-code px-1.5 py-0.5 rounded text-phosphor-bright font-mono text-sm border border-border">
      {children}
    </code>
  );
}

// Helper to escape HTML for fallback rendering
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
