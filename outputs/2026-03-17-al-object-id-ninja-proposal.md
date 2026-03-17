---
type: output
date: 2026-03-17
project: "[[projects/al-object-id-ninja-rollout]]"
status: draft
---

# Proposal: AL Object ID Ninja — Team Rollout

**To:** Matt Hollins, Jiten
**From:** Nick Goddard
**Date:** 17 March 2026
**Subject:** Adoption of AL Object ID Ninja across BC Development Projects

---

## What Is It?

AL Object ID Ninja is a VS Code extension that manages Business Central AL object ID assignment across teams. It prevents ID conflicts by coordinating assignments in real time — without needing a shared spreadsheet or manual tracking.

Key capabilities:
- Assigns unique object IDs automatically across all developers
- Prevents duplicate ID conflicts in multi-developer environments
- Integrates directly into VS Code — zero workflow disruption
- Works across multiple AL projects / extensions

---

## The Problem It Solves

Currently, object ID management relies on manual coordination. With 5 developers working across multiple BC projects, this creates risk:

- Duplicate IDs going undetected until build time
- Developers blocked waiting for ID allocation
- No audit trail of who assigned what

This is a low-cost, high-impact fix to a friction point that slows every AL development task.

---

## Proposed Approach

1. **Sort access** — confirm team licensing requirements with the vendor (alid.ninja / vjeko.com)
2. **Deploy to Dev Team** — install and configure across all developer machines and BC projects
3. **Validate** — confirm ID assignment is working cleanly across all active projects

---

## Cost

The extension is free for solo developers. Team licensing costs are to be confirmed from the vendor website. This document will be updated once pricing is confirmed.

> ⚠️ **Note:** Pricing research is in progress — sign-off on approach is sought ahead of final cost confirmation.

---

## Recommendation

Approve the rollout of AL Object ID Ninja to the 5-person dev team and all active BC projects. The tool is low-risk, well-established in the BC dev community, and directly supports our Development Process Improvement priority this quarter.

---

## Next Steps (on approval)

- [ ] Confirm team pricing with vendor
- [ ] Sort out account access / licensing
- [ ] Deploy to all developer machines and BC projects

---

*Awaiting sign-off from Matt Hollins and Jiten before proceeding.*
