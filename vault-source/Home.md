# Home

Welcome to your AI-ready vault.

## Quick Links

- [[CLAUDE]] - AI context file
- [[Areas/AI/Memory/Memory|Memory Dashboard]]

## Areas

- [[Areas/AI/Memory/Memory|AI Memory]]

## Projects

```dataview
TABLE status, due
FROM "Projects/Active"
WHERE file.name != ".gitkeep"
SORT due ASC
```

## Inbox

```dataview
LIST
FROM "Inbox"
WHERE file.name != ".gitkeep"
SORT file.mtime DESC
LIMIT 10
```

## Recent Sessions

```dataview
TABLE date, summary
FROM "Areas/AI/Collaboration/Sessions"
WHERE file.name != ".gitkeep"
SORT date DESC
LIMIT 5
```
