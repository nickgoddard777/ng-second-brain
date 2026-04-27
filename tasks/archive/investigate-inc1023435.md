---
type: task
status: complete
due: 2026-04-22
tags:
  - cii
  - incidents
  - work
title: Investigate INC1023435 Customer Bank Account Issues
project: "[[cii-incident-management]]"
---
Investigate INC1023435 - Customer Bank Account Issues.

Part of [[cii-incident-management]].

## Notes
 - CU50011 - proc CreateDirectDebitMandatSchedule this set the SEPADirectDebitMandat."Customer Bank Account Code" := Customer."Preferred Bank Account Code", The orders that are erroring the customer has a none existing Preferred Bank Account Code. 
 - "Preferred Bank Account Code" set in the following bits of code
	 - CU50121 CreateOrUpdateNavCustomerFromWebShop


CBA-002624
779146

This was broke in [52874](https://dev.azure.com/thecii/Development/_workitems/edit/52874) and [54108](https://dev.azure.com/thecii/Development/_workitems/edit/54108)

Need to create a PBI for this
