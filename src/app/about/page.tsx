import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { TerminalBox } from "@/components/ui/TerminalBox";
import { Link } from "@/components/ui/Link";
import { Cursor } from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AI-Ready Vault, an open methodology for structuring Obsidian vaults that work seamlessly with AI assistants like Claude.",
};

/**
 * About page with project info, creator links, and contact details.
 * Styled as a terminal "about" command output.
 */
export default function AboutPage() {
  return (
    <PageWrapper>
      <CRTScreen className="p-8 md:p-12" showBezel={false} forceMinimal>
        <CommandHeader level={1}>About</CommandHeader>

        {/* Project description */}
        <div className="mt-6 space-y-4 max-w-2xl">
          <p className="text-text">
            <span className="text-phosphor-bright">AI-Ready Vault</span> is an
            open methodology for structuring{" "}
            <Link href="https://obsidian.md" external>
              Obsidian
            </Link>{" "}
            vaults that work seamlessly with AI assistants like Claude.
          </p>

          <p className="text-text-muted">
            Born from the belief that AI collaboration shouldn&apos;t require
            constant context-switching. When your knowledge base speaks the same
            language as your AI partner, the friction disappears.
          </p>
        </div>

        {/* Principles section */}
        <div className="mt-10">
          <CommandHeader level={2} glow={false}>
            Principles
          </CommandHeader>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TerminalBox title="structure.md">
              <div className="space-y-2 text-sm">
                <p className="text-phosphor">PARA-inspired organization</p>
                <p className="text-text-muted">
                  Projects, Areas, Resources, Archive. Semantic boundaries that
                  AI can navigate without getting lost.
                </p>
              </div>
            </TerminalBox>

            <TerminalBox title="memory.md">
              <div className="space-y-2 text-sm">
                <p className="text-phosphor">Persistent AI memory</p>
                <p className="text-text-muted">
                  Episodic, Semantic, Procedural, Strategic. Four memory types
                  that survive across sessions.
                </p>
              </div>
            </TerminalBox>

            <TerminalBox title="claude.md">
              <div className="space-y-2 text-sm">
                <p className="text-phosphor">Working agreement</p>
                <p className="text-text-muted">
                  The CLAUDE.md file defines how AI interacts with your vault.
                  Rules, preferences, context.
                </p>
              </div>
            </TerminalBox>

            <TerminalBox title="workflow.md">
              <div className="space-y-2 text-sm">
                <p className="text-phosphor">Session rituals</p>
                <p className="text-text-muted">
                  Hydrate, reflect, remember, recall. Patterns that make each
                  conversation build on the last.
                </p>
              </div>
            </TerminalBox>
          </div>
        </div>

        {/* Created by section */}
        <div className="mt-10 pt-8 border-t border-border">
          <CommandHeader level={2} glow={false}>
            Created By
          </CommandHeader>

          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-phosphor-dim font-mono text-sm shrink-0">
                ORG
              </div>
              <div>
                <Link href="https://metatron.sh" external>
                  Metatron Collective
                </Link>
                <p className="text-text-muted text-sm mt-1">
                  A distributed team exploring the intersection of human
                  knowledge and AI capability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-phosphor-dim font-mono text-sm shrink-0">
                SRC
              </div>
              <div>
                <Link href="https://github.com/metatron-collective/ai-ready-vault" external>
                  github.com/metatron-collective/ai-ready-vault
                </Link>
                <p className="text-text-muted text-sm mt-1">
                  Open source. Contributions welcome.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="mt-10 pt-8 border-t border-border">
          <CommandHeader level={2} glow={false}>
            Connect
          </CommandHeader>

          <div className="mt-4 font-mono text-sm space-y-2">
            <p>
              <span className="text-phosphor-dim mr-3">EMAIL</span>
              <Link href="mailto:hello@metatron.sh" external glow={false}>
                <span className="text-text hover:text-phosphor-bright transition-colors">
                  hello@metatron.sh
                </span>
              </Link>
            </p>
            <p>
              <span className="text-phosphor-dim mr-3">TWITTER</span>
              <Link href="https://twitter.com/metatroncoll" external glow={false}>
                <span className="text-text hover:text-phosphor-bright transition-colors">
                  @metatroncoll
                </span>
              </Link>
            </p>
            <p>
              <span className="text-phosphor-dim mr-3">DISCORD</span>
              <Link href="https://discord.gg/metatron" external glow={false}>
                <span className="text-text hover:text-phosphor-bright transition-colors">
                  discord.gg/metatron
                </span>
              </Link>
            </p>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="font-mono text-sm">
            <span className="text-phosphor-dim">$</span>{" "}
            <span className="text-text">cat philosophy.txt</span>
          </p>
          <div className="mt-2 pl-4 border-l-2 border-phosphor-ghost">
            <p className="text-text-muted text-sm italic">
              &quot;The best AI collaboration happens when the human and the
              machine share a common understanding of the workspace. Structure
              creates freedom.&quot;
            </p>
          </div>
          <p className="mt-4 font-mono text-sm">
            <span className="text-phosphor-dim">$</span>{" "}
            <span className="text-phosphor">_</span>
            <Cursor />
          </p>
        </div>
      </CRTScreen>
    </PageWrapper>
  );
}
