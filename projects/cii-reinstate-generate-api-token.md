---
type: project
status: active
tags:
  - cii
  - api
  - work
  - business-central
created: 2026-04-22
work-personal: work
---

# Reinstate GenerateAPIToken into the CII API Calls (PBI 56330)

Reinstate the GenerateAPIToken function into the CII API calls to restore proper authentication. Tracked as PBI 56330.

## Next Action

- [ ] Meeting to test GenerateAPIToken after updated method of calling [[cii-api-token-meeting-test-updated-calls]] (due: 2026-07-20)

## Tasks

- [x] Swarm call [[cii-generate-api-token-swarm-call]]
- [x] Create PBI for INC1037720 [[cii-create-pbi-inc1037720]]
- [x] NAV development to reinstate GenerateAPIToken [[cii-write-generate-api-token-code]] (due: 2026-07-02)
- [x] Create pull request [[cii-pbi56330-create-pull-request]] (due: 2026-07-02)
- [ ] UAT support — apply fix to UAT and test [[cii-apply-generate-api-token-fix-uat]] (no due date yet)
- [x] Fix issue of not connecting to web [[cii-api-token-fix-web-connection]] (due: 2026-07-15)
- [x] Create release 933 to test in PPD [[cii-api-token-create-release-933]] (due: 2026-07-15)
- [x] Update code to not check if token exists [[cii-api-token-remove-token-exists-check]] (due: 2026-07-17)
- [ ] Meeting to test GenerateAPIToken after updated method of calling [[cii-api-token-meeting-test-updated-calls]] (due: 2026-07-20)

## Notes
- Linked to INC1037720
- DevOps work item: PBI 56330
