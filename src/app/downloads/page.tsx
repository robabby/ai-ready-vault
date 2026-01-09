import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { CRTScreen } from "@/components/ui/CRTScreen";
import { VaultCard, DownloadButton, type VaultInfo } from "@/components/downloads";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the AI-Ready Vault starter template for Obsidian.",
};

/**
 * Vault data.
 * File count and size match the generated ZIP.
 */
const VAULT: VaultInfo = {
  name: "AI-Ready Vault",
  description:
    "Complete starter vault with folder structure, templates, AI memory system, and skills library. Everything you need to begin collaborating with Claude.",
  fileCount: 45,
  fileSize: "30 KB",
  filePreview: [
    "CLAUDE.md",
    "Home.md",
    "Planner/Templates/",
    "Areas/AI/Memory/",
    "skills/",
    "Projects/Active/",
    "Resources/",
    "Archive/",
  ],
  downloadPath: "/vaults/ai-ready-vault.zip",
};

export default function DownloadsPage() {
  return (
    <PageWrapper>
      <CRTScreen className="p-8 md:p-12" showBezel={false} forceMinimal>
        <CommandHeader level={1}>Download</CommandHeader>

        <p className="mt-6 text-text max-w-2xl">
          Get the complete AI-Ready Vault with folder structure, templates,
          memory system, and skills library. Ready to open in Obsidian and start
          collaborating with Claude.
        </p>

        {/* Single vault card - centered with max-width */}
        <div className="mt-10 max-w-lg mx-auto">
          <VaultCard vault={VAULT}>
            <DownloadButton vault={VAULT} />
          </VaultCard>
        </div>

        {/* Usage instructions */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommandHeader level={2} glow={false}>
            After Download
          </CommandHeader>

          <ol className="mt-4 space-y-2 text-text-muted">
            <li>
              <span className="text-phosphor-dim mr-2">1.</span>
              <span className="text-text">Unzip</span> the vault to your desired
              location
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">2.</span>
              <span className="text-text">Open the folder</span> in Obsidian as
              a new vault
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">3.</span>
              <span className="text-text">Read CLAUDE.md</span> to understand
              the structure
            </li>
            <li>
              <span className="text-phosphor-dim mr-2">4.</span>
              <span className="text-text">Start collaborating</span> with Claude
              in your vault
            </li>
          </ol>
        </div>
      </CRTScreen>
    </PageWrapper>
  );
}
