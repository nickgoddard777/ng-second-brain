---
type: task
status: complete
due: 2026-04-14
tags:
  - work
  - cii
  - business-central
created: 2026-04-14T00:00:00
project: "[[cii-dd-comms-bug-pbis]]"
title: Create Spec for Posting Date PBI
work-personal: work
---

# Create Spec for Posting Date PBI

Write the specification for the DD Comms posting date bug PBI.

## Notes
- Blocks: [[cii-dd-comms-posting-date-devops-pbi]]

## Issue
In the code that creates a communication entry for Direct Debit orders, if a Direct Debit Mandate Entry is not found then an unhandled error is thrown and the process stops. The unhandled error could roll back the whole process being run.
This code happens for the following events:
- After Posting a Sales Document
- Resend DD Confirmation on the Sales Order Page
- After the Fulfilment status is set to Fulfilled 

## Proposal 
The code in question is in two procedures CreateAnnualDDComm and Create MonthlyDDComm in codeunit 50209. To get the Direct Debit Mandate Entry procedure GetDirectDebitMandateSchedule is called. This procedure returns a boolean that is true if an Entry is found and false if not. The code in the above two procedures does not use this return value, the proposal is to add a code break if the return value is false. This will allow the code to finish rather than the operation stopping. 