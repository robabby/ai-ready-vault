---
name: reflect
description: End-of-session consolidation for AI-ready vaults. Use before ending a work session to capture learnings, store important memories, and preserve context for future sessions. Counterpart to /hydrate.
---

# Reflect

Capture session learnings before ending. Counterpart to /hydrate.

## Workflow

1. Review the session
   - What was worked on?
   - What decisions were made?
   - What was learned?
   - What's unfinished?

2. Identify memories worth preserving
   - **Episodic**: Significant events, breakthroughs, frustrations
   - **Semantic**: New facts learned, definitions clarified
   - **Procedural**: Patterns discovered, how-tos established
   - **Strategic**: Decisions made, approaches chosen, plans formed

3. For each memory, assess:
   - Type (which folder)
   - Importance (0.0-1.0)
   - Concepts (search keywords)

4. Create memory files
   - Path: `Areas/AI/Memory/{Type}/YYYY-MM-DD - {Brief Title}.md`
   - Use standard frontmatter format

5. Optionally create session log
   - Path: `Areas/AI/Collaboration/Sessions/YYYY-MM-DD - {Topic}.md`
   - Link to memories created

6. Summarize what was captured

## Reflection Prompts

Consider:
- What would I want to know starting fresh on this topic?
- What mistakes shouldn't be repeated?
- What worked well?
- What context would be lost if not captured?

## What to Capture

**Always capture:**
- Decisions and their rationale
- Discovered patterns or processes
- Project context that took time to establish
- Unfinished work and next steps

**Consider capturing:**
- Interesting technical details
- User preferences observed
- Problems encountered and solutions found

**Skip:**
- Routine operations with no novel learning
- Information already well-documented elsewhere
- Transient details unlikely to matter later

## Parameters

- `$ARGUMENTS` (optional): Focus area for reflection

## Output Format

- Brief summary of session work
- List of memories being stored (with types)
- Confirmation of files created
- Notes about unfinished items

## Example

User: `/reflect`

Response:
"Reflecting on this session...

**Worked on**: AI Ready Vault skills library design

**Memories to store**:
1. **Strategic**: Skills library architecture decision
2. **Procedural**: Skill file format and structure
3. **Semantic**: Core vs setup vs obsidian skill categories

Creating 3 memories...
→ `Areas/AI/Memory/Strategic/2025-01-08 - Skills Library Architecture.md`
→ `Areas/AI/Memory/Procedural/2025-01-08 - Skill File Format.md`
→ `Areas/AI/Memory/Semantic/2025-01-08 - Skill Categories.md`

**Unfinished**: Bundle skills need implementation

Session context preserved. 3 memories stored."
