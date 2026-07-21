---
type: task
status: in-progress
due: 2026-07-27
tags:
  - work
  - cii
  - incidents
created: 2026-05-05T00:00:00
project: "[[cii-incident-management]]"
title: Investigate INC1041665 - Order 2001190282 should be DD not Transfer
work-personal: work
---

# Investigate INC1041665 - Order 2001190282 should be DD not Transfer

## Notes
password g44vunKRFtfwzJKRtNJ7


- 2026-05-27 - Had a meeting regarding this and need to further investigate the issue
- 2026-06-26 - Had second meeting went through the data coming through from MyCII
- 2026-06-26 - Started Investigation

### Issue
If someone creates a membership order on the web and the membership payment is a DD but they choose to pay the admin fee via bank transfer there is an issue as it treats the whole order as a transfer, and it changes the Customers payment method the CC/bank transfer instead of leaving it as a DD, the DD doesn't get created. If the same happens but they pay the admin fee using a Credit Card this works.  

### Investigation
- Example of transfer order: Order No: 2001190282 Customer PIN: 002143224H
- Example of credit card order: Order No: 2001197856 Customer PIN: 001798912H
