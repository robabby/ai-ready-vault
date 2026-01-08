# AI-Ready Vault Website - Implementation Plan

## Overview

A documentation website explaining AI-ready Obsidian vaults, with downloadable starter vault tiers.

**Location**: `~/Workbench/ai-ready-vault`
**Stack**: Next.js 16, TypeScript, Tailwind CSS 4, MDX
**Package Manager**: pnpm
**Deployment**: Vercel (standalone domain TBD)

---

## Design System: Retro Terminal Aesthetic

**Concept**: A P3 amber phosphor terminal from 1987, lovingly preserved. Not "terminal-inspired" — an actual terminal that happens to be a website. The glass curves. The phosphors glow and bleed. The boot sequence takes time.

### Typography

**The Commitment**: One monospace font throughout. Hierarchy through *treatment*, not size.

| Role | Font | Fallback |
|------|------|----------|
| **Everything** | IBM Plex Mono | JetBrains Mono, Courier New |

**Why IBM Plex Mono**: Industrial heritage, ties to computing history, less precious than Berkeley Mono. Actual IBM DNA.

**Type Scale** (intentionally flat):
```css
--text-base: 1rem;      /* 16px - the one true size */
--text-loud: 1.125rem;  /* 18px - for hero only */
--text-quiet: 0.875rem; /* 14px - metadata, timestamps */
```

**Hierarchy through treatment, not size**:
- Headers: `text-transform: uppercase; letter-spacing: 0.1em; color: var(--phosphor);`
- Prefixes: `> `, `$ `, `#` in accent color
- Emphasis: Glow effect, not font-weight
- De-emphasis: Muted color, not smaller size

### Color System

**The Commitment**: Monochromatic amber. No cyan. No teal. One phosphor color, like a real P3 monitor.

```css
/* Backgrounds - warm black (NOT GitHub blue-black) */
--bg-void: #050508;         /* True black, CRT off */
--bg-primary: #0c0c12;      /* Main - warm undertone */
--bg-elevated: #141419;     /* Cards - distinct step */
--bg-surface: #1c1c24;      /* Interactive surfaces */
--bg-code: #08080c;         /* Code blocks - darker */

/* P3 Phosphor Amber (aged, authentic) */
--phosphor-bright: #f5c96a; /* Maximum brightness */
--phosphor: #e8b04b;        /* Primary - the one true color */
--phosphor-dim: #a67c32;    /* Hover states, muted */
--phosphor-ghost: rgba(232, 176, 75, 0.12);

/* Functional (amber-derived, not new hues) */
--success: #7dce82;         /* Green - only for explicit success */
--error: #e85c4a;           /* Red - only for explicit errors */
--warning: var(--phosphor); /* Warnings use phosphor */

/* Text (warm whites, not blue-whites) - WCAG AA compliant */
--text-bright: #f5f0e8;     /* High emphasis - cream */
--text-primary: #d9d4c8;    /* Body text */
--text-muted: #8a8577;      /* Secondary, timestamps - 5.2:1 contrast (FIXED from #706b60) */
--text-disabled: #5a5a52;   /* Disabled states - large text only (3.5:1) */

/* States */
--selection: rgba(232, 176, 75, 0.25);
--focus-ring: 0 0 0 2px var(--phosphor), 0 0 12px var(--phosphor-ghost);
--code-highlight: rgba(232, 176, 75, 0.08);

/* Structure */
--border: #2a2a32;          /* Subtle, warm */
--border-bright: #3d3d48;   /* Emphasized */
```

**Key decisions:**
- NO cyan/teal — links use `--phosphor-bright`
- Backgrounds have warm purple-black undertone, not GitHub's blue-black
- Text is cream/warm white, not cold blue-white
- Selection highlight is amber, reinforcing the monochrome

### Atmosphere & Texture

**The Commitment**: Physicality. A CRT wasn't a flat screen with lines — it was a glass dome with electron guns. We simulate the *object*, not just the output.

