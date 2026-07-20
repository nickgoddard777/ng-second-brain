---
type: task
status: complete
tags:
  - cii
  - work
  - security
created: 2026-07-16T00:00:00
project: "[[cii-pbi58185-vulnerability-cve-2026-55944]]"
title: Install hotfix onto UAT and test
work-personal: work
due: 2026-07-16
---

# Install Hotfix onto UAT and Test

Install the CVE-2026-55944 hotfix onto UAT and test it.

## Notes
- Part of [[cii-pbi58185-vulnerability-cve-2026-55944]] (PBI 58185)
- Follows [[cii-pbi58185-investigate-cve-2026-55944]]

### Steps
1. Take backup of E:\Program Files\Microsoft Dynamics NAV\110\Service\CustomSettings.config
2. Copy the contents of W1DVD_50704\OnPremise\W1\ServiceTier\program files\Microsoft Dynamics NAV\110\Service to E:\Program Files\Microsoft Dynamics NAV\110\Service
3. Copy the contents of W1DVD_50704\OnPremise\W1\ServiceTier\System64Folder to C:\Windows\SysWOW64
4. Copy the contents of W1DVD_50704\OnPremise\W1\WebClient\Microsoft Dynamics NAV\110\Web Client to E:\Program Files\Microsoft Dynamics NAV\110\Web Client
5. Copy the contents of W1DVD_50704\OnPremise\W1\RoleTailoredClient\program files\Microsoft Dynamics NAV\110\RoleTailored Client to E:\Program Files (x86)\Microsoft Dynamics NAV\110\RoleTailored Client
6. Copy the contents of W1DVD_50704\OnPremise\W1\ClickOnceInstallerTools\Program Files\Microsoft Dynamics NAV\110\ClickOnce Installer Tools to E:\Program Files (x86)\Microsoft Dynamics NAV\110\ClickOnce Installer Tools


"E:\Program Files (x86)\Microsoft Dynamics NAV\110\RoleTailored Client\Microsoft Dynamics NAV Server.msc"