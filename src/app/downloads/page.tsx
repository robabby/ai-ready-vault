import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { TierCard, DownloadButton, type TierInfo } from "@/components/downloads";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download AI-ready Obsidian vault starter templates. Choose from minimal, standard, or full configurations.",
};

/**
 * Vault tier data.
 * File counts and sizes match the generated ZIPs.
 */
const TIERS: TierInfo[] = [
  {
    name: "minimal",
    description: "Essential structure only. Perfect for starting fresh with just the core folders and CLAUDE.md.",
    fileCount: 14,
    fileSize: "3 KB",
    filePreview: [
      "CLAUDE.md",
      "Home.md",
      "Inbox/",
      "Projects/Active/",
      "Projects/Backlog/",
      "Areas/",
      "Resources/",
      "Archive/",
    ],
    downloadPath: "/vaults/minimal-vault.zip",
  },
  {
    name: "standard",
    description: "Structure + templates. Includes daily/weekly templates and AI memory folders for collaboration.",
    fileCount: 26,
    fileSize: "7 KB",
    filePreview: [
      "CLAUDE.md",
      "Home.md",
      "Templates/daily.md",
      "Templates/weekly.md",
      "Templates/project.md",
      "Areas/AI/Memory/",
      "Areas/AI/Collaboration/",
      "Claude.backup.md",
    ],
    downloadPath: "/vaults/standard-vault.zip",
  },
  {
    name: "full",
    description: "Complete with examples. Everything including sample projects, filled templates, and example notes.",
    fileCount: 50,
    fileSize: "11 KB",
    filePreview: [
      "CLAUDE.md",
      "Home.md",
      "Projects/Active/Website-Redesign/",
      "Areas/AI/Memory/Semantic/",
      "Planner/2025/",
      "Templates/session-log.md",
      "Contacts/",
      "Studio/",
    ],
    downloadPath: "/vaults/full-vault.zip",
  },
];

export default function DownloadsPage() {
  return (
    <PageWrapper>
      <CRTScreen className="p-8 md:p-12" showBezel={false} forceMinimal>
        <CommandHeader level={1}>Downloads</CommandHeader>

        <p className="mt-6 text-text max-w-2xl">
          Choose your starting point. Each tier builds on the previous,
          adding more structure and examples. All include the essential{" "}
          <span className="text-phosphor-bright">CLAUDE.md</span> file.
        </p>

        {/* Tier comparison note */}
        <div className="mt-4 text-text-muted text-sm">
          <span className="text-phosphor-dim">[TIP]</span> Start with{" "}
          <span className="text-text-bright">minimal</span> if you prefer
          building your own system, or{" "}
          <span className="text-text-bright">full</span> to explore a
          working example.
        </div>

        {/* Tier cards grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier}>
              <DownloadButton tier={tier} />
            </TierCard>
          ))}
        </div>

        {/* Usage instructions */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommandHeader level={2} glow={false}>
            After Download
          </CommandHeader>

          <ol className="mt-4 space-y-2 text-text-muted">
            <li>
              <span className="text-phosphor-dim mr-2">1.</span>
              <span className="text-text">Unzip</span> the vault to your desired location
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">2.</span>
              <span className="text-text">Open the folder</span> in Obsidian as a new vault
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">3.</span>
              <span className="text-text">Read CLAUDE.md</span> to understand the structure
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">4.</span>
              <span className="text-text">Start collaborating</span> with Claude in your vault
            </li>
          </ol>
        </div>
      </CRTScreen>
    </PageWrapper>
  );
}
