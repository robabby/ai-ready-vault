---
name: init-claude-md
description: Generate a CLAUDE.md file for an Obsidian vault. Analyzes existing vault structure and creates an instruction file that helps AI understand and navigate the vault. Use when setting up a new vault or when CLAUDE.md is missing/outdated.
---

# Init CLAUDE.md

Generate a CLAUDE.md instruction file based on vault analysis.

## What CLAUDE.md Provides

CLAUDE.md is the instruction manual AI reads to understand your vault:
- Vault structure and organization
- Folder purposes and navigation
- File conventions and patterns
- User preferences and workflows
- Key files and entry points

## Workflow

1. Analyze existing vault structure
   - List top-level folders
   - Identify organizational pattern (PARA, Zettelkasten, custom)
   - Find key files (Home.md, dashboards, etc.)

2. Detect conventions
   - File naming patterns
   - Frontmatter usage
   - Tag structure
   - Wiki-link patterns

3. Identify key locations
   - Projects/active work
   - Reference material
   - Archive/inactive content
   - Templates

4. Check for existing systems
   - Memory system location
   - Session logs location
   - Planner/periodic notes

5. Generate CLAUDE.md
   - Structure documentation
   - Navigation instructions
   - Discovery patterns
   - Workflow guidance

6. Ask user for customization
   - Any specific preferences?
   - Workflows to document?
   - Anti-patterns to avoid?

## CLAUDE.md Template

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this vault.

## Overview

{Brief description of vault purpose and organization}

**Vault Path**: `{path}`

## Vault Structure

| Folder | Purpose |
|--------|---------|
| {Folder}/ | {Description} |

## File Operations

### Reading Files
- Use `obsidian_get_file_contents` for single files
- Use `obsidian_list_files_in_dir` for folder contents

### Creating/Editing Files
- Use Write tool for new files
- Use Edit tool for modifications
- Pre-fill dates (don't use Templater syntax)

## Discovery Patterns

```bash
# Find content
Grep pattern="search term" path="{vault_path}" glob="*.md"

# Find by tag
Grep pattern="tags:.*tagname" path="{vault_path}" glob="*.md"

# List folder contents
Glob pattern="{folder}/**/*.md" path="{vault_path}"
```

## Key Files

- `{file}` - {purpose}

## Preferences

{Any user-specific instructions or preferences}

## Anti-Patterns

- {Things to avoid}
```

## Parameters

- `$ARGUMENTS` (optional): Specific sections to focus on or preferences to include

## Example

User: `/init-claude-md`

Response:
"Analyzing vault structure...

Detected:
- Organization: PARA-style (Projects, Areas, Resources, Archive)
- Key folders: Projects/Active/, Areas/AI/Memory/, Planner/
- Conventions: Title Case folders, kebab-case files
- Memory system: Present at Areas/AI/Memory/

Generated CLAUDE.md with:
- Vault structure table (8 top-level folders)
- File operation instructions
- Discovery patterns for Grep/Glob
- Memory system workflow
- Key files list

Created: `CLAUDE.md`

Review and customize as needed. Run `/evaluate-vault` to verify setup."