**1. Phosphor Glow** (asymmetric bloom with color fringing):
```css
.glow {
  text-shadow:
    0 0 2px var(--phosphor),
    -1px 0 8px rgba(232, 176, 75, 0.8),
    1px 0 12px rgba(245, 201, 106, 0.5),
    0 0 30px var(--phosphor-ghost),
    0 0 60px rgba(232, 176, 75, 0.15);
}
```

**2. Scanlines** (visible, with RGB subpixel simulation):
```css
.scanlines::before {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 1px,
    rgba(0, 0, 0, 0.15) 1px,  /* 0.15, not 0.1 */
    rgba(0, 0, 0, 0.15) 2px
  );
  image-rendering: pixelated;
}

/* Optional RGB subpixels */
.scanlines::after {
  background: repeating-linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.02) 0px,
    rgba(0, 255, 0, 0.02) 1px,
    rgba(0, 0, 255, 0.02) 2px,
    transparent 3px
  );
  mix-blend-mode: overlay;
}
```

**3. Screen Curvature** (the missing piece):
```css
.crt-screen {
  border-radius: 20px / 25px;
  overflow: hidden;
  transform: perspective(1000px) rotateX(0.5deg);
}

.crt-bezel {
  padding: 20px;
  background: linear-gradient(145deg, #2a2a3a, #1a1a2a, #0a0a15);
  border-radius: 25px;
  box-shadow:
    inset 2px 2px 5px rgba(255, 255, 255, 0.05),
    inset -2px -2px 5px rgba(0, 0, 0, 0.5),
    0 10px 40px rgba(0, 0, 0, 0.5);
}
```

**4. Vignette** (radial, with corner falloff):
```css
.vignette::before {
  background: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
```

**5. Grain** (visible, animated):
```css
.grain {
  opacity: 0.06;  /* Visible, not 0.03 */
  animation: grain-shift 0.5s steps(1) infinite;
}
```

**6. Screen Flicker** (subtle, periodic):
```css
@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.97; }
  94% { opacity: 1; }
}
```

### Motion Design

**The Commitment**: Slow enough to create atmosphere. Hard cuts, not fades. Imperfection over precision.

**Boot Sequence** (2.5-3.5 seconds, skippable):
```
0ms      - CRT power-on effect (scaleY: 0.005 → 1)
400ms    - Black screen settles, cursor appears (block, blinking)
800ms    - First line types: "> INITIALIZING AI-READY VAULT"
1400ms   - System checks: "CLAUDE.MD: FOUND | PLUGINS: OK"
1800ms   - Brief screen flicker (40ms)
2000ms   - Main content appears (hard cut, NOT fade)
2200ms   - Staggered element reveals (variable: 40-120ms, not uniform)
3000ms   - Full render, interactions enabled
```

**Key principles:**
- NO fades — content *appears* instantly (hard cuts)
- Stagger timing is *variable* (40ms, 80ms, 50ms, 120ms) not metronomic
- Cursor blink occasionally stutters (95% regular, 5% double-blink)
- Press any key to skip boot sequence

**Micro-interactions**:
- **Cursor**: Block cursor, 1s blink with occasional stutter
- **Buttons**: Border brightens first (100ms), then 2px lift (no shadow — shadows are anti-terminal)
- **Links**: Underline is `background` pseudo-element with glow, draws left-to-right
- **Cards**: Scan-line passes over on hover OR border glow intensifies
- **Selection**: Inverted colors (phosphor bg, dark text) like real terminals
- **Scroll**: Slight "chunking" feel, not butter-smooth

**Loading states** (ASCII progress bars, not spinners):
```
[=========>          ] 47%
```

**Signature moment** (the memorable thing):
When vault ZIP downloads, show ASCII art animation of files cascading into folder (2-3 seconds, skippable).

```css
/* CRT Power-on */
@keyframes crt-power-on {
  0% {
    filter: brightness(0);
    transform: scaleY(0.005) scaleX(0.8);
  }
  10% {
    filter: brightness(2);
    transform: scaleY(0.005) scaleX(0.8);
  }
  30% { transform: scaleY(1.1) scaleX(0.95); }
  50% { filter: brightness(1.5); }
  100% {
    filter: brightness(1);
    transform: scaleY(1) scaleX(1);
  }
}

/* Cursor blink with occasional stutter */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Typing - character by character */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
```

