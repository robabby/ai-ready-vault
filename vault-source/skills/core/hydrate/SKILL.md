---
name: hydrate
description: Load context from an AI-ready vault at session start. Use when beginning a new conversation, starting work on a vault, or when context feels stale. Reads CLAUDE.md, checks recent session logs, loads relevant memories, and summarizes current state.
---

# Hydrate

Load vault context to orient at session start.

## Workflow

1. Read CLAUDE.md from vault root
   - Extract vault structure
   - Note any specific instructions or preferences
   - Identify key paths (memory system, projects, etc.)

2. Check for recent session logs
   - Look in `Areas/AI/Collaboration/Sessions/` (or configured path)
   - Read most recent 1-2 logs if they exist
   - Note unfinished work or pending items

3. Load relevant memories
   - If $ARGUMENTS provided, search memories for that topic
   - Otherwise, load recent high-importance memories
   - Prioritize: Strategic > Procedural > Semantic > Episodic

4. Summarize current state
   - What was being worked on
   - Any pending decisions or blockers
   - Relevant context for this session

## Parameters

- `$ARGUMENTS` (optional): Topic to focus hydration on (e.g., "project X" or "memory system")

## Default Paths

- **CLAUDE.md**: Vault root
- **Session logs**: `Areas/AI/Collaboration/Sessions/`
- **Memory system**: `Areas/AI/Memory/`

## Output Format

Brief summary (3-5 sentences) of:
- Vault structure orientation
- Recent work context
- Relevant memories loaded
- Suggested focus or pending items

## Related Skills

- `/reflect` - End-of-session counterpart to hydrate
- `/recall {terms}` - Search for specific memories
- `/session-start` - Combined startup workflow including hydrate

## Example

User: `/hydrate ai-ready-vault`

Response:
"Loaded context for AI Ready Vault project. Last session (Jan 7) focused on brainstorming product vision—evolved from vault templates to composable skills system. Key decisions: PKM enthusiasts as primary audience, Claude+Obsidian platform commitment. Found 3 relevant memories about teaching patterns and skills library design. Ready to continue."
