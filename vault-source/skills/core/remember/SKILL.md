---
name: remember
description: Store a memory in the AI-ready vault memory system. Use when encountering information worth preserving across sessions—decisions made, patterns discovered, facts learned, or significant events. Creates properly formatted memory files with metadata.
---

# Remember

Store information in the memory system for cross-session persistence.

## Memory Types

| Type | Folder | Use For |
|------|--------|---------|
| **Episodic** | `Memory/Episodic/` | Events, breakthroughs, frustrations, experiences |
| **Semantic** | `Memory/Semantic/` | Facts, definitions, project details, knowledge |
| **Procedural** | `Memory/Procedural/` | Patterns, how-tos, workflows, techniques |
| **Strategic** | `Memory/Strategic/` | Decisions, approaches, plans, rationale |

## Workflow

1. Identify what to remember
   - From $ARGUMENTS if provided
   - Otherwise, ask user what to store

2. Determine memory type
   - What kind of information is this?
   - Which folder does it belong in?

3. Assess importance (0.0-1.0)
   - 0.9-1.0: Critical, always relevant
   - 0.7-0.8: Important, frequently useful
   - 0.5-0.6: Moderate, occasionally useful
   - 0.3-0.4: Minor, rarely needed

4. Extract concepts (keywords for search)
   - 3-6 terms that would help find this later

5. Create memory file
   - Path: `Areas/AI/Memory/{Type}/YYYY-MM-DD - {Brief Title}.md`
   - Use frontmatter template below

## Memory File Template

```markdown
---
created: {date}
type: {episodic|semantic|procedural|strategic}
importance: {0.0-1.0}
concepts: [{keywords}]
source: {session|explicit}
---

# {Title}

{Content with sufficient context to be useful standalone}

## Context

{Why this matters, when it applies, related information}
```

## Parameters

- `$ARGUMENTS` (optional): The content to remember. If not provided, prompt user.

## Example

User: `/remember The decision to use terminal/modern contrast for the AI Ready Vault website`

Response:
"Storing strategic memory...

**Type**: Strategic (design decision with rationale)
**Importance**: 0.7 (affects implementation, not critical)
**Concepts**: [ai-ready-vault, design, terminal-aesthetic, visual-hierarchy]

Created: `Areas/AI/Memory/Strategic/2025-01-08 - Terminal Modern Contrast Decision.md`"
