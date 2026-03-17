---
type: idea
tags: [acora]
created: 2026-03-17
---

# FDL v28 required fixes
These are the reported issues with the FDL bespoke:

- src/codeunit/Cod50000.GroupCreditChecksMgmt.al (283,77) - Error AL0280: The event 'OnAfterCustLedgEntryInsertInclPreviewMode' is not found in the target 'Codeunit Microsoft.Finance.GeneralLedger.Posting."Gen. Jnl.-Post Line"'
- src/page/Pag50045.ComplaintsCard.al (281,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50045.ComplaintsCard.al (284,31) - Error AL0171: The property value '"Table ID" = const(50035), "No." = field("Log No.")' on property 'SubPageLink' is not valid.
- src/page/Pag50047.ComplaintsList.al (144,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50047.ComplaintsList.al (147,31) - Error AL0171: The property value '"Table ID" = const(50035), "No." = field("Log No.")' on property 'SubPageLink' is not valid.
- src/page/Pag50050.ItemGrades.al (51,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50050.ItemGrades.al (54,31) - Error AL0171: The property value '"Table ID" = const(Database::"ACO Item Grade"), "No." = field("Unique Code")' on property 'SubPageLink' is not valid. src/page/Pag50056.SampleCard.al (297,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50056.SampleCard.al (300,31) - Error AL0171: The property value '"Table ID" = const(Database::"ACO Sample"), "No." = field("No.")' on property 'SubPageLink' is not valid.
- src/page/Pag50060.NonConformanceList.al (153,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50060.NonConformanceList.al (156,31) - Error AL0171: The property value '"Table ID" = const(50035), "No." = field("Log No.")' on property 'SubPageLink' is not valid.
- src/codeunit/Cod50000.GroupCreditChecksMgmt.al (316,77) - Error AL0280: The event 'OnAfterVendLedgEntryInsertInclPreviewMode' is not found in the target 'Codeunit Microsoft.Finance.GeneralLedger.Posting."Gen. Jnl.-Post Line"'
- src/page/Pag50079.EvidenceLog.al (92,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50079.EvidenceLog.al (96,31) - Error AL0171: The property value '"Table ID" = CONST(50046), "No." = FIELD("Evidence Log Id")' on property 'SubPageLink' is not valid.
- src/page/Pag50090.SampleList.al (70,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/page/Pag50090.SampleList.al (74,31) - Error AL0171: The property value '"Table ID" = CONST(50032), "No." = FIELD("No.")' on property 'SubPageLink' is not valid.
- src/pageextension/Pag-Ext50066.LotNoInformationCard.al (335,40) - Error AL0185: Page 'Document Attachment Factbox' is missing src/pageextension/Pag-Ext50066.LotNoInformationCard.al (339,31) - Error AL0171: The property value '"Table ID" = const(6505), "No." = field("ACO Unique Code")' on property 'SubPageLink' is not valid.
- src/codeunit/Cod50046.BondedStockManagement.al (129,77) - Error AL0280: The event 'OnAfterInitFromProdOrderComp' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/page/Pag50101.BriefCard.al (294,40) - Error AL0185: Page 'Document Attachment Factbox' is missing
- src/page/Pag50101.BriefCard.al (298,31) - Error AL0171: The property value '"Table ID" = CONST(167), "No." = FIELD("No.")' on property 'SubPageLink' is not valid. src/page/Pag50019.InventoryPosition.al (284,47) - Error AL0132: 'Codeunit Microsoft.Inventory.Availability."Item Availability Forms Mgt"' does not contain a definition for 'ShowItemAvailFromItem'
- src/codeunit/Cod50025.LotManagement.al (12,77) - Error AL0280: The event 'OnAfterInitFromPurchLine' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/page/Pag50019.InventoryPosition.al (284,92) - Error AL0132: 'Codeunit Microsoft.Inventory.Availability."Item Availability Forms Mgt"' does not contain a definition for 'ByEvent'
- src/page/Pag50019.InventoryPosition.al (350,47) - Error AL0132: 'Codeunit Microsoft.Inventory.Availability."Item Availability Forms Mgt"' does not contain a definition for 'ShowItemAvailFromItem'
- src/page/Pag50019.InventoryPosition.al (350,92) - Error AL0132: 'Codeunit Microsoft.Inventory.Availability."Item Availability Forms Mgt"' does not contain a definition for 'ByBOM'
- src/table/Tab50002.SharedDocumentHeader.al (278,18) - Error AL0196: The call is ambiguous between the method 'RunModal(Integer, [Table], [Joker])' defined in Class 'Page' by the extension '' and the method 'RunModal(Text, [Table], [Joker])' defined in Class 'Page' by the extension ''.
- src/table/Tab50002.SharedDocumentHeader.al (296,18) - Error AL0196: The call is ambiguous between the method 'RunModal(Integer, [Table], [Joker])' defined in Class 'Page' by the extension '' and the method 'RunModal(Text, [Table], [Joker])' defined in Class 'Page' by the extension ''.
- src/table/Tab50003.SharedTradeLedgerEntry.al (119,18) - Error AL0196: The call is ambiguous between the method 'RunModal(Integer, [Table], [Joker])' defined in Class 'Page' by the extension '' and the method 'RunModal(Text, [Table], [Joker])' defined in Class 'Page' by the extension ''.
- src/table/Tab50003.SharedTradeLedgerEntry.al (137,18) - Error AL0196: The call is ambiguous between the method 'RunModal(Integer, [Table], [Joker])' defined in Class 'Page' by the extension '' and the method 'RunModal(Text, [Table], [Joker])' defined in Class 'Page' by the extension ''.
- src/pageextension/Pag-Ext50093.ProdOrderComponents.al (244,43) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromProdOrderComp'
- src/report/Rep50003.ShippingInstructions.al (525,35) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromPurchLine'
- src/report/Rep50012.CertificateOfConformity.al (152,58) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromSalesLine'
- src/codeunit/Cod50025.LotManagement.al (20,77) - Error AL0280: The event 'OnAfterInitFromProdOrderLine' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/codeunit/Cod50044.QualityOrderApprMgt.al (549,35) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromPurchLine'
- src/codeunit/Cod50080.ProdOrdLineAssignLot.al (6,35) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromProdOrderLine'
- src/codeunit/Cod50081.ProdOrdCompAssignLot.al (10,35) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromProdOrderComp'
- src/report/Rep50031.ProductionLabelLots.al (186,50) - Error AL0132: 'Record "Tracking Specification" temporary' does not contain a definition for 'InitFromProdOrderLine'
- src/codeunit/Cod50025.LotManagement.al (28,77) - Error AL0280: The event 'OnAfterInitFromProdOrderComp' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/codeunit/Cod50025.LotManagement.al (37,77) - Error AL0280: The event 'OnAfterInitFromSalesLine' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/codeunit/Cod50025.LotManagement.al (45,77) - Error AL0280: The event 'OnAfterInitFromTransLine' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/codeunit/Cod50025.LotManagement.al (53,77) - Error AL0280: The event 'OnAfterInitFromItemJnlLine' is not found in the target 'Table Microsoft.Inventory.Tracking."Tracking Specification"'
- src/codeunit/Cod50034.DocAttachmentMgt.al (226,46) - Error AL0118: The name '"Document Attachment Factbox"' does not exist in the current context.

## Related
- [[raise-servicenow-tickets-for-al-go-failures]]
- [[al-go-support-email-notifications]]