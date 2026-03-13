---
type: project
status: active
tags:
  - hsl
  - business-central
  - devops
  - acora
created: 2026-03-11
---

# HSL Business Central Sandbox Refresh

Refresh HSL Business Central sandbox environments by rebuilding UAT and Sandbox from a copy of Production, then re-establishing CRM sync once Zeph has refreshed the CRM environments.

## Next Action

Delete UAT environment in Business Central admin.

## Tasks

1. [[tasks/hsl-bc-delete-uat-environment]]
2. [[tasks/hsl-bc-delete-sandbox-environment]]
3. [[tasks/hsl-bc-copy-production-to-uat]]
4. [[tasks/hsl-bc-copy-production-to-sandbox]]
5. [[tasks/hsl-bc-wait-for-zeph-crm-refresh]] ← blocker
6. [[tasks/hsl-bc-sync-crm-uat]]
7. [[tasks/hsl-bc-sync-crm-sandbox]]
8. [[tasks/hsl-speak-to-stu-allen-regarding-crm-setup]]

## Notes

- Blocked on CRM sync steps until Zeph completes CRM refresh
- Stakeholder: [[people/zeph-lakota]]
