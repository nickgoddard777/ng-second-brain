---
name: cii-pbi
description: Write a PBI (Product Backlog Item) for a CII issue. Asks questions to gather Why, Impact, Risk, Proposed Fix, Time to Fix, ServiceNow tickets, and Business Owner, then produces a formatted PBI document.
argument-hint: <pbi00000> [optional brief description of the issue]
allowed-tools: Read, Glob, Write, Edit, AskUserQuestion
---

# /cii-pbi - Write a CII PBI

Generate a structured PBI for a CII issue by asking targeted questions, then writing the output to `outputs/`.

$ARGUMENTS format: `pbi00000 [optional brief description]`

Parse $ARGUMENTS on startup:
- Extract the PBI number — a token matching `pbi\d+` (e.g. `pbi55301`). If not present, ask for it before any other question.
- Treat the remainder of $ARGUMENTS (if any) as an optional issue description.

> **Do NOT commit manually unless explicitly asked.** A PostToolUse hook auto-commits after Write operations.

## Steps

1. **Parse $ARGUMENTS** — extract PBI number and any description
2. **Gather information** — ask questions sequentially using AskUserQuestion
3. **Draft the PBI** — write the document to `outputs/YYYY-MM-DD-<pbi-number>-cii-pbi-<slug>.md`
4. **Respond** — confirm what was created and show the PBI title

---

## Questions to Ask

Ask these questions one at a time (do not batch them all at once). If $ARGUMENTS already answers a question clearly, skip it.

### 0. PBI Number (if not in $ARGUMENTS)

If no `pbi\d+` token is found in $ARGUMENTS:

```
Question: "What is the PBI number? (format: pbi00000)"
Header: "PBI number"
```

### 1. Issue Summary

If no description was provided in $ARGUMENTS, ask:

```
Question: "What is the issue? Give a one-sentence summary."
Header: "Issue summary"
```

### 2. Why — Description and Example

```
Question: "Describe the issue in more detail. Include a concrete example if possible (e.g. a specific transaction, user action, or error message)."
Header: "Why — describe the issue"
```

### 3. Impact — Breadth and Growth

```
Question: "How widespread is this issue? Who or what is affected, and how many? Do you expect it to grow or worsen over time?"
Header: "Impact"
```

### 4. Risk — Consequence of Inaction

```
Question: "What could happen if we don't fix this? Consider data integrity, compliance, customer impact, or operational risk."
Header: "Risk if not actioned"
```

### 5. Proposed Fix

```
Question: "What is the proposed fix? Describe the technical or process change needed to resolve this."
Header: "Proposed fix"
```

### 6. Time to Fix

```
Question: "How much effort do you estimate to fix this? Give a rough figure in hours (e.g. 2h, 8h, 3 days)."
Header: "Time to fix"
```

### 7. ServiceNow Tickets

```
Question: "Are there any ServiceNow tickets linked to this issue? If yes, list the INC or PRB numbers."
Header: "ServiceNow tickets"
Options:
  - "No tickets"
  - (Other allows entering ticket numbers)
```

### 8. Business Owner

```
Question: "Who is the Business Owner for this PBI? (Name and/or role)"
Header: "Business Owner"
```

---

## Output Format

Write the PBI to `outputs/YYYY-MM-DD-<pbi-number>-cii-pbi-<slug>.md` where `<slug>` is a short kebab-case label derived from the issue summary.

Example filename: `outputs/2026-05-01-pbi55301-cii-pbi-sepa-bank-accounts.md`

```markdown
---
type: output
created: YYYY-MM-DD
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "<pbi00000>"
title: "<Issue Summary>"
business-owner: "<Name / Role>"
servicenow: ["INC0000000"]   # empty list if none
---

# PBI <pbi00000>: <Issue Summary>

**Business Owner:** <Name / Role>
**ServiceNow:** <ticket numbers, or N/A>

---

## Why?

<Detailed description of the issue. Include the concrete example provided.>

---

## Impact

<How widespread is it, who is affected, and whether it is likely to grow.>

---

## Risk

<What could happen if this is not actioned — data integrity, compliance, customer, or operational consequences.>

---

## Proposed Fix

<Description of the technical or process change needed to resolve the issue.>

---

## Time to Fix

**Estimated effort:** <X hours / X days>

<Any notes on complexity, dependencies, or unknowns that affect the estimate.>
```

---

## Slug Generation

Derive the slug from the issue summary:
- Lowercase, words separated by hyphens
- Max 5 words
- Drop articles and filler words (the, a, an, to, for)
- Example: "SEPA bank accounts not generating" → `sepa-bank-accounts-not-generating`
