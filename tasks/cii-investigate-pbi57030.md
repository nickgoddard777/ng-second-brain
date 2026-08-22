---
type: task
status: complete
due: 2026-08-06
tags:
  - cii
  - incidents
  - work
created: 2026-08-06T00:00:00
project: "[[cii-incident-management]]"
title: Investigate PBI57030
work-personal: work
---

# Investigate PBI57030

Investigate PBI57030 — priority item, due today.

## Notes
- Part of [[cii-incident-management]]
- **Priority** for today.

Found 2 areas where the issues lie.

1. The routine that creates the DD Invoices (Job Queue Handler 44), there are some logic problems and this needs re-writing. I am just doing the design now.
2. The code that changes the DD Mandate Linked type and No runs on an event on the Sales-Post Routine, Most invoices though are posted using the Sales-Post Prepayment and I feel the code isn't running. I'll add to the design to run the update on the prepayment posting as well.

Need to finish off documenting my findings.

## Solution

### Prepayment Invoice
Create new Event Subscriber for OnAfterPostPrepayments in Codeunit 50171. This should then have the same code the current OnAfterPostSalesDoc which Sets the LinkToDocType = 0 and the Link To Doc No = Sales Invoice No.
### DD Invoice Creation
Rewrite the OnExecuteDDCreation function in codeunit 50321. Currently the code loops through all the SEPA DD Mandates, it then makes various checks, if a check fails it goes to the next SEPA DD Mandate but doesn't start the checks again it goes to the next check. The Checks in Order are:
1. Customer Exists
2. Is Customer Blocked either Invoice or All
3. Is the DD Mandate either Closed or Blocked
4. Is the Expected No of Debits = to the Debit Counter
5. Is the Sales Order not posted
This would be reworked so if any of these checks fail then the loop would move to the next iteration an the Sales Invoice 