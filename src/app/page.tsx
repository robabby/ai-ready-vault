import { PageWrapper } from "@/components/layout";
import { Hero, FolderTree, FeatureCard } from "@/components/home";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { Cursor } from "@/components/ui/Cursor";

export default function Home() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Hero Section */}
        <Hero />

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard title="Structure" filename="structure.md">
            <p>
              PARA-inspired folder organization optimized for AI navigation.
              Projects, Areas, Resources, and Archive with semantic boundaries.
            </p>
          </FeatureCard>

          <FeatureCard title="Workflow" filename="workflow.md">
            <p>
              Session-based collaboration with hydrate, reflect, remember, and
              recall patterns. Persistent context across conversations.
            </p>
          </FeatureCard>

          <FeatureCard title="Memory" filename="memory.md" variant="elevated">
            <p>
              Four memory types: Episodic, Semantic, Procedural, and Strategic.
              Build institutional knowledge that persists.
            </p>
          </FeatureCard>

          <FeatureCard title="CLAUDE.MD" filename="claude.md" variant="code">
            <p>
              The working agreement file that defines how Claude interacts with
              your vault. Customizable rules and preferences.
            </p>
          </FeatureCard>
        </div>

        {/* Folder Tree */}
        <FolderTree />

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
