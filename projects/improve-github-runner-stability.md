---
type: project
status: active
tags:
  - work
  - github
  - devops
  - infrastructure
created: 2026-07-16
work-personal: work
---

# Improve GitHub Self-Hosted Runner Stability

Improve the stability of the GitHub self-hosted runners used for builds/CI.

## Next Action

- [ ] Implement the recommendations by CC [[gh-runner-implement-cc-recommendations]] (due: 2026-07-21)

## Tasks

- [x] Get Mamta's PR to work [[gh-runner-fix-mamta-pr]] (due: 2026-07-16)
- [ ] Implement the recommendations by CC [[gh-runner-implement-cc-recommendations]] (due: 2026-07-21)
- [ ] Check for spare VMs - move to 2 VMs running 2 runners each [[gh-runner-split-vms-2x2]] (due: 2026-07-21)
- [ ] Check test logs [[gh-runner-check-test-logs]] (due: 2026-07-22)

## Notes
- Current setup: 1 VM running 4 runners; plan is 2 VMs running 2 runners each
- Mamta ([[mamta-pathak]]) has a PR in flight related to this