### Visual Elements

- **Command Headers**: `> SECTION_NAME` — uppercase, letter-spaced, phosphor color, glow
- **Terminal Boxes**: CRT bezel frame, screen curvature, scanlines inside
- **ASCII Folder Tree**: Box-drawing characters (─ │ ├ └), typed in character-by-character
- **Code Blocks**: `--bg-code`, phosphor syntax, line numbers in muted, glow on highlighted lines
- **Buttons**: Outlined only (no fills), border brightens on hover, 2px lift
- **Download Cards**: Full CRT bezel treatment, title bar with dots, screen inside
- **Text Selection**: Inverted (phosphor background, dark text)

### Spatial Composition

**Grid**: 8px base unit
**Max Width**: 1000px content (narrower for terminal feel), 1200px with margins
**Layout**: Centered, single-column for content. Hero can break wider.
**Negative Space**: Generous — terminals had lots of empty screen

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 1rem;      /* 16px */
--space-4: 1.5rem;    /* 24px */
--space-5: 2rem;      /* 32px */
--space-6: 3rem;      /* 48px */
--space-7: 4rem;      /* 64px */
--space-8: 6rem;      /* 96px */
```

### Accessibility & Performance

**Reduced motion**: Fully disable effects (not just speed them up):
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-play-state: paused !important; }
  .grain { display: none !important; }
  [data-boot-sequence] { opacity: 1 !important; }
}
```

**Performance Tiers** (mobile → tablet → desktop):
```css
/* Mobile (< 768px): Minimal - scanlines only */
@media (max-width: 767px) {
  .crt-screen { transform: none !important; }
  .glow { text-shadow: none !important; color: var(--phosphor-bright); }
  .grain { display: none !important; }
}

/* Tablet (768-1023px): Reduced - scanlines + vignette + subtle glow */
/* Desktop (1024px+): Full - all effects */
```

**Performance**:
- CRT effects use `will-change: transform` and `contain: strict`
- Grain texture is small PNG (< 5KB, not SVG)
- Limit blur effects to key elements only
- 44x44px minimum touch targets on mobile

---

## Site Structure

### Pages

1. **Home** (`/`)
   - Hero with typing animation: "Build an AI-ready vault"
   - Visual folder tree diagram
   - Three feature cards (Structure, Workflow, Memory)
   - CTA buttons to Guide and Downloads

2. **Guide** (`/guide`) - MDX content
   - What makes a vault AI-ready
   - The CLAUDE.md file explained
   - Folder structure (PARA-esque)
   - Session workflow (hydrate/reflect/remember/recall)
   - Memory system architecture
   - Anti-patterns to avoid
   - Working with Claude Code

3. **Downloads** (`/downloads`)
   - Three tier cards with descriptions
   - File counts and what's included
   - Download buttons (ZIP files)
   - "Getting Started" quick instructions

4. **About** (`/about`)
   - Background on the approach
   - Link to Metatron Collective
   - Contact/social links

### Components
```
src/components/
├── layout/
│   ├── Header.tsx          # Nav with terminal-style logo
│   ├── Footer.tsx          # Minimal footer
│   ├── PageWrapper.tsx     # Page container (renamed from Layout.tsx)
│   └── BootSequence.tsx    # Boot animation orchestrator [NEW]
├── home/
│   ├── Hero.tsx            # Typing animation hero (with parallel SR tracks)
│   ├── FolderTree.tsx      # Interactive/animated tree
│   └── FeatureCard.tsx     # Feature highlights
├── downloads/
│   ├── TierCard.tsx        # Vault tier display
│   ├── DownloadButton.tsx  # Download handler
│   └── DownloadAnimation.tsx # ASCII file cascade [NEW]
└── ui/
    ├── CommandHeader.tsx   # "> Section" headers (SR-friendly)
    ├── TerminalBox.tsx     # Terminal-styled containers
    ├── CRTScreen.tsx       # CRT effect wrapper [NEW]
    ├── CodeBlock.tsx       # Syntax highlighting (moved from guide/)
    ├── Cursor.tsx          # Blinking cursor [NEW]
    └── Link.tsx            # Phosphor glow link [NEW]
```

