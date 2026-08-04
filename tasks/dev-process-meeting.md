---
type: task
status: pending
due: 2026-08-04
tags: []
created: 2026-08-04T09:00:00
title: Dev process meeting
work-personal: work
---

# Dev Process Meeting

Meeting about the development process.

## Notes

## Things to discuss

- Work not coming through DevOps
- Release Notes
- Tests
- ALCops

## Meeting Summary (2026-08-04, 1h12m)

> Word version: [[outputs/2026-08-04-dev-process-meeting-summary.docx]]

**Attendees:** Nick Goddard, Josh Murphy, Daniel Townsend, Mick Carr, Kevin Portellas, Stuart Allen, Mike Jones, Mamta Pathak, Ricardo Cardoso

### 1. Auditability / work through DevOps
- Recurring problem: not all work comes through DevOps. Gainsborough was the recent example — no record of what work was done (project didn't even exist in DevOps; Nick created it). That piece ran Apr–May/Jun, possibly pre-dating the earlier agreement.
- Agreed principle (from prior meetings): every project must exist in DevOps, tickets created there, and commits linked properly (`AB#<number>` + ticket number).
- Ownership clarified: **PM** creates the project + key/top-level work items; **developers** create the detailed activities beneath them.
- Stuart Allen suggested reviewing long-running projects to catch others that may have slipped outside DevOps.
- Daniel: Stu Simpson is building an AI agent that auto-generates PBIs/ADO items from a source (transcript, BRD, etc.) — could help; he offered to demo.

### 2. AI tooling / falling behind competitors
- Nick's concern: we're getting behind on AI-assisted BC dev. Flagged Microsoft's **BC Quality** repo and Jeremy Vyska's **BC Code Intelligence** (VS Code extension + MCP server, ~16 specialist personas). Waldo has built a company-specific rules layer on top for Fabrikam/infacto.
- License/legal blocker: contracts (e.g. CII) restrict disclosure of confidential info to Acora employees; Claude stores data in the US (outside EU) — currently a risk. Copilot (M365) is safer as it's embedded. GitHub Copilot vs M365 Copilot distinction noted.
- AI cohort selection gap: no BC developers were included (only two .NET + Power BI). Down to line-management nomination structure; Nick's BC team fell in the gap. To be raised with management (Matt/Jiten).
- Steve/Stu Simpson has submitted a request to the AI governance team for rules/guardrails on using AI for code — awaiting full answer.
- **Do not** put work code into personal AI subscriptions (Acora standard = Copilot + Claude, via proper channels).

### 3. Deployment / environments (AL-Go)
- Some repos never got AL-Go set up (~half a dozen, incl. Petrinoli) — Nick got busy and forgot; wanted a discussion on setup approach first and never finished the rollout. These need doing manually for now.
- Environment link breaks when a customer deletes/recreates an environment with a different name — someone then has to reconfigure AL-Go. Mamta has hit this.
- Principle: **live customers own their environments** (what they are, why they exist, what version). If a dev finds settings don't match, ask the customer first.
- Standard 3-environment setup for new projects: Acora Dev (our dev) → Sandbox (customer testing) → Production. Taking a copy of production into dev before work helps avoid config-drift surprises, but tenant capacity can constrain this (Stuart Allen).
- Yevgen / BAU (non-CII) devs don't know the process — reinforces need for a written-down process.

### 4. Release notes
- Team agreed we're currently poor/inconsistent at release notes.
- Definition (per Nick's chat with Matt): developer-written instructions enabling a **consultant/tester** to set up and test the work — includes config changes needed. Not a customer user guide (though customers see a copy). Should be written **as you go**, not at the end.
- Must include any config changes; ideally config delivered via install/upgrade scripts.
- Should form part of the **support handover** (with spec docs) so support knows what customisation was done.
- Filing: customer folder in Teams (per Nick's guidance okayed by Matt ~2yrs ago) **and** ServiceNow (customer needs it). Too many scattered locations currently.
- AL-Go already auto-generates a release (change log from PRs between versions) and AL-Doc reference documentation (`accoralimited.io/<repo>`) — better code/XML comments = better output. Could be surfaced centrally (repo README / DevOps wiki) rather than hunting in CI/CD (Mick, Kevin).
- Conventional commits (Mick) would improve change logs; Nick to look at AL-Go rules to enforce commit-message structure. Mick to share a cheat-sheet link.

### 5. ALCop migration (from BC Lintercop)
- BC Lintercop superseded by **ALCop / LinterCop** — needs reconfiguration (not much). A script on the website does most of it; enable the cops (~6, 9 total incl. 3 Microsoft) → workspace settings.
- Nick will move AL-Go over to ALCop and test the **"fail on new warnings"** setting (currently fails PRs on errors only).
- Fixing is easy — most issues have right-click code actions (incl. from the Problems panel). Intentional suppressions must use a **pragma with a comment explaining why**; a pragma without a comment should fail code review and be sent back.
- Don't set `Handled := false` on handled-pattern subscribers (can override others). Unused event-subscriber params should be removed, not referenced.
- Nick to re-share the migration link/message; **all devs** to migrate their projects.

### 6. Workspace files
- Open the `.code-workspace` file (not the folder) so you get the shared settings + recommended extensions. Nick has updated settings from the Info Pro work and will pass out a new version — devs to update theirs.
- Caveat: BC v17 (2020 Wave 2) workspaces don't support debugging with the current AL extension — dev works, but debugging needs the folder opened directly + older VSIX installed (Mick).
- On modern BC/SaaS: launch configs can live in the workspace file instead of `launch.json` (keeps multi-app configs in one place); be careful VS Code doesn't auto-create/override a `launch.json`.

### 7. Next steps (agreed at close)
- Get more sessions booked: one to go through release notes as a group, plus a session walking through the actual process once written up.

## Next Actions

| # | Action | Owner |
|---|--------|-------|
| 1 | Write up notes/documentation on pipelines, GitHub, and how the release process flows, to share with the team | **Nick** |
| 2 | Sit with Mamta straight after the meeting to manually push out AL-Go for Petrinoli | **Nick** |
| 3 | Record a video converting one repo to AL-Go, then roll out to devs; find the list of ~6 repos still missing AL-Go and complete them (this week, after Amazon) | **Nick** |
| 4 | Add written instructions for the broken environment-link scenario (customer deletes/recreates environment) | **Nick** |
| 5 | Re-share the BC Lintercop → ALCop migration link/message; reconfigure AL-Go to use ALCop/LinterCop; test the "fail on new warnings" setting | **Nick** |
| 6 | Migrate own projects from BC Lintercop to ALCop (enable cops, run migration script); fix warnings; pragma+comment for intentional suppressions | **All developers** |
| 7 | Ensure all work goes through DevOps — projects + tickets in DevOps, commits linked (`AB#` + ticket number) | **All developers** |
| 8 | Write release notes for all work, as you go; file in customer Teams folder + ServiceNow | **All developers** |
| 9 | Produce the "ideal" release-notes standard/template (assess best existing notes for gaps, iterate); build a Claude skill to auto-generate release notes from code (blocked on AI license/legal) | **Daniel** |
| 10 | Send Daniel the best existing release-notes example (Nick has the Info Pro one) | **Nick / team** |
| 11 | Send everyone a link to BC Code Intelligence to trial; put a small business case to ai.governance@acora.com for licenses (Nick wants people to trial first) | **Nick** |
| 12 | Share AI cohort training notes + CISI AI-governance doc with the team; raise the BC-developer cohort gap with management (Matt/Jiten) | **Daniel** |
| 13 | Book dedicated AI/process sessions (Friday afternoons / hackathon-style) and force time into the diary; Nick to call Josh today to schedule; get Matt to join on-site | **Nick + Josh** |
| 14 | Arrange the group release-notes session + a couple more sessions incl. a process walkthrough | **Josh** |
| 15 | Chase the ServiceNow team to expand ServiceNow to link to DevOps (scope agreed, waiting on them) | **Daniel** |
| 16 | Run this transcript through an approved AI tool to produce notes | **Nick** |
| 17 | Pass out the updated `.code-workspace` file with new settings; devs to update theirs | **Nick** |
| 18 | Share the conventional-commits cheat-sheet link; look at surfacing AL-Doc reference docs centrally (README / DevOps wiki) | **Mick / Kevin** |
| 19 | Review long-running projects to catch any (like Gainsborough) that slipped outside DevOps | **Team (suggested)** |
