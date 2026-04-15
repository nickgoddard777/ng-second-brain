---
type: task
status: pending
due: 2026-04-15
tags:
  - work
  - cii
  - incidents
  - devops
created: 2026-04-15T00:00:00
project: "[[cii-incident-management]]"
title: Create PBI for INC1021078 Break Fix
work-personal: work
---

# Create PBI for INC1021078 Break Fix

Create the DevOps PBI for the break fix relating to INC1021078 (Pro-Forma Invoice Address 2001179141).

## Notes
- Follows investigation: [[cii-investigate-inc1021078]]
- Pair with: [[cii-inc1021078-support-data-fix]]

- Code in CU 50162
``` al
if SalesInvHeader.ACO_ChannelType in [SalesInvHeader.ACO_ChannelType::"Customer Service",SalesInvHeader.ACO_ChannelType::Web] then begin
	if SalesInvHeader."External Document No." <> '' then
		OrderNo := SalesInvHeader."External Document No."
	else
		OrderNo := SalesInvHeader."No.";
end;
```

- If an External Doc No doesn't exist on a prepayment invoice then an error should be raised so that the external doc id can be filled in. 
- Question: Should the Prepayment Invoice be raised if the Sales Order doesn't have an External Doc No?
- 