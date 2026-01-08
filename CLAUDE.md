# AI-Ready Vault Website

## Project Overview

Documentation website explaining AI-ready Obsidian vaults, with downloadable starter vault tiers.

**Stack**: Next.js 16, TypeScript, Tailwind CSS 4, MDX
**Package Manager**: pnpm
**Deployment**: Vercel

## Design System

### Retro Terminal Aesthetic
**Concept**: A P3 amber phosphor terminal from 1987. Not "terminal-inspired" — an actual terminal that happens to be a website.

- Command headers: `> SECTION` (uppercase, phosphor glow)
- Boot sequence: 2.5-3s (power-on → typing → content appears), skippable via any key
- CRT effects: screen curvature, bezel, scanlines, vignette, grain
- Hard cuts (no fades), variable timing (not metronomic)
- Dark mode only
- Performance tiers: minimal (mobile), reduced (tablet), full (desktop)

### Typography
- **Everything**: IBM Plex Mono (one font, hierarchy through treatment)
- Hierarchy via: uppercase, letter-spacing, color, prefixes — NOT size
- Line height: 1.65 for body text (higher than typical for monospace readability)

### Color Palette (Monochromatic Amber)

Tailwind CSS 4 uses `@theme` directive (not JS config):
```css
@theme {
  /* Backgrounds (warm black, not blue-black) */
  --color-void: #050508;
  --color-bg: #0c0c12;
  --color-elevated: #141419;
  --color-surface: #1c1c24;
  --color-code: #08080c;

  /* P3 Phosphor Amber */
  --color-phosphor-bright: #f5c96a;
  --color-phosphor: #e8b04b;
  --color-phosphor-dim: #a67c32;
  --color-phosphor-ghost: rgba(232, 176, 75, 0.12);

  /* Functional only */
  --color-success: #7dce82;
  --color-error: #e85c4a;

  /* Text (warm whites) - WCAG AA compliant */
  --color-text-bright: #f5f0e8;
  --color-text: #d9d4c8;
  --color-text-muted: #8a8577;  /* 5.2:1 contrast - FIXED from #706b60 */
}
```

**NO cyan/teal** — links use phosphor-bright

### Accessibility Patterns

**Reduced Motion**: Fully disable effects (don't just speed them up):
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-play-state: paused !important; }
  .grain { display: none !important; }
  [data-boot-sequence] { opacity: 1 !important; }
}
```

**Screen Readers**: Use parallel content tracks for animations:
```tsx
<h1 className="sr-only">Build an AI-ready vault</h1>
<div aria-hidden="true"><TypingAnimation text="..." /></div>
```

### State Management

Use **Zustand** for boot sequence state (persisted to localStorage):
```typescript
// src/store/useBootStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBootStore = create(persist((set) => ({
  isBootComplete: false,
  hasSeenBootBefore: false,
  skipBootSequence: () => set({ isBootComplete: true }),
}), { name: 'boot-storage' }));
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
│   ├── layout/               # Header, Footer, PageWrapper, BootSequence
│   ├── home/                 # Hero, FolderTree, FeatureCard
│   ├── downloads/            # TierCard, DownloadButton, DownloadAnimation
│   └── ui/                   # CommandHeader, TerminalBox, CRTScreen, CodeBlock, Cursor, Link
├── hooks/                    # useReducedMotion
├── store/                    # useBootStore (Zustand)
├── lib/                      # mdx-components, a11y utilities
└── styles/globals.css

vault-source/                 # Master vault for ZIP generation
scripts/build-vaults.ts       # Generates vault ZIPs
public/vaults/                # Generated ZIPs (minimal, standard, full)
```

## Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm build-vaults # Generate vault ZIPs
```

## Key Implementation Notes

- **No auth/analytics/comments** - YAGNI
- **Static ZIPs** - no dynamic generation
- **Accessible** - WCAG AA contrast ratios, proper reduced motion, screen reader support
- **State management** - Zustand for boot sequence (persisted to localStorage)
- Use MDX for guide content
- Vault tiers: Minimal (~10 files), Standard (~25 files), Full (~50 files)

## Current Phase

See PLAN.md for implementation phases and checklist.
