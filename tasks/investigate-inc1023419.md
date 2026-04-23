---
type: task
status: complete
due: 2026-04-23
tags:
  - cii
  - incidents
  - work
---
Investigate INC1023419 - stuck order investigation.

Part of [[cii-incident-management]].

## Notes

Error Message is label Err10001 in codeunit 50170

This is called in 3 Places
- OnAfterReopenSalesDoc - checks if ACO_PublishToMagento
- OnAfterReopenSalesDoc - if Return Order and ACO_PublishToMagento and OrderType = Standard and ChannelType = Customer Service
- ValidateReturnOrder - if not CorporateAcct and ACO_PublishToMagento


Created a PBI for this.