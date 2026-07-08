---
type: output
created: 2026-07-08
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi57800"
title: "Customer Service Membership renewals are not updating details"
business-owner: "Mrudula Ranade"
servicenow: []
---

# PBI pbi57800: Customer Service Membership Renewals Are Not Updating Details

**Business Owner:** Mrudula Ranade
**ServiceNow:** N/A — found during UAT testing of the Mid-Year Membership fix (PBI 55179) by Mrudula Ranade

---

## Why?

When a Customer Service order is sent to the Web for updating, and is then imported back into NAV with the **Is Renewal** flag set to true, none of the code runs that updates the Sales Order with fields such as:

- **External Document No.** (the Web Order No.)
- **Adyen Reference** (where applicable)

Without these details the Sales Order cannot be matched for payment checking or fulfilment, so renewal orders effectively get stuck.

---

## Impact

Every Customer Service renewal order that round-trips through the Web is affected — all orders with Is Renewal = true skip the update code on import. The number of stuck Sales Orders grows continuously as renewals come through.

---

## Risk

- **Customer impact** — members pay for their renewal but the order is never fulfilled, so their membership is not renewed. This will generate complaints and chase-ups.
- **Financial/data integrity** — payments cannot be reconciled against Sales Orders that are missing the Web Order No. and Adyen Reference.
- **Operational** — each stuck order needs manual intervention by support to identify, correct, and push through.

---

## Proposed Fix

In **codeunit 50203, line 22**: add `pMageSalesHeader."Order Type"::"Membership Renewal"` as an extra option to the valueset that currently contains `pMageSalesHeader."Order Type"::Standard`.

This allows renewal orders to run the same Sales Order update code as standard orders on import, populating External Document No. and Adyen Reference so payment checking and fulfilment can proceed.

---

## Time to Fix

**Estimated effort:** 1 hour

One-line valueset change in a single codeunit plus a quick test of the renewal import.

---

## Acceptance Criteria

- [ ] Renewal orders imported from the Web update the Sales Order with External Document No. (Web Order No.)
- [ ] Renewal orders imported from the Web update the Adyen Reference where applicable
- [ ] Renewal orders complete payment checking and fulfilment without getting stuck
- [ ] Standard order imports are unaffected
