/**
 * Vault tier configuration
 *
 * Defines what files are included in each vault tier (minimal, standard, full).
 * Used by the build script to generate ZIP archives.
 */

export interface VaultTier {
  name: string;
  outputFileName: string;
  description: string;
  /** Glob patterns for files to include (relative to vault-source/) */
  include: string[];
  /** Glob patterns for files to exclude */
  exclude?: string[];
}

export const vaultTiers: VaultTier[] = [
  {
    name: "minimal",
    outputFileName: "minimal-vault.zip",
    description: "Essential structure only (~10 files)",
    include: [
      // Core structure
      ".obsidian/plugins.json",
      "Archive/.gitkeep",
      "Areas/.gitkeep",
      "Contacts/.gitkeep",
      "Inbox/.gitkeep",
      "Planner/.gitkeep",
      "Planner/Templates/.gitkeep",
      "Projects/Active/.gitkeep",
      "Projects/Backlog/.gitkeep",
      "Projects/Completed/.gitkeep",
      "Resources/.gitkeep",
      "Studio/.gitkeep",
      // Core files
      "CLAUDE.md",
      "Home.md",
    ],
  },
  {
    name: "standard",
    outputFileName: "standard-vault.zip",
    description: "Structure + templates (~25 files)",
    include: [
      // Everything in minimal
      ".obsidian/plugins.json",
      "Archive/.gitkeep",
      "Areas/.gitkeep",
      "Contacts/.gitkeep",
      "Inbox/.gitkeep",
      "Planner/.gitkeep",
      "Projects/Active/.gitkeep",
      "Projects/Backlog/.gitkeep",
      "Projects/Completed/.gitkeep",
      "Resources/.gitkeep",
      "Studio/.gitkeep",
      "CLAUDE.md",
      "Home.md",
      // AI Memory structure
      "Areas/AI/Memory/Memory.md",
      "Areas/AI/Memory/Episodic/.gitkeep",
      "Areas/AI/Memory/Semantic/.gitkeep",
      "Areas/AI/Memory/Procedural/.gitkeep",
      "Areas/AI/Memory/Strategic/.gitkeep",
      "Areas/AI/Collaboration/Sessions/.gitkeep",
      // Templates
      "Planner/Templates/daily.md",
      "Planner/Templates/weekly.md",
      "Planner/Templates/monthly.md",
      "Planner/Templates/project.md",
      "Planner/Templates/session-log.md",
      // Working agreement
      "Claude.backup.md",
    ],
  },
  {
    name: "full",
    outputFileName: "full-vault.zip",
    description: "Complete with examples (~50 files)",
    include: [
      // Everything - use glob pattern
      "**/*",
    ],
    exclude: [
      // Exclude build artifacts and system files
      ".DS_Store",
      "**/.DS_Store",
    ],
  },
];

export const config = {
  /** Source directory for vault files */
  sourceDir: "vault-source",
  /** Output directory for generated ZIPs */
  outputDir: "public/vaults",
  /** Template placeholder pattern */
  placeholderPattern: /\{\{(\w+)\}\}/g,
  /** Default template values */
  templateValues: {
    VAULT_NAME: "My AI-Ready Vault",
    USER_NAME: "Your Name",
    CURRENT_DATE: new Date().toISOString().split("T")[0],
  },
};
