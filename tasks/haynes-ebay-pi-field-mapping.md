---
type: task
status: pending
due: 2026-04-27
tags:
  - haynes
  - ebay
  - integrations
  - work
created: 2026-04-16T00:00:00
project: "[[haynes-amazon-ebay-integrations]]"
title: eBay PI - Implement Field Mapping
work-personal: work
---

# eBay PI - Implement Field Mapping

Implement the field mapping for eBay purchase invoices.

## Notes
- Field mapping:
  1. Vendor Invoice No = Order No
  2. Posting Description = SKU (needs coding)
  3. MG Code = 53153
  4. Destination Code = 1968
  5. Nature Code = 244
  6. Dim_5 = type pull-through (see [[haynes-ebay-si-automate-dimension-5]] for type rules)
- Raised in [[haynes-integrations-stakeholder-meeting]]
