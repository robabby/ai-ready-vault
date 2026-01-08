/**
 * ZIP archive generator utility
 *
 * Creates ZIP archives from source directories using archiver.
 */

import archiver, { type Archiver } from "archiver";
import { createWriteStream } from "fs";
import path from "path";

export interface ZipOptions {
  /** Output file path */
  outputPath: string;
  /** Base directory name inside the ZIP */
  baseName: string;
}

export interface ZipResult {
  outputPath: string;
  fileCount: number;
  totalBytes: number;
}

/**
 * Create a new ZIP archive builder
 */
export function createZipArchive(options: ZipOptions): {
  archive: Archiver;
  finalize: () => Promise<ZipResult>;
} {
  const output = createWriteStream(options.outputPath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Maximum compression
  });

  let fileCount = 0;

  archive.on("entry", () => {
    fileCount++;
  });

  archive.pipe(output);

  const finalize = (): Promise<ZipResult> => {
    return new Promise((resolve, reject) => {
      output.on("close", () => {
        resolve({
          outputPath: options.outputPath,
          fileCount,
          totalBytes: archive.pointer(),
        });
      });

      archive.on("error", reject);
      archive.finalize();
    });
  };

  return { archive, finalize };
}

/**
 * Add a file to the archive with content
 */
export function addFileToArchive(
  archive: Archiver,
  baseName: string,
  relativePath: string,
  content: string | Buffer
): void {
  const archivePath = path.join(baseName, relativePath);
  archive.append(content, { name: archivePath });
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
