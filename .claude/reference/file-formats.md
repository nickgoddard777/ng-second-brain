# File Formats

All files use YAML frontmatter with markdown body.

## Task

```markdown
---
type: task
due: YYYY-MM-DD
status: pending | in-progress | complete | cancelled
tags: [tag1, tag2]
created: YYYY-MM-DDTHH:MM:SS
project: link to project
title: task title
work-personal: work | personal
---

# Task Title

Description of what needs to be done.

## Notes
- Additional context
- Related information
```

**Status values:**

- `pending` - Not started
- `in-progress` - Currently working on
- `complete` - Done
- `cancelled` - No longer needed

## Project

```markdown
---
type: project
status: active | paused | complete | archived
tags: [tag1, tag2]
created: YYYY-MM-DD
work-personal: work | personal
---

# Project Name

Brief description of the project.

## Next Action
Single most important next step.

## Notes
- Key dates
- Stakeholders
- Context
```

## Person

```markdown
---
type: person
tags: [relationship-type]
last-contact: YYYY-MM-DD
---

# Person Name

Role/relationship description.

## Follow-ups
- Pending items with this person

## Notes
- Communication preferences
- Important context
```

## Idea

```markdown
---
type: idea
tags: [category]
created: YYYY-MM-DDTHH:MM:SS
---

# Idea Title

The idea description.

## Related
- Links to related projects/tasks
```

## Daily Note

```markdown
---
type: daily
date: YYYY-MM-DD
---

# Day, Month DD

## Due Today
- [ ] Task items [[linked-entity-slug]]

## Overdue
- [ ] Carry-forward items (X days) [[linked-entity-slug]]

## Active Projects
- Project (next: action) [[linked-entity-slug]]

## Review
(Appended at end of day)
- ✅ Completed items
- ⏳ Incomplete items
```

## Weekly Note

```markdown
---
type: weekly
week: YYYY-WNN
---

# Week NN, YYYY

## Completed
- Summary of completed tasks [[linked-entity-slug]]

## In Progress
- Ongoing work

## Planned for Next Week
- Upcoming priorities
```
