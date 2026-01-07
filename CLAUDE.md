# AI-Ready Vault Website

## Project Overview

Documentation website explaining AI-ready Obsidian vaults, with downloadable starter vault tiers.

**Stack**: Next.js 16, TypeScript, Tailwind CSS 4, MDX
**Deployment**: Vercel

## Design System

### Terminal/CLI Aesthetic
- Command-prompt style headers (`> Guide`, `$ Downloads`)
- Animated typing effects, cursor blinks
- ASCII folder trees
- Dark mode only

### Typography
- **Headings/Code**: JetBrains Mono
- **Body**: Atkinson Hyperlegible

### Color Palette
```css
--bg-primary: #1a1a2e;      /* Deep charcoal */
--bg-secondary: #16213e;    /* Slightly lighter */
--accent: #f4a261;          /* Warm amber */
--accent-hover: #e76f51;    /* Coral for hover */
--text-primary: #faf0e6;    /* Soft cream */
--text-muted: #a0a0b0;      /* Muted for secondary */
--success: #4ecca3;         /* Teal for success */
--border: #2a2a4a;          /* Subtle borders */
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── guide/page.mdx        # Guide content
│   ├── downloads/page.tsx    # Download tiers
│   └── about/page.tsx
├── components/
│   ├── layout/               # Header, Footer, Layout
│   ├── home/                 # Hero, FolderTree, FeatureCard
│   ├── guide/                # CodeBlock
│   ├── downloads/            # TierCard, DownloadButton
│   └── ui/                   # CommandHeader, TerminalBox
└── styles/globals.css

vault-source/                 # Master vault for ZIP generation
scripts/build-vaults.ts       # Generates vault ZIPs
public/vaults/                # Generated ZIPs (minimal, standard, full)
```

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run build-vaults # Generate vault ZIPs
```

## Key Implementation Notes

- **No auth/analytics/comments** - YAGNI
- **Static ZIPs** - no dynamic generation
- **Accessible** - Atkinson Hyperlegible font, good contrast ratios
- Use MDX for guide content
- Vault tiers: Minimal (~10 files), Standard (~25 files), Full (~50 files)

## Current Phase

See PLAN.md for implementation phases and checklist.
