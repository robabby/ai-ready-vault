import { CRTScreen } from "@/components/ui/CRTScreen";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { TerminalBox } from "@/components/ui/TerminalBox";

const CONTENT = {
  prompt: "> What's the status of my project?",
  without: {
    title: "without-structure.log",
    response: `I don't have context about your projects.
Could you tell me which project you're asking about?
What aspects would you like to know?`,
  },
  with: {
    title: "ai-ready-vault.log",
    files: [
      "Reading: Projects/Active/Website-Redesign/overview.md",
      "Reading: Areas/AI/Memory/Semantic/design-decisions.md",
    ],
    response: `The redesign is in Phase 2. Last week you decided
to use Tailwind over styled-components...`,
  },
} as const;

/**
 * Before/After comparison showing the same question asked
 * with and without AI-ready vault structure.
 *
 * Static display - no animation, instant visual contrast.
 */
export function BeforeAfter() {
  return (
    <CRTScreen forceMinimal showBezel={false} className="p-6">
      <CommandHeader level={2}>The Difference</CommandHeader>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        {/* Without Structure - Muted */}
        <div className="opacity-60">
          <TerminalBox title={CONTENT.without.title}>
            <div className="font-mono space-y-3">
              <div className="text-text">{CONTENT.prompt}</div>
              <div className="text-text-muted whitespace-pre-line">
                {CONTENT.without.response}
              </div>
            </div>
          </TerminalBox>
        </div>

        {/* With AI-Ready Vault - Highlighted */}
        <div className="ring-1 ring-phosphor/30 rounded-lg shadow-[0_0_15px_rgba(232,176,75,0.15)]">
          <TerminalBox title={CONTENT.with.title}>
            <div className="font-mono space-y-3">
              <div className="text-text-bright">{CONTENT.prompt}</div>
              <div className="space-y-1">
                {CONTENT.with.files.map((file, i) => (
                  <div key={i} className="text-phosphor-dim text-sm">
                    {file}
                  </div>
                ))}
              </div>
              <div className="text-text whitespace-pre-line">
                {CONTENT.with.response}
              </div>
            </div>
          </TerminalBox>
        </div>
      </div>
    </CRTScreen>
  );
}
