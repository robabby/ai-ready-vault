# AI-Ready Vault Website - Implementation Plan

## Overview

A documentation website explaining AI-ready Obsidian vaults, with downloadable starter vault tiers.

**Location**: `~/Workbench/ai-ready-vault`
**Stack**: Next.js 16, TypeScript, Tailwind CSS 4, MDX
**Deployment**: Vercel (standalone domain TBD)

---

## Design System: Terminal/CLI Aesthetic

### Typography
- **Headings/Code**: JetBrains Mono (or Berkeley Mono)
- **Body**: Atkinson Hyperlegible (humanist, accessible)

### Colors
```css
--bg-primary: #1a1a2e;      /* Deep charcoal */
--bg-secondary: #16213e;    /* Slightly lighter */
--accent: #f4a261;          /* Warm amber */
--accent-hover: #e76f51;    /* Coral for hover */
--text-primary: #faf0e6;    /* Soft cream */
--text-muted: #a0a0b0;      /* Muted for secondary text */
--success: #4ecca3;         /* Teal for success states */
--border: #2a2a4a;          /* Subtle borders */
```

### Visual Elements
- Command-prompt style section headers (`> Guide`, `$ Downloads`)
- Animated typing effect for hero tagline
- Cursor blink animation
- Folder tree rendered with ASCII-style characters
- Code blocks with syntax highlighting (amber accents)
- Subtle scanline or CRT glow effect (optional, subtle)

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
│   ├── Header.tsx        # Nav with terminal-style logo
│   ├── Footer.tsx        # Minimal footer
│   └── Layout.tsx        # Wrapper with theme
├── home/
│   ├── Hero.tsx          # Typing animation hero
│   ├── FolderTree.tsx    # Interactive/animated tree
│   └── FeatureCard.tsx   # Feature highlights
├── guide/
│   └── CodeBlock.tsx     # Styled code blocks
├── downloads/
│   ├── TierCard.tsx      # Vault tier display
│   └── DownloadButton.tsx
└── ui/
    ├── CommandHeader.tsx # "> Section" style headers
    └── TerminalBox.tsx   # Terminal-styled containers
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
│   └── styles/
│       └── globals.css           # Tailwind + custom
├── public/
│   ├── vaults/                   # Generated ZIPs
│   │   ├── minimal-vault.zip
│   │   ├── standard-vault.zip
│   │   └── full-vault.zip
│   └── og-image.png              # Social sharing image
├── vault-source/                 # Master vault for generation
│   └── [full vault structure]
├── scripts/
│   └── build-vaults.ts
├── content/
│   └── guide.mdx                 # Guide content (if separate)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Implementation Phases

### Phase 1: Project Scaffold
- [ ] Create Next.js 16 project at `~/Workbench/ai-ready-vault`
- [ ] Configure Tailwind CSS 4
- [ ] Set up typography (JetBrains Mono, Atkinson Hyperlegible)
- [ ] Create CSS variables for color system
- [ ] Build Layout, Header, Footer components
- [ ] Create CommandHeader and TerminalBox UI components

### Phase 2: Home Page
- [ ] Hero component with typing animation
- [ ] FolderTree component (ASCII-style visualization)
- [ ] FeatureCard components
- [ ] Responsive layout

### Phase 3: Guide Content
- [ ] Configure MDX support
- [ ] Write guide content sections
- [ ] CodeBlock component with syntax highlighting
- [ ] Navigation within guide (anchor links or sections)

### Phase 4: Vault Source & Generation
- [ ] Create master vault in `vault-source/`
- [ ] Write CLAUDE.md template
- [ ] Write all template files
- [ ] Create build-vaults.ts script
- [ ] Generate tier ZIPs

### Phase 5: Downloads Page
- [ ] TierCard component
- [ ] DownloadButton component
- [ ] Getting started instructions
- [ ] Wire up ZIP downloads

### Phase 6: About Page
- [ ] Content and layout
- [ ] Links to Metatron Collective

### Phase 7: Polish & Deploy
- [ ] OG image (terminal aesthetic)
- [ ] Meta tags and SEO
- [ ] Responsive testing
- [ ] Vercel deployment
- [ ] Domain configuration

---

## Key Files to Create

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts and theme |
| `src/app/page.tsx` | Home page |
| `src/app/guide/page.mdx` | Guide content |
| `src/app/downloads/page.tsx` | Download tiers |
| `src/components/home/Hero.tsx` | Typing animation hero |
| `src/components/home/FolderTree.tsx` | Vault structure visual |
| `src/components/ui/CommandHeader.tsx` | `> Section` headers |
| `vault-source/CLAUDE.md` | Master CLAUDE.md template |
| `scripts/build-vaults.ts` | ZIP generation script |

---

## Notes

- No auth, analytics, or comments (YAGNI)
- Static ZIPs, no dynamic generation
- Dark mode only (matches aesthetic)
- Accessible: Atkinson Hyperlegible font, good contrast ratios
