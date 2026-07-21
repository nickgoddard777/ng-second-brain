---
type: task
status: in-progress
due: 2026-07-27
tags:
  - cii
  - membership
  - work
created: 2026-07-08T11:43:12
project: "[[cii-pbi55179-midyear-membership]]"
title: Investigate customer payment terms and bank issues
work-personal: work
---

# Investigate Customer Payment Terms and Bank Issues

Investigate customer payment terms and bank issues for PBI55179.

## Notes
- Part of [[cii-pbi55179-midyear-membership]]

### Preferred Bank Account Code
When Job Queue Handler 2 runs this process the incoming Web Customer and Web Orders. The first step is to process the Web Customer Records that aren't processed. 


Codeunit 50121
	Proc CreateOrUpdateNavCustomerFromWebShop
		if customer exists, and WebCustomer Preferred Bank Account Code isn't blank then the Customer Preferred Bank Account Code gets set to the one on the Web Customer. 
		if customer doesn't exist then at the end of the creation process the routine there is a check to see if the customer bank  account exists, if not it then creates it and assigns the Customer Preferred Bank Account Code. I think there is a flaw in the logic as at the beginning of the procedure before the check to see if the customer exists there is a check to see if the Customer Bank Account Exists and if it doesn't it gets created there, so I think the check in the customer creation will pass and there fore the preferred Bank Account won't get filled in.
Codeunit 50170
	Proc 
Codeunit 50203
	Proc UpdateSalesLineWithP2Extension
		Sets the Membership Payment method and Preferred bank account with no check to see if they should be updated.



