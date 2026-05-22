---
type: task
status: complete
due: 2026-05-15
tags:
  - haynes
  - ebay
  - documentation
  - work
created: 2026-05-15T00:00:00
project: "[[haynes-amazon-ebay-integrations]]"
title: Fully Document the eBay Authorisation Process
work-personal: work
---

# Fully Document the eBay Authorisation Process

Document the full eBay authorisation process for the Haynes integration.

## Overview

eBay uses OAuth 2.0 for API authorisation. There are two grant flows, each producing a different token type:

| Flow | Token Type | Use Case |
|------|-----------|----------|
| Client Credentials Grant | Application access token | Non-user-specific data (metadata, taxonomy) |
| Authorization Code Grant | User access token | User-specific data (orders, inventory, selling) |

All tokens are minted via the Identity API endpoint:
- **Production:** `POST https://api.ebay.com/identity/v1/oauth2/token`
- **Sandbox:** `POST https://api.sandbox.ebay.com/identity/v1/oauth2/token`

---

## Prerequisites

### 1. Application Keys
- Register with the eBay Developer Program
- Generate application keys (App ID / Client ID, Dev ID, Cert ID / Client Secret) for Sandbox and Production
- Each keyset is assigned a set of **OAuth scopes** controlling which API methods the app can call

### 2. RuName (Redirect URL Name)
- Required for User access tokens (not needed for Application tokens)
- A custom redirect identifier eBay generates for your app — used in place of a standard redirect_uri
- Separate RuName values for Sandbox and Production
- Configure via Developer Portal > Application Keys > User Tokens

**RuName configuration fields (for User tokens):**

| Field | Purpose |
|-------|---------|
| Display Title | Shown at top of the Grant Application Access page |
| Privacy Policy URL | Link to your privacy policy |
| Auth Accepted URL | Redirect destination when user grants consent |
| Auth Declined URL | Redirect destination when user declines consent |

### 3. Base64-Encoded Credentials
- Combine: `<client_id>:<client_secret>`
- Base64 encode the combined string
- Use in the Authorization header as: `Basic <B64-encoded-credentials>`

---

## Flow 1: Client Credentials Grant (Application Token)

For accessing non-user-specific resources (e.g., Browse API, Taxonomy API).

### Request

```
POST https://api.ebay.com/identity/v1/oauth2/token

Headers:
  Content-Type: application/x-www-form-urlencoded
  Authorization: Basic <B64-encoded-oauth-credentials>

Body:
  grant_type=client_credentials
  &scope=<URL-encoded space-separated scope list>
```

### Response

```json
{
  "access_token": "v^1.1#i^1#...",
  "expires_in": 7200,
  "token_type": "Application Access Token"
}
```

### Key Details
- Token lifetime: **2 hours** (7200 seconds)
- No user consent required — the app has inherent authorisation
- Rate limit: **1,000 requests/day**
- When token expires, mint a new one (no refresh token)

---

## Flow 2: Authorization Code Grant (User Token)

For accessing user-specific resources (orders, inventory, selling, etc.). This is a **two-step process**: get user consent, then exchange the authorisation code for a token.

### Step 1: Get User Consent

Redirect the user to eBay's Grant Application Access page:

```
GET https://auth.ebay.com/oauth2/authorize?
  client_id=<app-client-id>
  &redirect_uri=<RuName-value>
  &response_type=code
  &scope=<URL-encoded space-separated scope list>
  &state=<optional-CSRF-value>
  &locale=<optional-locale>
  &prompt=login              // optional, forces re-login
```

**Sandbox endpoint:** `https://auth.sandbox.ebay.com/oauth2/authorize`

**Query parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| client_id | Yes | Your App ID / Client ID |
| redirect_uri | Yes | Your RuName value |
| response_type | Yes | Must be `code` |
| scope | Yes | URL-encoded space-separated scope list |
| state | No | CSRF protection value (recommended) |
| locale | No | Localise consent page (e.g., `en-GB`) |
| prompt | No | Set to `login` to force re-authentication |

**What happens:**
1. User sees the Grant Application Access page listing the permissions your scopes require
2. User clicks **Agree and Continue** (or **Not now** to decline)
3. On consent, eBay redirects to your Auth Accepted URL with an authorisation code:

```
https://your-accept-url.com?
  code=v%5E1.1%23...NjA%3D
  &expires_in=299
  &state=<your-state-value>
```

- The `code` is single-use and expires in ~5 minutes (299 seconds)
- The `state` value is echoed back for CSRF verification

### Step 2: Exchange Authorisation Code for User Token

