---
name: weekly-review
description: Generate weekly review from completed tasks, project changes, and git activity. Stores in weekly/YYYY-WNN.md. Part of chief-of-staff system.
allowed-tools: Read, Glob, Grep, Bash, Write, Edit
---

# /weekly-review - Weekly Review

Summarise the past week and preview the next.

## Steps

1. Determine the current ISO week number and date range (Monday–Sunday)
2. Gather completed tasks for the week
3. Gather project changes for the week
4. Pull git commit activity for the week
5. Find tasks due next week
6. Write `weekly/YYYY-WNN.md`

---

## Step 1 — Dates

```bash
# Current week identifier
date +"%G-W%V"          # e.g. 2026-W14

# Week start (Monday) and end (Sunday)
date -v-weekday=1 +"%Y-%m-%d"   # Monday (macOS)
date -v-weekday=0 +"%Y-%m-%d"   # Sunday (macOS)

# Next week date range
date -v+7d -v-weekday=1 +"%Y-%m-%d"   # next Monday
date -v+7d -v-weekday=0 +"%Y-%m-%d"   # next Sunday
```

If `weekly/YYYY-WNN.md` already exists, read it first so existing content is preserved and only updated.

---

## Step 2 — Completed Tasks

Find tasks completed this week using git history (most reliable) AND frontmatter status:

```bash
# Files changed this week
git log --since="last Monday" --until="now" --name-only --pretty="" -- tasks/ | sort -u

# Tasks with status: complete
grep -rl "status: complete" tasks/
grep -rl "status: complete" tasks/archive/
```

Read the identified task files. Include tasks that:
- Have `status: complete` AND were modified this week (from git log)
- Or were moved to `tasks/archive/` this week

---

## Step 3 — Project Changes

```bash
# Project files touched this week
git log --since="last Monday" --until="now" --name-only --pretty="" -- projects/ | sort -u
```

Read those files. Note status changes, next-action updates, new projects, or archived projects.

---

## Step 4 — Git Activity Summary

```bash
git log --since="last Monday" --until="now" --grep="cos:" --format="%ad %s" --date=short
```

Group by day. Identify patterns: heavy task days, project focus areas, quiet days.

---

## Step 5 — Tasks Due Next Week

```bash
# Calculate next week's Monday and Sunday dates, then grep
grep -rl "due: NEXT-WEEK-DATE" tasks/
```

Build a date pattern covering Mon–Sun of next week. Read those files for title and due date. Exclude tasks with `status: complete` or `status: cancelled`.

---

## Step 6 — Write Weekly File

File path: `weekly/YYYY-WNN.md` (e.g. `weekly/2026-W14.md`)

```markdown
---
type: weekly
week: YYYY-WNN
date-range: YYYY-MM-DD to YYYY-MM-DD
---

# Week NN, YYYY

## Completed Tasks
- Task title (due: YYYY-MM-DD) [[linked-entity-slug]]
- ...

## Project Updates
- **Project Name** — what changed (status, next action) [[linked-entity-slug]]
- ...

## Activity by Day
- Mon YYYY-MM-DD: summary of cos: commits
- Tue YYYY-MM-DD: ...
- ...

## Next Week
### Due
- [ ] Task title (due: YYYY-MM-DD)
- ...

### Active Projects — Next Actions
- **Project Name** — next action
- ...

## Observations
One or two sentences on patterns, blockers, or themes from the week.
```

---

## Commit

After writing the file:

```
cos: weekly review for YYYY-WNN
```
