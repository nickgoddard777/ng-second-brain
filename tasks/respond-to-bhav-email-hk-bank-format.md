---
type: task
status: complete
due: 2026-07-21
tags: []
created: 2026-04-29T00:00:00
title: Respond to Bhav's Email re HK Bank Format
work-personal: work
person:
  - "[[bhavanesh-laher]]"
---

# Respond to Bhav's Email re HK Bank Format

## Notes

### HK format
- [x] I have changed the company name in company information. However, it is still populating Infopro digital (HK) rather than Infopro Digital (Hong-Kong) Limited, please confirm the field this is being pulled from.
- [x] The ordering party address should be the company address not the bank address. Can this be pulled from company information.
- [x] Beneficiary Name is still being shortened. Why is this, from my understanding the field can have up to 35 characters.
- [x] Creditor building number – Can we move this to the Vendor card rather than the bank details; we will be using the bank card for the suppliers banking address not registered address.
- [x] Creditor street name is pulled from the Vendor card but the address on the vendor card is one line and included the door number. The line above can fix this issue, and we can split it out. (@Jessica Townsend we would need this in all companies as it will impact Kevins work on the supplier onboarding forms.)
- [x] Creditor town name is populating both city and post code.
- [x] Beneficiary account number is pulling the IBAN rather than account number. Please check mapping.
- [x] Payment Currency is mandatory, if the payment is HKD, we cannot populate that in the general journal or purchase invoice as it is the base currency. Can we default if its blank to HKD otherwise pick up the currency on the line.
- [x] Customer reference and instruction reference seem to be mapped one cell to the right.


### US ACH Format
- [x] Debtor ID is not picking up the ACH id in the company information tab.
- [x] Payment currency is mandatory: Can we default this to USD if blank in the payment journal.
- [x] Reference Number: map this to the document number on the payment journal.
- [x] Debtor Agent clearing: Is not being picked up from the company information – should this be populated somewhere else ?
- [x] Local Instrument code should be CCD not 001. Can this be changed.