---

## Starter Vault Tiers

### Minimal (~10 files)
```
minimal-vault/
├── .obsidian/
│   └── plugins.json      # Recommended plugin list (not installed)
├── Archive/
├── Areas/
├── Contacts/
├── Inbox/
├── Planner/
│   └── Templates/
├── Projects/
│   ├── Active/
│   ├── Backlog/
│   └── Completed/
├── Resources/
├── Studio/
├── CLAUDE.md             # Template with placeholders
└── Home.md               # Basic dashboard
```

### Standard (~25 files)
Everything in Minimal, plus:
```
+ Areas/AI/
    ├── Memory/
    │   ├── Memory.md     # Dashboard with DataView queries
    │   ├── Episodic/
    │   ├── Semantic/
    │   ├── Procedural/
    │   └── Strategic/
    └── Collaboration/
        └── Sessions/
+ Planner/Templates/
    ├── daily.md
    ├── weekly.md
    ├── monthly.md
    ├── project.md
    └── session-log.md
+ Claude.backup.md        # Working agreement template
```

### Full (~50 files)
Everything in Standard, plus:
```
+ Example memories in each category
+ Sample project in Projects/Active/
+ Populated session log examples
+ Working DataView queries
+ Pre-configured .obsidian/ with plugins
```

### Build Script
`scripts/build-vaults.ts` - Generates ZIPs from `vault-source/` master vault:
- Copies appropriate files per tier
- Replaces template values
- Creates ZIP archives in `public/vaults/`

---

## Project Structure

```
~/Workbench/ai-ready-vault/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home
│   │   ├── guide/
│   │   │   └── page.mdx
│   │   ├── downloads/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   └── [as listed above]
│   ├── hooks/                    # useReducedMotion [NEW]
│   ├── store/                    # useBootStore (Zustand) [NEW]
│   ├── lib/                      # mdx-components, a11y utilities [NEW]
│   └── styles/
│       └── globals.css           # Tailwind @theme/@utility + custom
├── public/
│   ├── vaults/                   # Generated ZIPs
│   │   ├── minimal-vault.zip
│   │   ├── standard-vault.zip
│   │   └── full-vault.zip
│   ├── grain.png                 # CRT grain texture (< 5KB) [NEW]
│   └── og-image.png              # Social sharing image
├── vault-source/                 # Master vault for generation
│   └── [full vault structure]
├── scripts/
│   ├── build-vaults.ts
│   └── lib/                      # zip-generator, template-replacer [NEW]
├── vault-tiers.config.ts         # Tier definitions [NEW]
├── package.json
├── tsconfig.json
└── next.config.ts                # MDX + static export
```

---

## Implementation Phases

