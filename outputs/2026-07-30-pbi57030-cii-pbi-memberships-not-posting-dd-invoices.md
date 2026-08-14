---
type: output
created: 2026-07-30
tags:
  - cii
  - pbi
project: "[[cii-incident-management]]"
pbi: "pbi57030"
title: "Customer Memberships Not Posting for DD Invoices"
business-owner: "Barnaby Palmer"
servicenow: ["INC1022108"]
---

# PBI 57030: Customer Memberships Not Posting for DD Invoices

**Business Owner:** Barnaby Palmer
**ServiceNow:** INC1022108

---

## Why?

Two related defects affect Direct Debit (DD) membership invoicing in Business Central:

**1. Document links not set on prepayment invoice posting.**
When a Sales Invoice is posted where the payment method is Direct Debit, the `LinkDocType` should change to `Invoice` and the `LinkToDocNo` should change to the Posted Sales Invoice No. This is not happening, because the code to perform this update is not present in the PrePayment Invoice posting routine. The result is that posted DD prepayment invoices are left without correct document links back to the posted invoice.

**2. Faulty control flow in the DD invoice creation checks.**
A number of checks run to decide whether a DD invoice should be created. The logic is wrong: after a check fails, the routine retrieves the next Mandate but does **not** restart the checks from the beginning — it simply moves on to the next invoice. This can lead to:
- invoices being created against the wrong customer, and
- invoices being created where a Mandate would have failed an earlier check.

---

## Impact

This does not affect all Direct Debits, but when either issue occurs it is a major problem:

- **DDs not collected** — where invoices are not created or linked correctly, the Direct Debit is not collected, resulting in lost/uncollected revenue.
- **Invoices raised against the wrong customer** — the faulty mandate-check flow can attach an invoice to the wrong customer, a serious data-integrity and customer-trust issue.

Frequency is intermittent (condition-dependent rather than every DD run), but the severity per occurrence is high.

---

## Risk

If this is not actioned:

- **Lost / uncollected revenue** — Direct Debit payments are not collected because invoices are not linked or created correctly, and the leakage may go unnoticed.
- **Invoices to the wrong customer** — the faulty mandate-check flow creates invoices against the wrong customer, a data-integrity breach with potential financial and reputational exposure.
- **Reconciliation / audit burden** — broken document links (`LinkToDocNo`) make posted invoices hard to trace back, increasing manual correction effort and creating audit-trail gaps.

---

## Proposed Fix

Address both defects:

1. **Add the missing PrePayment Invoice posting code** so that, on posting a DD prepayment invoice, `LinkDocType` is set to `Invoice` and `LinkToDocNo` is set to the Posted Sales Invoice No.
2. **Rewrite the DD invoice creation check loop** so that when a check fails for a Mandate, validation restarts from the beginning for the next Mandate — rather than skipping to the next invoice — preventing invoices being created against the wrong customer or where an earlier check should have failed.

---

## Time to Fix

**Estimated effort:** 1–2 days

Both changes are reasonably localised, but the wrong-customer risk means the mandate-check flow warrants careful testing across DD scenarios before release.

---

## Acceptance Criteria

- [ ] On posting a DD prepayment invoice, `LinkDocType` is set to `Invoice` and `LinkToDocNo` is set to the Posted Sales Invoice No.
- [ ] The DD-creation mandate checks restart validation from the beginning for each Mandate, rather than skipping to the next invoice after a failed check.
- [ ] No invoice is created against the wrong customer.
- [ ] No DD invoice is created where an earlier check would fail.
- [ ] Changes are regression tested across representative Direct Debit scenarios.
