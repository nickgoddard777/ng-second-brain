---
type: task
status: in-progress
due: 2026-08-06
tags:
  - cii
  - incidents
  - work
created: 2026-08-06T00:00:00
project: "[[cii-incident-management]]"
title: Investigate PBI57030
work-personal: work
---

# Investigate PBI57030

Investigate PBI57030 — priority item, due today.

## Notes
- Part of [[cii-incident-management]]
- **Priority** for today.

Found 2 areas where the issues lie.

1. The routine that creates the DD Invoices (Job Queue Handler 44), there are some logic problems and this needs re-writing. I am just doing the design now.
2. The code that changes the DD Mandate Linked type and No runs on an event on the Sales-Post Routine, Most invoices though are posted using the Sales-Post Prepayment and I feel the code isn't running. I'll add to the design to run the update on the prepayment posting as well.
