---
type: task
status: pending
due: 2026-07-17
tags:
  - work
  - github
  - devops
created: 2026-07-16T00:00:00
project: "[[improve-github-runner-stability]]"
title: Implement the recommendations by CC
work-personal: work
---

# Implement the Recommendations by CC

Implement the recommendations made by CC (Claude Code) for improving runner stability.

## Notes
- Part of [[improve-github-runner-stability]]


**Where to focus, roughly in order of impact:**

**1. Cap memory per container explicitly.** The memory limit for a container defaults to unlimited for process isolation, and 8G for Hyper-V isolation containers. If you're on process isolation (likely, since it's lighter-weight) and haven't set `-memoryLimit`, your 4 containers have no ceiling and will happily fight each other for all available RAM the moment 3+ start together. Set an explicit limit sized so `4 × memoryLimit + host/Docker overhead` fits comfortably under the VM's total RAM — Microsoft's own guidance is BC containers use at least 6 GB each, and AL-Go's own default is 8G per container, though some real-world builds with many dependencies need more. If your VM has, say, 64GB, something like 12-14GB per container leaves headroom for the host OS and Docker itself. [GitHub + 2](https://github.com/microsoft/navcontainerhelper/blob/main/ContainerHandling/New-NavContainer.ps1)

**2. Set this once at the machine level rather than per-workflow.** BcContainerHelperConfig has a defaultNewContainerParameters hashtable — you can set Isolation, memory, auth, etc. there once and it applies to every New-BcContainer call on that machine unless overridden. Saves you having to thread `-memoryLimit`/`-isolation` through every workflow. [Dynamics Community](https://community.dynamics.com/blogs/post/?postid=fc35fd39-c0d0-4a46-b695-85cf0f9f77a1)

**3. Constrain CPU too, not just memory.** BcContainerHelper doesn't expose a first-class `-cpuLimit` parameter, but you can pass raw Docker flags through `-additionalParameters @("--cpus=2")` on `New-BcContainer` to stop one container's SQL startup from starving the others of CPU.

**4. Check disk I/O, specifically.** SQL Server's startup (creating tempdb/model, importing the license) is disk-heavy. If all 4 containers' Docker storage sits on the same volume, that's often the real bottleneck, not CPU or RAM. If the VM disk isn't fast local SSD/NVMe, that's worth checking with `docker stats` and disk queue length in Perfmon while 3 jobs run together — you'll usually see disk queue length spike well before CPU maxes out.

**5. Limit actual concurrency at the workflow level, not just the runner count.** Having 4 runners doesn't mean you have to let 4 SQL containers spin up in the same instant. Add a `concurrency` group to the job step that creates the container:

yaml

```yaml
concurrency:
  group: bc-container-create
  cancel-in-progress: false
```

This serializes just the container-creation step across all 4 runners on that VM, while everything else in the job (compile, test, publish) can still run in parallel once the container's up. It's a cheap fix that sidesteps the contention entirely rather than trying to out-tune the resource limits.

**6. As a stopgap, wrap container creation in a retry.** Since the failure is transient under load, catching it and retrying `New-BcContainer` once (with a short delay) in your pipeline script will paper over occasional spikes while you tune the above.

If you're regularly hitting this even after capping memory and staggering creation, it's a sign the VM is just undersized for 4 concurrent SQL-backed containers — splitting the runners across two smaller VMs (2 runners each) usually gives more headroom per container than one VM stretched across 4.
