---
type: task
status: pending
due: 2026-07-23
tags:
  - haynes
  - ebay
  - work
created: 2026-07-23T00:00:00
project: "[[haynes-amazon-ebay-integrations]]"
title: Fix eBay Authentication
work-personal: work
---

# Fix eBay Authentication

User gets an error when trying to authenticate the app.

## Error

```json
{"error_id":"invalid_request","error_description":"Input request parameters are invalid.","http_status_code":400}
```

Returned by eBay OAuth at the authorisation step. HTTP 400 — eBay rejected the request before any credential check, so this is a malformed/mismatched parameter rather than a bad password or expired token.

## Things to check
- [ ] Redirect URI / RuName matches the value registered against the app in the eBay developer account exactly (most common cause of this error)
- [ ] Correct environment — Production RuName + Production client ID, not Sandbox values mixed in
- [ ] `client_id` (App ID) is right for the environment
- [ ] `scope` values are valid and URL-encoded correctly; spaces between scopes, not commas
- [ ] `response_type=code` present and the whole URL properly encoded

## Notes
- Part of [[haynes-amazon-ebay-integrations]]
- Related: [[haynes-document-ebay-authorisation-process]] — check the documented process against what was actually used
- Possible link: Haynes Sandbox was deleted and recreated from Production on 2026-07-22 ([[haynes-config-mapping-prod-refresh-sandbox]]), which may have left environment-specific auth config pointing at the wrong values


OAuth Url:
https://auth.ebay.com/oauth2/authorize?client_id=AcoraLim-AcoraInb-PRD-a4735744e-cddeace7&response_type=code&redirect_uri=Acora_Limited-AcoraLim-AcoraI-ipbatis&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly https://api.ebay.com/oauth/scope/sell.edelivery https://api.ebay.com/oauth/api_scope/commerce.vero https://api.ebay.com/oauth/api_scope/sell.inventory.mapping https://api.ebay.com/oauth/api_scope/commerce.message https://api.ebay.com/oauth/api_scope/commerce.feedback https://api.ebay.com/oauth/api_scope/commerce.shippin
