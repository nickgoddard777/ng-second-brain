---
type: task
status: complete
due: 2026-04-16
tags:
  - haynes
  - integrations
  - work
created: 2026-04-16T00:00:00
project: "[[haynes-amazon-ebay-integrations]]"
title: Haynes Integrations Stakeholder Meeting
work-personal: work
---

# Haynes Integrations Stakeholder Meeting

Meet with stakeholders to kick off the Amazon and eBay integrations for Haynes.


## Agenda
1. Amazon - Sales invoices including purchases data / Pweb v Dweb issue / Stock location  
2. eBay - Stock location  
3. Web - Need to test the sharepoint upload / Shopify issues / Locations  
4. General - How we edit mapping lists going forward

## Notes
- First step in [[haynes-amazon-ebay-integrations]]

### Ebay
#### Sales Invoice/Credits
1. How are we mapping Variant Code
2. How are we specifying the Location. (6a3482e6-72e3-43b8-bdc4-90f2b88dc1bd find Wiley) Line level
3. Check if padding will accept more that one character and if so we could add MP- to the beginning of the item, to save having to map everything.
4. Make sure I sent over table for mapping
5. DImension 5 needs to be automated based on type, if type = print or bundle then Pmarketplace, Digital dmarketplace
6. Unit price not pulling through
7. Do some mapping config in production and then make a new copy of sandbox haynes from this.
8. Country Code needs mapping on the line
#### Purchase Invoice
1. Mapping
	1. Vendor Invoice No = Order no
	2. Posting Description SKU (need to code this)
	3. MG Code = 53153
	4. Destination Code 1968
	5. Nature Code = 244
	6. Dim_5 need to pull through the type as per 
2. Marketing Fees need to go to a different GL Code so this value can't be hard coded. Need to get a full list of descriptions

### Amazon
#### Sales Invoices 
1. Check why we still have the fee lines
2. Check again for where they are being shipped from this is at line level 

#### Purchase Invoice
1. The No field needs mapping, need to get a list of the different fees

### Shopify
They have moved to shopify - how can wwe do this.