---
type: output
created: 2026-05-01
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi56329"
title: "Payment Journal Not Created for Web Orders — Flag Risk and Zero-Amount Failure"
business-owner: "Adrian Nistor"
servicenow: ["INC1027032"]
---

# PBI pbi56329: Payment Journal Not Created for Web Orders — Flag Risk and Zero-Amount Failure

**Business Owner:** Adrian Nistor
**ServiceNow:** INC1027032

---

## Why?

Two related issues affect payment journal processing for Web Shop Orders in NAV:

**Issue 1 — Post Payment Journal flag reset risk**
The 'Post Payment Journal' flag in CII Setup can be set to 'After Creating Sales Order'. When this value is set, the Payment Journal is not created and posted as part of the order process. The flag appears to be changed to this value when an error occurs during payment journal or order creation — the order is then created, and the flag is changed back. However, there is a risk that the flag is not reset correctly, leaving CII Setup in a state where subsequent orders also fail to have their payment journals created and posted.

**Issue 2 — Zero-amount failure for No Payment orders**
Orders where the Payment Method is set to 'No Payment' are failing to process because the system attempts to create a Payment Journal entry with an amount of £0. This causes an error, blocking the order in the Web Orders Queue in NAV and requiring manual intervention to unblock and process the order.

---

## Impact

Both issues are actively occurring in production. Any Web Shop Order affected by the flag being incorrectly set will silently fail to generate a payment journal. Zero-value orders with the No Payment method are consistently blocked in the queue, with staff required to manually intervene each time.

---

## Risk

**Issue 1:** Payment journals are not created and posted in NAV, meaning the bank does not reconcile against these orders. This is a financial data integrity risk and will require manual reconciliation effort to identify and recover affected payments.

**Issue 2:** All orders with a zero-value Payment Method get stuck in the Web Orders Queue and cannot be processed automatically. This creates ongoing operational overhead and risks orders not being fulfilled in a timely manner.

---

## Proposed Fix

**Issue 1 — Job Queue to detect and recover from flag misconfiguration:**
Create a scheduled Job Queue entry to run each evening that:
1. Checks the 'Post Payment Journal' flag in CII Setup
2. If set to 'After Creating Sales Order', resets it to 'Before Creating Sales Order'
3. Identifies any orders that have a Web Payment record where the Payment Journal entry has not been posted
4. Creates and posts the missing payment journals for those orders

**Issue 2 — Guard clause in `CreateAndPostOrderPmtJnl` (CU 50153):**
Add a check at the beginning of the `CreateAndPostOrderPmtJnl` procedure in Codeunit 50153. If the Payment Method does not have the 'Zero Value CII Order' flag ticked, exit the function without attempting to create a payment journal. This field currently has no code behind it, so this change will not interfere with any other processes.

---

## Time to Fix

**Estimated effort:** 12 hours development time

This covers both the job queue implementation with recovery logic and the guard clause in CU 50153, including testing across affected order types.
