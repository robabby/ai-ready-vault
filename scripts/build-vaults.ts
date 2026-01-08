#!/usr/bin/env tsx
/**
 * Vault ZIP Generator
 *
 * Generates downloadable ZIP archives for each vault tier.
 * Run with: pnpm build-vaults
 */

import { readFile, readdir, stat, ensureDir, pathExists } from "fs-extra";
import path from "path";
import { minimatch } from "minimatch";
import { vaultTiers, config, type VaultTier } from "../vault-tiers.config";
import {
  createZipArchive,
  addFileToArchive,
  formatBytes,
} from "./lib/zip-generator";
import {
  replaceTemplateValues,
  getDefaultTemplateValues,
} from "./lib/template-replacer";

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, config.sourceDir);
const OUTPUT_DIR = path.join(ROOT_DIR, config.outputDir);

/**
 * Recursively get all files in a directory
 */
async function getAllFiles(dir: string, base: string = ""): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const relativePath = path.join(base, entry.name);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Check if a file matches any pattern in the list
 */
function matchesPatterns(file: string, patterns: string[]): boolean {
  return patterns.some((pattern) =>
    minimatch(file, pattern, { matchBase: true })
  );
}

/**
 * Get files for a specific tier
 */
async function getFilesForTier(
  allFiles: string[],
  tier: VaultTier
): Promise<string[]> {
  // For explicit file lists (minimal and standard tiers)
  if (!tier.include.includes("**/*")) {
    return tier.include.filter((pattern) => {
      // Check if it's an exact file match
      return allFiles.includes(pattern);
    });
  }

  // For glob patterns (full tier)
  let files = allFiles;

  // Apply exclusions
  if (tier.exclude && tier.exclude.length > 0) {
    files = files.filter((file) => !matchesPatterns(file, tier.exclude!));
  }

  return files;
}

/**
 * Build a single vault tier
 */
async function buildTier(tier: VaultTier, allFiles: string[]): Promise<void> {
  console.log(`\n  Building ${tier.name} vault...`);

  const files = await getFilesForTier(allFiles, tier);
  const outputPath = path.join(OUTPUT_DIR, tier.outputFileName);
  const baseName = tier.outputFileName.replace(".zip", "");

  const { archive, finalize } = createZipArchive({
    outputPath,
    baseName,
  });

  const templateValues = getDefaultTemplateValues();

  for (const file of files) {
    const fullPath = path.join(SOURCE_DIR, file);
    let content: string | Buffer;

    // Read file content
    const fileStat = await stat(fullPath);
    if (fileStat.isFile()) {
      const rawContent = await readFile(fullPath);

      // Apply template replacement for text files
      if (file.endsWith(".md") || file.endsWith(".json")) {
        content = replaceTemplateValues(rawContent.toString("utf-8"), templateValues);
      } else {
        content = rawContent;
      }

      addFileToArchive(archive, baseName, file, content);
    }
  }

  const result = await finalize();

  console.log(`    Files: ${result.fileCount}`);
  console.log(`    Size: ${formatBytes(result.totalBytes)}`);
  console.log(`    Output: ${path.relative(ROOT_DIR, result.outputPath)}`);
}

/**
 * Main build function
 */
async function main(): Promise<void> {
  console.log("Building vault archives...");
  console.log(`  Source: ${config.sourceDir}`);
  console.log(`  Output: ${config.outputDir}`);

  // Verify source directory exists
  if (!(await pathExists(SOURCE_DIR))) {
    console.error(`Error: Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Ensure output directory exists
  await ensureDir(OUTPUT_DIR);

  // Get all files from source
  const allFiles = await getAllFiles(SOURCE_DIR);
  console.log(`\n  Found ${allFiles.length} source files`);

  // Build each tier
  for (const tier of vaultTiers) {
    await buildTier(tier, allFiles);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
