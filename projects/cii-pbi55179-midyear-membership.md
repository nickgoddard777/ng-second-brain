---
type: project
status: active
tags:
  - cii
  - membership
  - webshop
  - work
---
## PBI 55179 Midyear Membership Renewal Issue
Feature to handle midyear membership updates for CII. Reference: [PBI55179](https://dev.azure.com/thecii/Development/_workitems/edit/55179).
As part of ongoing work to address erroneous billing and false debt created by mid-year membership changes, we need technical confirmation on whether a proposed NAV-based control could adversely affect other existing "No Payment" scenarios.  
## Background  

Mid-year membership changes initiated via the Webshop currently create zero-value orders in NAV. In some cases, NAV revalidates the membership item and pulls through a charge, resulting in false income and debtor balances. This is a known audit issue.  
  
One of the options under consideration is a NAV control which would:  
  
- Prevent NAV from creating an invoice, income, or debt when processing membership changes where the payment method is set to "No Payment".  
- Stop NAV from revalidating and pulling in a charge for the membership item in these scenarios. 
- Allow orders to continue to be created for data update purposes, but prevent any financial posting, for example by treating them as a non-posting £0.00 or data-change-only transaction.  
  
## Request
  
Please confirm whether introducing this type of NAV control would break, interfere with, or introduce risk to any existing "No Payment" transactions, specifically:  
  
- Direct Debit flows  
- Renewal processing  
- Any other known scenarios that rely on "No Payment" logic in NAV  
  
In particular, we need clarity on whether existing code paths are shared between these processes and the mid-year change behaviour described above.  
  
## Related records (for reference):  
  
- INC0923594  
- INC0905056  
- RITM0449441  
- RITM0472068  
- RITM0441630  
- ADO 54562

## Next Action
- [x] Confirm with Stuart Simpson how the Web Shop handles midyear membership orders [[cii-pbi55179-confirm-webshop-handling]]
- [x] Investigate where to update unit price [[cii-pbi55179-investigate-unit-price]]
- [x] Write Solution Document [[cii-pbi55179-write-solution]]
- [x] Create test plan for testers [[cii-pbi55179-test-plan]]
- [ ] Update SRD [[cii-pbi55179-update-srd]]
- [ ] Create and send Pricing workflow diagram [[cii-pbi55179-pricing-workflow-diagram]]

## Notes
- [[cii-pbi55179-webshop-order-import-process-flow]] — idea: process flow for web shop order importing
