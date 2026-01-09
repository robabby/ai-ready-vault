#!/usr/bin/env tsx
/**
 * Vault ZIP Generator
 *
 * Generates the AI-Ready Vault ZIP archive.
 * Run with: pnpm build-vaults
 */

import { readFile, readdir, stat, ensureDir, pathExists } from "fs-extra";
import path from "path";
import { minimatch } from "minimatch";
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
const SOURCE_DIR = path.join(ROOT_DIR, "vault-source");
const OUTPUT_DIR = path.join(ROOT_DIR, "public/vaults");
const OUTPUT_FILENAME = "ai-ready-vault.zip";
const EXCLUDE_PATTERNS = [".DS_Store", "**/.DS_Store"];

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
 * Check if a file matches any exclusion pattern
 */
function isExcluded(file: string): boolean {
  return EXCLUDE_PATTERNS.some((pattern) =>
    minimatch(file, pattern, { matchBase: true })
  );
}

/**
 * Build the vault ZIP archive
 */
async function buildVault(allFiles: string[]): Promise<void> {
  console.log("\n  Building AI-Ready Vault...");

  const files = allFiles.filter((file) => !isExcluded(file));
  const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILENAME);
  const baseName = "ai-ready-vault";

  const { archive, finalize } = createZipArchive({
    outputPath,
    baseName,
  });

  const templateValues = getDefaultTemplateValues();

  for (const file of files) {
    const fullPath = path.join(SOURCE_DIR, file);
    let content: string | Buffer;

    const fileStat = await stat(fullPath);
    if (fileStat.isFile()) {
      const rawContent = await readFile(fullPath);

      // Apply template replacement for text files
      if (file.endsWith(".md") || file.endsWith(".json")) {
        content = replaceTemplateValues(
          rawContent.toString("utf-8"),
          templateValues
        );
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
  console.log("Building vault archive...");
  console.log(`  Source: vault-source`);
  console.log(`  Output: public/vaults`);

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

  // Build the vault
  await buildVault(allFiles);

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
