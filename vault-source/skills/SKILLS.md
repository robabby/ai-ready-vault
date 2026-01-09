# AI Ready Vault Skills

Composable skills for making any Obsidian vault AI-ready.

## Overview

These skills work with Claude Code to help you:
- **Set up** an AI-ready vault from scratch or enhance an existing one
- **Maintain** cross-session memory and context
- **Work** effectively with your vault using structured workflows
- **Audit** your vault's AI-readiness and fix issues

## Installation

### Option 1: Install All Skills

Copy the entire `skills/` directory to your Claude Code commands location:

```bash
cp -r skills/* ~/.claude/commands/
```

### Option 2: Install Individual Skills

Copy specific skill folders:

```bash
# Example: Install just the core memory skills
cp -r skills/core/* ~/.claude/commands/
```

### Option 3: Project-Level Skills

Keep skills in your project and reference them in CLAUDE.md:

```markdown
## Skills

This vault uses AI Ready Vault skills located in `.claude/skills/`.
```

## Skills Reference

### Core Skills (Memory System)

| Skill | Command | Purpose |
|-------|---------|---------|
| [hydrate](core/hydrate/SKILL.md) | `/hydrate` | Load vault context at session start |
| [remember](core/remember/SKILL.md) | `/remember` | Store a memory for cross-session persistence |
| [recall](core/recall/SKILL.md) | `/recall {terms}` | Search memories by keyword |
| [reflect](core/reflect/SKILL.md) | `/reflect` | End-of-session consolidation |
| [glean](core/glean/SKILL.md) | `/glean` | Surface patterns across memories |

### Setup Skills (Getting Started)

| Skill | Command | Purpose |
|-------|---------|---------|
| [evaluate-vault](setup/evaluate-vault/SKILL.md) | `/evaluate-vault` | Analyze vault AI-readiness, identify gaps |
| [init-memory](setup/init-memory/SKILL.md) | `/init-memory` | Create memory system folder structure |
| [init-claude-md](setup/init-claude-md/SKILL.md) | `/init-claude-md` | Generate CLAUDE.md from vault analysis |

### Obsidian Skills (MCP Integration)

| Skill | Command | Purpose |
|-------|---------|---------|
| [vault-status](obsidian/vault-status/SKILL.md) | `/vault-status` | Show vault structure and recent activity |
| [daily-note](obsidian/daily-note/SKILL.md) | `/daily-note` | Create, read, or append to daily notes |
| [link-check](obsidian/link-check/SKILL.md) | `/link-check` | Validate wiki-links, find orphaned notes |

### Bundle Skills (Workflows)

| Skill | Command | Purpose |
|-------|---------|---------|
| [session-start](bundles/session-start/SKILL.md) | `/session-start` | Combined: hydrate + vault-status + focus prompt |
| [session-end](bundles/session-end/SKILL.md) | `/session-end` | Combined: reflect + memory consolidation |

## Recommended Workflow

### New Vault Setup

1. `/init-claude-md` - Generate CLAUDE.md
2. `/init-memory` - Create memory system
3. `/evaluate-vault` - Verify setup

### Daily Usage

1. `/session-start` - Begin work session
2. Work with Claude on your vault
3. `/remember` - Store important learnings as you go
4. `/session-end` - End session, consolidate memories

### Maintenance

- `/vault-status` - Quick health check
- `/link-check` - Find broken links and orphans
- `/glean` - Surface patterns from accumulated memories

## Requirements

- **Claude Code** - These skills are designed for Claude Code
- **Obsidian** - Vault should be an Obsidian vault
- **Obsidian MCP** (optional) - Some skills use Obsidian MCP tools for enhanced functionality

## Customization

Skills can be customized by editing the SKILL.md files:
- Adjust paths to match your vault structure
- Modify templates to fit your preferences
- Add project-specific instructions

## Directory Structure

```
skills/
├── SKILLS.md           # This file
├── core/               # Memory system skills
│   ├── hydrate/
│   ├── remember/
│   ├── recall/
│   ├── reflect/
│   └── glean/
├── setup/              # Initial setup skills
│   ├── evaluate-vault/
│   ├── init-memory/
│   └── init-claude-md/
├── obsidian/           # Obsidian-specific skills
│   ├── vault-status/
│   ├── daily-note/
│   └── link-check/
└── bundles/            # Combined workflow skills
    ├── session-start/
    └── session-end/
```
