/**
 * Generate favicon assets at build time.
 * Uses satori to render React to SVG, then sharp to convert to PNG/ICO.
 *
 * Run: pnpm build-favicon
 */

import satori from "satori";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

async function loadFont(): Promise<Buffer> {
  const fontPath = join(process.cwd(), "public/fonts/IBMPlexMono-Regular.ttf");

  if (existsSync(fontPath)) {
    return readFileSync(fontPath);
  }

  // Fetch TTF from GitHub (IBM Plex releases)
  console.log("  Fetching IBM Plex Mono from GitHub...");
  const response = await fetch(
    "https://github.com/IBM/plex/raw/master/packages/plex-mono/fonts/complete/ttf/IBMPlexMono-Regular.ttf"
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

// Design tokens (matching globals.css)
const colors = {
  bg: "#0c0c12",
  phosphor: "#e8b04b",
};

// Favicon component - simple ">" prompt in amber on dark background
function createFaviconSvg(size: number) {
  // Scale font size based on icon size
  const fontSize = Math.round(size * 0.7);
  const padding = Math.round(size * 0.1);

  return {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
        borderRadius: `${Math.round(size * 0.15)}px`,
        padding: `${padding}px`,
      },
      children: [
        {
          type: "span",
          props: {
            style: {
              color: colors.phosphor,
              fontSize: `${fontSize}px`,
              fontFamily: "IBM Plex Mono",
              fontWeight: 600,
              lineHeight: 1,
            },
            children: ">",
          },
        },
      ],
    },
  };
}

async function generateFavicon(
  fontData: Buffer,
  size: number,
  outputPath: string
) {
  const svg = await satori(createFaviconSvg(size), {
    width: size,
    height: size,
    fonts: [
      {
        name: "IBM Plex Mono",
        data: fontData,
        weight: 600,
        style: "normal",
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  writeFileSync(outputPath, png);

  return png;
}

async function generateFavicons() {
  console.log("Generating favicon assets...");

  const fontData = await loadFont();
  const publicDir = join(process.cwd(), "public");

  // Generate different sizes
  const sizes = [
    { size: 16, name: "favicon-16x16.png" },
    { size: 32, name: "favicon-32x32.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 192, name: "android-chrome-192x192.png" },
    { size: 512, name: "android-chrome-512x512.png" },
  ];

  for (const { size, name } of sizes) {
    const outputPath = join(publicDir, name);
    await generateFavicon(fontData, size, outputPath);
    console.log(`  Created: ${name}`);
  }

  // Create favicon.ico from 32x32 PNG
  // ICO format is just PNG with .ico extension for modern browsers
  const favicon32 = await generateFavicon(
    fontData,
    32,
    join(publicDir, "favicon.ico")
  );
  console.log("  Created: favicon.ico");

  console.log("Done!");
}

generateFavicons().catch(console.error);
