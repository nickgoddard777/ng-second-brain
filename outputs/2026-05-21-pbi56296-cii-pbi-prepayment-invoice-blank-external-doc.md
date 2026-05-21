---
type: output
created: 2026-05-21
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi56296"
title: "Prepayment Invoice Comms Entry Fails When External Document No. Is Blank"
business-owner: "Rhianna Bailey-Barker"
servicenow: ["INC1021078"]
---

# PBI pbi56296: Prepayment Invoice Comms Entry Fails When External Document No. Is Blank

**Business Owner:** Rhianna Bailey-Barker
**ServiceNow:** INC1021078

---

## Why?

When Sales Prepayment Invoices are created and a Communication Entry is generated to send the data to the WebShop, if the External Document No. field on the invoice is blank, the current code sets the Order Ref to the Invoice No. The WebShop does not recognise the Invoice No. as a valid reference, causing the import to fail. As a result, the invoice does not appear on the customer's MyCII page.

A spreadsheet has been compiled listing Communication Entries affected by this issue since the beginning of the year.

There is a manual workaround: add the External Document No. to the invoice, delete the existing Communication Entry, then resend the Proforma Comms. This is time-consuming and unsustainable at scale.

---

## Impact

This is a customer-facing issue. Customers whose Prepayment Invoices have a blank External Document No. cannot see those invoices on MyCII. This causes confusion, missed payments, and increased support contact. The issue has been occurring since the start of 2026 and will continue to affect new invoices until fixed.

---

## Risk

If not fixed, customers will continue to be unable to see their prepayment invoices on MyCII, leading to missed payments, customer dissatisfaction, and increased support overhead. The manual workaround does not scale and is prone to human error.

---

## Proposed Fix

Add code to the **OnAfterCheckPrePmtDoc** event. When the Category Type is **Web** or **Customer Service**, check if the External Document No. is blank. If it is:

1. Check if the related Sales Order has an External Document No. — if so, use it.
2. If not, check if there is a Web Sales Order for this order — if so, use the External Document No. from the Web Sales Order.
3. If neither has an External Document No., raise an error.

This ensures the Communication Entry always has a valid WebShop-recognised Order Ref before being created.

---

## Time to Fix

**Estimated effort:** 6 hours

Code change in OnAfterCheckPrePmtDoc with testing across Web and Customer Service category scenarios. Need to verify the fallback logic (Sales Order then Web Sales Order) and the error path.

---

## Acceptance Criteria

- [ ] Prepayment invoices with a previously blank External Document No. now appear correctly on MyCII
- [ ] The External Document No. is automatically populated from the related Sales Order when blank
- [ ] If the Sales Order has no External Document No., it falls back to the Web Sales Order's External Document No.
- [ ] An error is raised if neither the Sales Order nor the Web Sales Order has an External Document No.
- [ ] Existing invoices with populated External Document No. continue to process correctly (no regression)
- [ ] Communication Entries created after the fix contain a valid, WebShop-recognised Order Ref
