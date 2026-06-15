---
type: task
status: pending
due: 2026-05-27
tags:
  - al-go
  - devops
  - work
created: 2026-05-21T00:00:00
project: "[[al-go-s2s-deployment-auth]]"
title: Setup Test Environment and Test S2S Deployment
work-personal: work
---

# Setup Test Environment and Test S2S Deployment

Setup a test environment and test the AL-Go deployment using S2S authentication to confirm it works correctly.

## Notes
- Dependent on receiving App Registration and Vault from IT [[al-go-s2s-get-app-registration-vault]]
- AppsDev test Cert
	- App Name: AL-Go GitHub Actions
	- Application Client Id: c556d866-2662-4104-92bf-e4de521e8e2b
	- Object Id: 236063c6-33d0-4d17-8f7b-ef1e53a6ddbd
	- Directory (tenant Id): b174507a-b0b2-4f02-b71c-2fb7113ab450
	- Client Secret: [REDACTED]
	- Secret Id: 64da57b2-a7ec-4f09-8d67-76fbb0e9a771
	- Expires: 12/12/2026
- Live Acora.com App Registration details
	- App Name: BC-S2S-Deployment
	- Application Client Id: b2c3cd3a-aa08-4559-b895-b17699d6d1e8
	- Object Id: 7f041bc2-abfa-493e-a8da-fbcacbf6092f
	- Directory (tenant Id): 4e5d8962-6677-4e22-888c-7eca3eb87840
	- Client Secret: [REDACTED]
	- Secret Id: 2d26ab06-4e95-469c-be44-b5cb600877a9
	- Expires: 04/03/2028
