# Memory Dashboard

This is the central hub for AI memory management.

## Memory Types

### Episodic Memory
Specific events, sessions, and experiences.

```dataview
TABLE date, summary
FROM "Areas/AI/Memory/Episodic"
WHERE file.name != ".gitkeep"
SORT date DESC
LIMIT 10
```

### Semantic Memory
Facts, concepts, and knowledge.

```dataview
TABLE tags, summary
FROM "Areas/AI/Memory/Semantic"
WHERE file.name != ".gitkeep"
SORT file.mtime DESC
LIMIT 10
```

### Procedural Memory
How-to's, workflows, and patterns.

```dataview
TABLE tags, summary
FROM "Areas/AI/Memory/Procedural"
WHERE file.name != ".gitkeep"
SORT file.mtime DESC
LIMIT 10
```

### Strategic Memory
Goals, principles, and decisions.

```dataview
TABLE priority, status
FROM "Areas/AI/Memory/Strategic"
WHERE file.name != ".gitkeep"
SORT priority ASC
LIMIT 10
```

## Memory Guidelines

- **Create memories after significant sessions**
- **Link memories to related notes**
- **Review and consolidate periodically**
- **Archive outdated memories**
