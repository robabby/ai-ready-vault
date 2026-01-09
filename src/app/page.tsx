import { PageWrapper } from "@/components/layout";
import { Hero, FolderTree, FeatureCard, OpeningHookDemo, BeforeAfter, ObjectionHandling } from "@/components/home";

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

        {/* Demo Section - anchor target for "Watch the Demo" CTA */}
        <OpeningHookDemo />

        {/* Before/After Comparison */}
        <BeforeAfter />

        {/* Objection Handling */}
        <ObjectionHandling />
      </div>
    </PageWrapper>
  );
}
