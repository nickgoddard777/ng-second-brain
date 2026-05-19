---
type: task
status: complete
due: 2026-05-07
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


**Ebay Commission** is:

G/L No : 244002
DE Code : 1968
MG Code : 53153 (unless Practical Lifestyle title which is 53161. Note that we are not actively selling PL items on Ebay).
NA Code : 244
Dim_5 Code : PMarketplace or DMarketplace depending on whether the items sold was Print (includes combo) or Digital.

**Ebay Marketing** is

G/L No : 244004
DE Code : 1968
MG Code : 53153 (unless Practical Lifestyle title which is 53161. Note that we are not actively selling PL items on Ebay).
NA Code : 244
Dim_5 Code : PMarketplace or DMarketplace depending on whether the items sold was Print (includes combo) or Digital.