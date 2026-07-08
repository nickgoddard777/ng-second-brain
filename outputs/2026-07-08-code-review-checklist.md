---
type: output
created: 2026-07-08
tags:
  - work
  - code-review
  - dev-team
  - business-central
title: "Code Review Checklist"
---

# Code Review Checklist

Use this checklist when reviewing a PR. If the PR fails any of these checks, reject it and send it back to the developer with comments — that's the whole point of the review.

## 1. Traceability

- [ ] The PR references a DevOps ticket number (check the PR title/description)
- [ ] The linked work item matches the change being made

## 2. Purpose

- [ ] You understand what the change is supposed to do
- [ ] You've confirmed the code actually does it
- [ ] Tests cover the change where appropriate

## 3. Build Quality

- [ ] The PR build job has finished successfully
- [ ] Check the build output for yellow warnings — a green build can still be full of them
- [ ] Warnings caused by the change are fixed before sign-off, not waved through

## 4. Coding Standards

Check the code against our development guidelines:

- [ ] Follows [Microsoft's AL coding guidelines](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/compliance/apptest-bestpracticesforalcode)
- [ ] Follows the [AL Guidelines](https://alguidelines.dev/) community patterns
- [ ] Follows our team guidelines — see the Development Guidelines board (Miro) in the Apps Dev Teams channel

Our team guidelines are largely based on the two sites above, so when in doubt, start there.

## 5. Outcome

- [ ] Everything above passes → approve
- [ ] Anything fails → **reject** and return to the developer with clear comments on what needs fixing

---

*Rule of thumb: if you can't explain what the PR does and show that the build is clean, it isn't ready to sign off.*