### Phase 0: Tooling Foundation
**Linear:** [SG-151](https://linear.app/sherpagg/issue/SG-151/phase-0-tooling-foundation) | **Branch:** `sg-151-phase-0-tooling-foundation`

- [ ] Install dependencies: `pnpm add zustand archiver fs-extra`
- [ ] Install dev dependencies: `pnpm add -D tsx @types/archiver @types/fs-extra zod`
- [ ] Create `vault-tiers.config.ts` with tier definitions
- [ ] Create `vault-source/` directory structure
- [ ] Create `scripts/lib/zip-generator.ts`
- [ ] Create `scripts/lib/template-replacer.ts`
- [ ] Create `scripts/build-vaults.ts` main script
- [ ] Test: `pnpm build-vaults` generates all ZIPs
- [ ] Configure `next.config.ts` for MDX + static export

### Phase 1: Design System & Core Components
**Linear:** [SG-144](https://linear.app/sherpagg/issue/SG-144/phase-1-design-system-and-core-components) | **Branch:** `sg-144-phase-1-design-system-core-components`

- [ ] Create Next.js 16 project at `~/Workbench/ai-ready-vault`
- [ ] Configure Tailwind CSS 4 with `@theme` and `@utility` directives
- [ ] Set up typography (IBM Plex Mono via next/font)
- [ ] Create globals.css with design system tokens
- [ ] Build CRTScreen.tsx (performance-tiered effects)
- [ ] Build CommandHeader.tsx (screen reader friendly)
- [ ] Build TerminalBox.tsx, Cursor.tsx, Link.tsx
- [ ] Implement useReducedMotion.ts hook
- [ ] Test reduced motion handling

### Phase 2: Layout & Boot Sequence
**Linear:** [SG-145](https://linear.app/sherpagg/issue/SG-145/phase-2-layout-and-boot-sequence) | **Branch:** `sg-145-phase-2-layout-boot-sequence`

- [ ] Set up app/layout.tsx with IBM Plex Mono font
- [ ] Implement useBootStore.ts (Zustand with localStorage)
- [ ] Build BootSequence.tsx with skip functionality
- [ ] Build Header.tsx, Footer.tsx, PageWrapper.tsx
- [ ] Create placeholder pages (all routes)

### Phase 3: Home Page
**Linear:** [SG-152](https://linear.app/sherpagg/issue/SG-152/phase-3-home-page) | **Branch:** `sg-152-phase-3-home-page`

- [ ] Hero component with typing animation (parallel SR tracks)
- [ ] FolderTree component (ASCII-style, accessible)
- [ ] FeatureCard components
- [ ] Responsive layout

### Phase 4: Guide Content
**Linear:** [SG-146](https://linear.app/sherpagg/issue/SG-146/phase-4-guide-content) | **Branch:** `sg-146-phase-4-guide-content`

- [ ] Configure MDX with mdx-components.tsx
- [ ] Build CodeBlock.tsx with syntax highlighting
- [ ] Write guide content sections
- [ ] Navigation within guide (anchor links or sections)

### Phase 5: Downloads Page
**Linear:** [SG-148](https://linear.app/sherpagg/issue/SG-148/phase-5-downloads-page) | **Branch:** `sg-148-phase-5-downloads-page`

- [ ] TierCard component
- [ ] DownloadButton component
- [ ] DownloadAnimation.tsx (ASCII file cascade)
- [ ] Getting started instructions
- [ ] Wire up vault downloads

### Phase 6: About Page & Polish
**Linear:** [SG-149](https://linear.app/sherpagg/issue/SG-149/phase-6-about-page-and-polish) | **Branch:** `sg-149-phase-6-about-page-polish`

- [ ] About page content and layout
- [ ] Links to Metatron Collective
- [ ] OG image generation (terminal aesthetic)
- [ ] Meta tags and SEO
- [ ] Lighthouse audit (target: 90+ perf, 100 a11y)
- [ ] Mobile testing
- [ ] Vercel deployment
- [ ] Domain configuration

---

## Key Files to Create

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts and CRTScreen |
| `src/app/page.tsx` | Home page |
| `src/app/guide/page.mdx` | Guide content |
| `src/app/downloads/page.tsx` | Download tiers |
| `src/components/ui/CRTScreen.tsx` | CRT effect wrapper |
| `src/components/layout/BootSequence.tsx` | Boot animation |
| `src/components/home/Hero.tsx` | Typing animation hero |
| `src/hooks/useReducedMotion.ts` | Motion preference detection |
| `src/store/useBootStore.ts` | Zustand boot state |
| `src/lib/mdx-components.tsx` | MDX component mapping |
| `vault-source/CLAUDE.md` | Master CLAUDE.md template |
| `vault-tiers.config.ts` | Tier definitions |
| `scripts/build-vaults.ts` | ZIP generation script |

---

## Notes

- No auth, analytics, or comments (YAGNI)
- Static ZIPs, no dynamic generation
- Dark mode only (matches aesthetic)
- **State management**: Zustand for boot sequence (persisted to localStorage)
- **Accessibility**: WCAG AA contrast ratios, proper reduced motion, screen reader support
- **Performance**: Three tiers (mobile/tablet/desktop) with progressive enhancement
