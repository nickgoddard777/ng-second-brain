---
type: output
created: 2026-05-01
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi56292"
title: "Direct Debit communication entry errors when Mandate Entry not found"
business-owner: "None found by Acora"
servicenow: []
---

# PBI pbi56292: Direct Debit Communication Entry Errors When Mandate Entry Not Found

**Business Owner:** None found by Acora
**ServiceNow:** N/A

---

## Why?

Orders that are for Direct Debits. 

When the following 3 events happen in NAV, a Communication Entry is created to send the details to the Web Shop:

- After Posting a Sales Document,
- Resend DD Confirmation on the Sales Order page,
- After the Fulfilment Status is set to Fulfilled.

The creation code tries to get the Year from the Posting Date on the Direct Debit Mandate Entry. If the Direct Debit Mandate Entry is not found or the posting date is blank an unhandled error occurs and the current process is stopped.

The function responsible for retrieving the Direct Debit Mandate Entry (`GetDirectDebitMandateSchedule`) returns `false` when no record is found, but this return value is not currently checked — meaning any missing or unresolved mandate entry causes an unhandled failure.

---

## Impact

The issue affects a specific subset of web orders — most likely those where the communication entry is created before the DD Mandate Entry exists, or where the DD Mandate Entry fails to be created at all. The root cause appears to be a timing issue in the creation sequence. While the frequency is not fully quantified, the nature of the bug means it could affect any web order where this race condition or creation failure occurs, and it is unlikely to resolve itself without a code fix.

---

## Risk

If not actioned, communication entries for affected Direct Debit Mandate Entries will not be created. As a result, the customer's MyCII page will not be updated, leaving customers with an inaccurate view of their account. Additionally, because the error halts the process entirely, any subsequent steps in the web order Direct Debit creation flow will also fail to complete.

---

## Proposed Fix

The fix involves two defensive checks in **Codeunit 50209**:

1. **Null check on `GetDirectDebitMandateSchedule`** — after each call to this function, check the return value. If `false` (i.e. no mandate entry found), exit the `CreateCommunicationEntry` function gracefully, allowing the rest of the process to continue without error.

2. **Blank Posting Date check** — add a further check that the Posting Date on the Direct Debit Mandate Entry is not blank. If blank, exit `CreateCommunicationEntry` in the same way.

There are **four call sites** requiring these checks:
- One in the `CreateAnnualDDComm` procedure
- Three in the `CreateMonthlyDDComm` procedure

At the same time, there is significant code duplication between `CreateAnnualDDComm` and `CreateMonthlyDDComm`. This should be refactored as part of the same change to improve maintainability.

---

## Time to Fix

**Estimated effort:** 6 hours development time

This includes adding the four null/blank checks, refactoring the duplicated code between the two procedures, and testing.
