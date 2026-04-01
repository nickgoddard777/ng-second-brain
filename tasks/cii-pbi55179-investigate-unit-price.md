---
type: task
status: complete
due: 2026-03-24
tags:
  - cii
  - membership
  - webshop
  - work
project: "[[cii-pbi55179-midyear-membership]]"
title: CII PBI-55179 Investigate Unit Price
---
# Investigate where to update unit price
Investigate where the unit price should be updated as part of the midyear membership solution. Identify the correct table/field/code path where the update needs to happen.


CU 50122 - Function InsertSalesLine - Unit Price only gets set if the Item Category Type is not Membership. The ones we are looking at are all membership. For these the unit price comes from standard sales pricing????

Clean-up price selection



Imports from CU 50153


After creating/updating Sales Header - 

InsertSalesLine called for each MageSalesLine

	Code Sets the No. on the new sales line and triggers the releated events.
		T 37 Sales Line 
			field No. OnValidate
				Standard Price functionality
		
		CU 50170 SalesOrderEvents
			No. OnAfterValidateEvent
	*			If Doc Type Order and Line Type = Item
					if (Doc type = order and Order Type = Standard and Channel Type = customer service and (CL S Code <> '' and CreditEnabled)) and not Publish to Magento
						XXXXXX
						
	*				If Membership Item
						if Membership Upgrade
							CheckMembershipCharteredHasFee
							Unit Price = Membership Charge Amount Ex Vat
	*					else
							Unit Price = GetSalesPriceForDiscoveryAndAspireMembership
				else
					Doc type = Invoice and Line Type = Item
						if Category Type = Assess
						 XXXXXX
						 
	
						 
 GetSalesPriceForDiscoveryAndAspireMembership
	Not Item Variant
		unit price = 0
	