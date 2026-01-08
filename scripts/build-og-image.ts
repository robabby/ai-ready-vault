/**
 * Generate static OG image at build time.
 * Uses satori to render React to SVG, then sharp to convert to PNG.
 *
 * Run: pnpm build-og
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
  phosphorBright: "#f5c96a",
  phosphorDim: "#a67c32",
  text: "#d9d4c8",
  textMuted: "#8a8577",
  error: "#e85c4a",
  success: "#7dce82",
};

// OG Image component (as JSX object for satori)
const ogImage = {
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: colors.bg,
      padding: "60px",
      fontFamily: "IBM Plex Mono",
      position: "relative",
    },
    children: [
      // Scanline effect (simplified)
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          },
        },
      },
      // Vignette
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          },
        },
      },
      // Window controls
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: colors.error,
                  opacity: 0.8,
                },
              },
            },
            {
              type: "div",
              props: {
                style: {
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: colors.phosphorDim,
                  opacity: 0.8,
                },
              },
            },
            {
              type: "div",
              props: {
                style: {
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: colors.success,
                  opacity: 0.8,
                },
              },
            },
            {
              type: "span",
              props: {
                style: {
                  color: colors.textMuted,
                  fontSize: "18px",
                  marginLeft: "12px",
                },
                children: "vault.sh",
              },
            },
          ],
        },
      },
      // Command prompt
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            marginBottom: "24px",
          },
          children: [
            {
              type: "span",
              props: {
                style: { color: colors.phosphorDim, fontSize: "28px" },
                children: "$",
              },
            },
            {
              type: "span",
              props: {
                style: { color: colors.text, fontSize: "28px", marginLeft: "12px" },
                children: "cat README.md",
              },
            },
          ],
        },
      },
      // Title
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "32px",
          },
          children: [
            {
              type: "span",
              props: {
                style: {
                  fontSize: "72px",
                  color: colors.phosphor,
                  letterSpacing: "0.05em",
                },
                children: "> AI-READY VAULT",
              },
            },
          ],
        },
      },
      // Subtitle
      {
        type: "div",
        props: {
          style: {
            fontSize: "28px",
            color: colors.text,
            marginBottom: "48px",
            maxWidth: "800px",
            lineHeight: 1.5,
          },
          children:
            "Build an Obsidian vault optimized for AI collaboration with Claude.",
        },
      },
      // Folder structure
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "22px",
            color: colors.textMuted,
          },
          children: [
            {
              type: "span",
              props: {
                style: { color: colors.phosphorBright },
                children: "vault/",
              },
            },
            {
              type: "span",
              props: {
                style: { marginLeft: "24px", color: colors.phosphorBright },
                children: "CLAUDE.md",
              },
            },
            {
              type: "span",
              props: {
                style: { marginLeft: "24px" },
                children: "Projects/",
              },
            },
            {
              type: "span",
              props: {
                style: { marginLeft: "24px" },
                children: "Areas/AI/Memory/",
              },
            },
          ],
        },
      },
      // Cursor
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: "60px",
            left: "60px",
            display: "flex",
          },
          children: [
            {
              type: "span",
              props: {
                style: { color: colors.phosphorDim, fontSize: "24px" },
                children: "$",
              },
            },
            {
              type: "div",
              props: {
                style: {
                  width: "14px",
                  height: "28px",
                  backgroundColor: colors.phosphor,
                  marginLeft: "12px",
                },
              },
            },
          ],
        },
      },
      // Branding
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: "60px",
            right: "60px",
            display: "flex",
            alignItems: "center",
          },
          children: [
            {
              type: "span",
              props: {
                style: { color: colors.textMuted, fontSize: "20px" },
                children: "metatron.sh",
              },
            },
          ],
        },
      },
    ],
  },
};

async function generateOGImage() {
  console.log("Generating OG image...");

  const fontData = await loadFont();

  // Generate SVG with satori
  const svg = await satori(ogImage, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "IBM Plex Mono",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  // Convert SVG to PNG with sharp
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  // Write to public folder
  const outputPath = join(process.cwd(), "public/og-image.png");
  writeFileSync(outputPath, png);

  console.log(`  Created: ${outputPath}`);
  console.log("Done!");
}

generateOGImage().catch(console.error);
