---
type: output
created: 2026-07-08
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi55527"
title: "CII Customer Web Orders Two PINs"
business-owner: "N/A"
servicenow: []
---

# PBI pbi55527: CII Customer Web Orders Two PINs

**Business Owner:** N/A
**ServiceNow:** N/A

---

## Why?

When web orders are imported, if the Web Customer has not been created, the code does not check for this correctly. Part of the import logic is still allowed to run — but against the wrong customer.

Concrete example: an order for **002076962D** came through, and on the CII Web Customers pop-up the record contains details for **two PINs**.

---

## Impact

The issue occurs occasionally on web order imports, but the number of affected customer records will grow over time if left unfixed. Each occurrence leaves a customer record holding details for two PINs, and any order processed this way runs against the wrong customer.

---

## Risk

- **Data integrity** — customer records accumulate details for the wrong PIN, and orders are processed against the wrong customer.
- **Customer impact** — billing, membership, or debt could be recorded against the wrong person's PIN.
- **Operational** — each affected record requires manual support effort to identify and untangle, and the cleanup burden grows the longer the defect remains.

---

## Proposed Fix

In **codeunit 50117**:

1. Move the code from lines 253–380 into a separate function, adding a call to the new function at line 253.
2. Change the if statement `if CustId <> '' then begin` to `if CustId = '' then exit;`
3. Change the if statement `if MageCustExists(...) then begin` to `if not MageCustExists(...) then exit;`
4. Remove the two extra `end` statements from the end of the new function, which are no longer required.

This converts the nested conditions into guard clauses, so the import exits cleanly when the Web Customer does not exist instead of partially running against the wrong customer.

---

## Time to Fix

**Estimated effort:** 2 hours

Small, well-understood refactor confined to a single codeunit.

---

## Acceptance Criteria

- [ ] Orders with no Web Customer exit cleanly without running downstream import code
- [ ] Orders are never processed against the wrong customer/PIN
- [ ] Existing valid web order imports are unaffected
- [ ] The example order 002076962D scenario no longer produces a Web Customer record with two PINs
