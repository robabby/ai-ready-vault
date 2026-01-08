import { PageWrapper } from "@/components/layout";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { TerminalBox } from "@/components/ui/TerminalBox";
import { Cursor } from "@/components/ui/Cursor";
import { Link } from "@/components/ui/Link";

export default function Home() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Hero Section */}
        <CRTScreen className="p-8 md:p-12">
          <CommandHeader level={1}>Build an AI-Ready Vault</CommandHeader>
          <p className="mt-6 text-text-bright text-lg">
            Structure your Obsidian vault for optimal AI collaboration.
            <Cursor />
          </p>
          <p className="mt-4 text-text-muted">
            A documentation site explaining AI-ready vaults with downloadable
            starter templates.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/guide" className="text-lg">
              Read the Guide
            </Link>
            <Link href="/downloads" className="text-lg">
              Download Vaults
            </Link>
          </div>
        </CRTScreen>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <TerminalBox title="structure.md">
            <CommandHeader level={2}>Structure</CommandHeader>
            <p className="mt-4 text-text">
              PARA-inspired folder organization optimized for AI navigation.
              Projects, Areas, Resources, and Archive with semantic boundaries.
            </p>
          </TerminalBox>

          <TerminalBox title="workflow.md">
            <CommandHeader level={2}>Workflow</CommandHeader>
            <p className="mt-4 text-text">
              Session-based collaboration with hydrate, reflect, remember, and
              recall patterns. Persistent context across conversations.
            </p>
          </TerminalBox>

          <TerminalBox title="memory.md" variant="elevated">
            <CommandHeader level={2}>Memory</CommandHeader>
            <p className="mt-4 text-text">
              Four memory types: Episodic, Semantic, Procedural, and Strategic.
              Build institutional knowledge that persists.
            </p>
          </TerminalBox>

          <TerminalBox title="claude.md" variant="code">
            <CommandHeader level={2}>CLAUDE.MD</CommandHeader>
            <p className="mt-4 text-text">
              The working agreement file that defines how Claude interacts with
              your vault. Customizable rules and preferences.
            </p>
          </TerminalBox>
        </div>

        {/* Demo Section */}
        <CRTScreen forceMinimal showBezel={false} className="p-6">
          <CommandHeader level={2}>System Check</CommandHeader>
          <div className="mt-4 font-mono space-y-1">
            <p>
              <span className="text-phosphor-dim">$</span>{" "}
              <span className="text-text">checking vault status...</span>
            </p>
            <p className="text-success">CLAUDE.MD: FOUND</p>
            <p className="text-success">MEMORY SYSTEM: ACTIVE</p>
            <p className="text-success">PLUGINS: OK</p>
            <p className="text-phosphor">
              <span className="text-phosphor-dim">&gt;</span> READY FOR
              COLLABORATION
              <Cursor />
            </p>
          </div>
        </CRTScreen>
      </div>
    </PageWrapper>
  );
}
