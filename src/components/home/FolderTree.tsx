import { TerminalBox } from "@/components/ui/TerminalBox";
import { CommandHeader } from "@/components/ui/CommandHeader";

/**
 * ASCII representation of an AI-ready vault structure.
 * Server component for optimal performance.
 *
 * Structure follows PARA methodology with AI-specific additions:
 * - CLAUDE.md at root for AI instructions
 * - Planner/ for temporal context
 * - Studio/ for creative workspaces
 */
export function FolderTree() {
  return (
    <TerminalBox title="vault-structure" variant="code">
      <CommandHeader level={2}>Vault Structure</CommandHeader>

      {/* Screen reader description */}
      <p className="sr-only">
        AI-ready vault folder structure with CLAUDE.md file for AI instructions,
        followed by PARA folders: Projects for active work, Areas for ongoing
        responsibilities, Resources for reference material, and Archive for
        completed items. Additional folders include Planner for temporal context
        and Studio for creative workspaces.
      </p>

      {/* Visual ASCII tree */}
      <pre
        aria-hidden="true"
        className="mt-4 text-text font-mono text-sm leading-relaxed overflow-x-auto"
      >
        <code>{VAULT_TREE}</code>
      </pre>
    </TerminalBox>
  );
}

const VAULT_TREE = `ai-ready-vault/
├── CLAUDE.md          # AI instructions
├── Home.md            # Dashboard
│
├── Projects/          # Active work
│   ├── project-alpha/
│   └── project-beta/
│
├── Areas/             # Ongoing responsibilities
│   ├── health/
│   └── finance/
│
├── Resources/         # Reference material
│   └── templates/
│
├── Archive/           # Completed items
│
├── Planner/           # Temporal context
│   ├── daily/
│   └── weekly/
│
├── Studio/            # Creative workspaces
│
└── .obsidian/         # Vault config`;
