import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import NextLink from "next/link";
import { CodeBlock, InlineCode } from "@/components/ui";

type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  children?: ReactNode;
};

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  children?: ReactNode;
};

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  children?: ReactNode;
};

/**
 * Generate an ID from heading text for anchor links.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Extract text content from React children (handles nested elements).
 */
function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (typeof children === "object" && children !== null && "props" in children) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    return getTextContent(element.props.children);
  }

  return "";
}

/**
 * Heading component with auto-generated ID for anchor linking.
 */
function createHeading(level: 2 | 3 | 4) {
  const HeadingTag = `h${level}` as const;

  return function Heading({ children, ...props }: HeadingProps) {
    const text = getTextContent(children);
    const id = slugify(text);

    return (
      <HeadingTag id={id} {...props}>
        <a href={`#${id}`} className="anchor-link" aria-hidden="true">
          {children}
        </a>
      </HeadingTag>
    );
  };
}

/**
 * Custom link component - uses Next.js Link for internal routes.
 */
function CustomLink({ href, children, ...props }: AnchorProps) {
  if (!href) {
    return <span {...props}>{children}</span>;
  }

  // External links
  if (href.startsWith("http") || href.startsWith("//")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  // Internal links
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}

/**
 * Custom pre/code handling for syntax highlighting.
 */
function Pre({ children, ...props }: PreProps) {
  // Extract code element and its props
  // In MDX/React, children.type might be "code" string or a function/component
  if (children && typeof children === "object" && "props" in children) {
    const childElement = children as ReactElement<{
      children?: string;
      className?: string;
    }>;

    // Check if this looks like a code element (has className with language- or is a code block)
    const childProps = childElement.props || {};
    const className = childProps.className || "";
    const code = typeof childProps.children === "string" ? childProps.children : "";

    // If we have code content, render with CodeBlock
    if (code) {
      // Extract language from className (e.g., "language-typescript")
      const match = className.match(/language-(\w+)/);
      const language = match ? match[1] : "text";

      return <CodeBlock language={language}>{code}</CodeBlock>;
    }
  }

  // Fallback for non-code pre blocks
  return <pre {...props}>{children}</pre>;
}

/**
 * MDX component overrides.
 * These map standard markdown/HTML elements to our custom styled versions.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with anchor links
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),

    // Links
    a: CustomLink,

    // Code blocks
    pre: Pre,
    code: ({ children, ...props }) => {
      // If this code element is inside a pre (block code),
      // it will be handled by the Pre component above
      // This handles inline code only
      const isInline = !props.className?.includes("language-");
      if (isInline) {
        return <InlineCode>{children}</InlineCode>;
      }
      return <code {...props}>{children}</code>;
    },

    // Merge with any existing components
    ...components,
  };
}
