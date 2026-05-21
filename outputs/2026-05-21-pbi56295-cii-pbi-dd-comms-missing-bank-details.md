---
type: output
created: 2026-05-21
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi56295"
title: "DD Communication Entry Fails When Bank Account No or Sort Code Missing"
business-owner: "Barney Palmer"
servicenow: []
---

# PBI pbi56295: DD Communication Entry Fails When Bank Account No or Sort Code Missing

**Business Owner:** Barney Palmer
**ServiceNow:** N/A

---

## Why?

When a Direct Debit order is imported from the WebShop and a Communication Entry is created, the Mask procedure in Codeunit 50209 calls `COPYSTR` on the customer's Bank Account No and Sort Code fields. If either field is blank, the `COPYSTR` call receives an invalid parameter, producing the following error:

> Message: The value of COPYSTR parameter 2 is outside of the permitted range. The current value is: -1. The permitted range is: from 1 to 2,147,483,647.

This causes the DD Communication Entry creation to fail, which in turn blocks the WebShop import for that order.

---

## Impact

This affects any Direct Debit customer whose Customer Bank Account record has a blank Sort Code or Bank Account No. As more DD customers are onboarded via the WebShop, the frequency of this error is expected to grow. Each occurrence blocks the import of the affected order.

---

## Risk

If not fixed, customers paying by Direct Debit may experience delayed order processing when their bank details are incomplete. This leads to customer complaints, missed SLAs, and manual intervention to unblock affected orders.

---

## Proposed Fix

Add a check at the start of the Mask procedure in **Codeunit 50209**. Before attempting to mask the input string, verify whether it is blank. If the input string is blank, return blank immediately. This allows the Communication Entry to be created without Bank Account or Sort Code values, and the WebShop import process continues without error.

---

## Time to Fix

**Estimated effort:** 6 hours

Small, targeted code change in Codeunit 50209 with testing across DD import scenarios to confirm the fix handles blank bank details gracefully without side effects.

---

## Acceptance Criteria

- [ ] The Communication Entry is created successfully when the customer's Bank Account No is blank
- [ ] The Communication Entry is created successfully when the customer's Sort Code is blank
- [ ] The Communication Entry is created successfully when both Bank Account No and Sort Code are blank
- [ ] The COPYSTR parameter error no longer occurs during DD Comms Entry creation
- [ ] The WebShop import process completes without error for DD orders with missing bank details
- [ ] Existing DD orders with complete bank details continue to process and mask correctly
