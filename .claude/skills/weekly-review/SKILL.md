---
name: weekly-review
description: Weekly review — archives completed tasks, updates projects, writes this week's record and next week's plan. Part of chief-of-staff system.
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, AskUserQuestion
---

# /weekly-review - Weekly Review

End-of-week review: archive tasks, update projects, write this week's record, plan next week.

> **Do NOT commit manually.** The PostToolUse hook auto-commits after Write/Edit operations.

---

## Phase 1 — Get Review Date

Use AskUserQuestion to ask for the review date:

```
Question: "Which Sunday are you reviewing?"
Header: "Review date"
Options:
  - "This Sunday" → compute the most recent Sunday (or today if today is Sunday)
  - "Last Sunday" → compute the Sunday before this Sunday
  - (Other: allow custom entry as YYYY-MM-DD)
```

From the chosen Sunday date (`REVIEW_DATE`):

```bash
# Derive dates — macOS date syntax
REVIEW_DATE="2026-04-20"   # the chosen Sunday

# Week start (Monday = Sunday - 6 days)
date -j -f "%Y-%m-%d" -v-6d "$REVIEW_DATE" +"%Y-%m-%d"

# ISO week identifier
date -j -f "%Y-%m-%d" "$REVIEW_DATE" +"%G-W%V"

# Previous week identifier (for project archiving)
date -j -f "%Y-%m-%d" -v-7d "$REVIEW_DATE" +"%G-W%V"

# Next week Monday
date -j -f "%Y-%m-%d" -v+1d "$REVIEW_DATE" +"%Y-%m-%d"

# Next week Sunday
date -j -f "%Y-%m-%d" -v+7d "$REVIEW_DATE" +"%Y-%m-%d"
```

Store: `WEEK_START` (Monday), `WEEK_END` (Sunday = REVIEW_DATE), `WEEK_ID` (e.g. `2026-W16`), `PREV_WEEK_ID`, `NEXT_WEEK_START`, `NEXT_WEEK_END`.

If `weekly/WEEK_ID.md` already exists, read it first so existing content is preserved.

---

## Phase 2 — Find Completed Tasks for the Week

Find tasks completed during `WEEK_START` to `WEEK_END`:

```bash
# Task files modified this week
git log --after="WEEK_START 00:00" --before="WEEK_END 23:59" \
  --name-only --pretty="" -- tasks/ | sort -u

# All tasks currently showing status: complete (not yet archived)
grep -rl "status: complete" tasks/
```

Read each identified task file. A task counts as **completed this week** if:
- `status: complete` AND it appears in the git log for this week's date range
- OR it was moved to `tasks/archive/` this week (check git log for renames)

Build a list of completed tasks with: title, due date, project link.

---

## Phase 3 — Archive Completed Tasks

For each completed task identified in Phase 2:

1. Read the task file from `tasks/`
2. Write it to `tasks/archive/<filename>` (same content)
3. Delete the original from `tasks/` using Bash: `rm tasks/<filename>`
4. For any project that references the task, update the project file:
   - Find the task link in the project's Tasks list
   - Mark it `[x]` if not already marked

---

## Phase 4 — Archive Projects Completed in the Previous Week

Find projects with `status: complete` that are NOT yet in `projects/archive/`:

```bash
grep -rl "status: complete" projects/
```

Read each. Check the previous week's weekly record (`weekly/PREV_WEEK_ID.md`) — if the project was listed as complete there (or it has `status: complete` set before this week), archive it now:

1. Read the project file
2. Write it to `projects/archive/<filename>`
3. Delete the original: `rm projects/<filename>`

---

## Phase 5 — Update Project Records

Read all active and paused projects from `projects/` (not archive):

```bash
grep -rl "status: active\|status: paused" projects/
```

For each project:

1. **Check outstanding tasks** — look at the Tasks list in the project body. For each `[ ]` item, check if the linked task file exists in `tasks/` and what its status is.
2. **Update task checkboxes** — mark `[x]` for any tasks now complete/archived.
3. **Update Next Action** — set it to the first remaining `[ ]` task. If none remain, clear it.
4. **No outstanding tasks** — use AskUserQuestion:
   ```
   Question: "No outstanding tasks remain for [Project Name]. Mark it as?"
   Header: "Project status"
   Options:
     - "Complete" → set status: complete in frontmatter
     - "Paused" → set status: paused in frontmatter
     - "Keep active" → leave as-is
   ```
5. Write the updated project file.

---

## Phase 6 — Write This Week's Record

File: `weekly/WEEK_ID.md` (e.g. `weekly/2026-W16.md`)

If the file already exists, update it in place; otherwise create it.

```markdown
---
type: weekly
week: YYYY-WNN
date-range: YYYY-MM-DD to YYYY-MM-DD
---

# Week NN, YYYY

## Completed Tasks
- Task title (due: YYYY-MM-DD) [[task-slug]]
- ...

## Project Updates
- **Project Name** — what changed (tasks completed, next action updated, status change) [[project-slug]]
- ...

## Activity by Day
- Mon YYYY-MM-DD: summary of cos: commits
- Tue YYYY-MM-DD: ...
- Wed YYYY-MM-DD: ...
- Thu YYYY-MM-DD: ...
- Fri YYYY-MM-DD: ...
- Sat YYYY-MM-DD: ...
- Sun YYYY-MM-DD: ...

## Observations
Two or three sentences on themes, blockers, wins, or patterns from the week.
```

Pull Activity by Day from git:

```bash
git log --after="WEEK_START 00:00" --before="WEEK_END 23:59" \
  --grep="cos:" --format="%ad %s" --date=short
```

Group commits by date. Write a one-line summary per day (omit days with no activity).

For Observations: synthesise what the completed tasks and project updates reveal — recurring themes, anything blocked or unblocked, notable progress.

---

## Phase 7 — Create Next Week's Record

File: `weekly/NEXT_WEEK_ID.md`

Only create this if it does not already exist.

**Tasks due next week** — search for all tasks with `due:` between `NEXT_WEEK_START` and `NEXT_WEEK_END`:

```bash
# Generate each date in next week's range and grep
for d in $(seq 0 6); do
  date -j -f "%Y-%m-%d" -v+${d}d "$NEXT_WEEK_START" +"%Y-%m-%d"
done
# Then grep tasks/ for each date
grep -rl "due: <date>" tasks/
```

Read each matching task file. Exclude `status: complete` and `status: cancelled`.

**Active projects** — read all projects with `status: active`. Extract the Next Action line.

**Paused projects** — read all projects with `status: paused`.

```markdown
---
type: weekly
week: YYYY-WNN
date-range: YYYY-MM-DD to YYYY-MM-DD
---

# Week NN, YYYY

## Due This Week
- [ ] Task title (due: YYYY-MM-DD) [[task-slug]]
- ...

## Active Projects — Next Actions
- **Project Name** — next action [[project-slug]]
- ...

## Paused Projects
- **Project Name** [[project-slug]]
- ...
```