```
POST https://api.ebay.com/identity/v1/oauth2/token

Headers:
  Content-Type: application/x-www-form-urlencoded
  Authorization: Basic <B64-encoded-oauth-credentials>

Body:
  grant_type=authorization_code
  &code=<URL-encoded-authorization-code>
  &redirect_uri=<RuName-value>
```

**Note:** The authorisation code returned by eBay is already URL-encoded. If your HTTP library auto-encodes, decode it first to avoid double-encoding.

### Response

```json
{
  "access_token": "v^1.1#i^1#p^3#r^1...XzMjRV4xMjg0",
  "expires_in": 7200,
  "refresh_token": "v^1.1#i^1#p^3#r^1...zYjRV4xMjg0",
  "refresh_token_expires_in": 47304000,
  "token_type": "User Access Token"
}
```

### Key Details
- Access token lifetime: **2 hours** (7200 seconds)
- Refresh token lifetime: **~18 months** (47,304,000 seconds)
- Rate limit: **10,000 requests/day** for authorization_code grant

---

## Refreshing a User Access Token

When a User access token expires, use the refresh token to mint a new one without requiring user consent again.

### Request

```
POST https://api.ebay.com/identity/v1/oauth2/token

Headers:
  Content-Type: application/x-www-form-urlencoded
  Authorization: Basic <B64-encoded-oauth-credentials>

Body:
  grant_type=refresh_token
  &refresh_token=<refresh-token-value>
  &scope=<URL-encoded scope list>   // optional
```

- If `scope` is omitted, defaults to the scopes from the original consent request
- If `scope` is provided, it must be equal to or a subset of the original consent scopes

### Response

```json
{
  "access_token": "v^1.1#i...AjRV4yNjA=",
  "expires_in": 7200,
  "token_type": "User Access Token"
}
```

### Key Details
- Rate limit: **50,000 requests/day** for refresh_token grant
- Best practice: refresh **after** expiry (on "Invalid access token" error) rather than tracking lifetimes
- If the refresh token itself expires or is revoked, you must redo the full consent flow

---

## Token Revocation & Expiry

Refresh tokens can be revoked when:
- The eBay user changes their username or password
- The user manually revokes app access via My eBay > Third-party app access
- eBay detects suspicious activity

When revoked, you must restart the consent flow from Step 1.

---

## Rate Limits Summary

| Grant Type | Token Type | Daily Limit |
|------------|-----------|-------------|
| `client_credentials` | Application access token | 1,000/day |
| `authorization_code` | User access token | 10,000/day |
| `refresh_token` | User access token (renewed) | 50,000/day |

---

## OAuth Scopes

- Scopes are assigned to your application keyset in the Developer Portal
- Each API method documents which scopes it requires
- Tokens must be minted with all scopes needed for the methods you intend to call
- More scopes = more permissions the user must consent to — use only what you need
- Sandbox and Production may have different scope sets
- Adding new scopes to an existing token requires a fresh consent from each user

---

## Best Practices

1. **Store tokens securely** — treat access tokens, refresh tokens, and client secrets as confidential
2. **Re-use tokens until expiry** — don't mint new tokens on every request
3. **Request all needed scopes upfront** — adding scopes later requires new consent from every user
4. **Handle revocations gracefully** — refresh tokens can be unexpectedly revoked
5. **Match environment** — Sandbox tokens only work with Sandbox APIs, Production with Production
6. **URL-encode scopes** — scope values must be URL-encoded and space-separated in requests

---

## Using OAuth with Traditional APIs (Trading API)

For the Trading API, Post Order API, and Business Policy Management API:

**Trading API:**
- Remove `<RequesterCredentials>` from the request payload
- Add HTTP header: `X-EBAY-API-IAF-TOKEN: <UserAccessToken>`

**Post Order API:**
- Set Authorization header: `IAF <UserAccessToken>`

**Business Policy Management API:**
- Remove header `X-EBAY-SOA-SECURITY-TOKEN`
- Add header: `X-EBAY-SOA-SECURITY-IAFTOKEN: <UserAccessToken>`

---

## eBay OAuth Client Libraries

eBay provides official client libraries for token minting:
- [C#](https://github.com/eBay/ebay-oauth-csharp-client)
- [Java](https://github.com/eBay/ebay-oauth-java-client)
- [Node.js](https://github.com/eBay/ebay-oauth-nodejs-client)
- [Python](https://github.com/eBay/ebay-oauth-python-client)
- [Android](https://github.com/eBay/ebay-oauth-android-client)

## Notes
- Source: https://developer.ebay.com/develop/guides-v2/authorization
