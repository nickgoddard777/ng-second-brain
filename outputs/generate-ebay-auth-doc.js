const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, ExternalHyperlink,
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const headerShading = { fill: "2E4057", type: ShadingType.CLEAR };
const altShading = { fill: "F5F7FA", type: ShadingType.CLEAR };

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: headerShading, margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })],
  });
}

function cell(text, width, shading) {
  const opts = { borders, width: { size: width, type: WidthType.DXA }, margins: cellMargins, children: [] };
  if (shading) opts.shading = shading;
  const runs = text.split(/(`[^`]+`)/).map(part => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return new TextRun({ text: part.slice(1, -1), font: "Consolas", size: 18, color: "C7254E" });
    }
    return new TextRun({ text: part, font: "Arial", size: 20 });
  });
  opts.children.push(new Paragraph({ children: runs }));
  return new TableCell(opts);
}

function makeTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => headerCell(h, colWidths[i])) }),
      ...rows.map((row, ri) =>
        new TableRow({
          children: row.map((c, i) => cell(c, colWidths[i], ri % 2 === 1 ? altShading : undefined)),
        })
      ),
    ],
  });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 36, color: "2E4057" })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 28, color: "2E4057" })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 120 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 24, color: "3B6B8A" })] });
}
function para(text, opts = {}) {
  const runs = text.split(/(`[^`]+`)/).map(part => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return new TextRun({ text: part.slice(1, -1), font: "Consolas", size: 18, color: "C7254E", ...opts });
    }
    return new TextRun({ text: part, font: "Arial", size: 22, ...opts });
  });
  return new Paragraph({ spacing: { after: 120 }, children: runs });
}
function bold(text) { return para(text, { bold: true }); }
function bullet(text, level = 0) {
  const runs = text.split(/(`[^`]+`)/).map(part => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return new TextRun({ text: part.slice(1, -1), font: "Consolas", size: 18, color: "C7254E" });
    }
    return new TextRun({ text: part, font: "Arial", size: 22 });
  });
  return new Paragraph({ numbering: { reference: "bullets", level }, spacing: { after: 60 }, children: runs });
}
function numbered(text, level = 0) {
  const runs = text.split(/(`[^`]+`)/).map(part => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return new TextRun({ text: part.slice(1, -1), font: "Consolas", size: 18, color: "C7254E" });
    }
    return new TextRun({ text: part, font: "Arial", size: 22 });
  });
  return new Paragraph({ numbering: { reference: "numbers", level }, spacing: { after: 60 }, children: runs });
}
function code(lines) {
  return lines.map(line =>
    new Paragraph({
      shading: { fill: "F4F4F4", type: ShadingType.CLEAR },
      indent: { left: 360 },
      spacing: { after: 0, line: 276 },
      children: [new TextRun({ text: line, font: "Consolas", size: 18 })],
    })
  );
}
function spacer() { return new Paragraph({ spacing: { after: 120 }, children: [] }); }
function hr() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } },
    children: [],
  });
}
function link(text, url) {
  return new ExternalHyperlink({
    children: [new TextRun({ text, style: "Hyperlink", font: "Arial", size: 22 })],
    link: url,
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "2E4057" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E4057" },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "3B6B8A" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.DECIMAL, text: "%2.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "2E4057", space: 4 } },
            children: [new TextRun({ text: "eBay Authorisation Process", font: "Arial", size: 18, color: "999999", italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
            children: [
              new TextRun({ text: "Haynes Amazon & eBay Integrations  |  Page ", font: "Arial", size: 16, color: "999999" }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" }),
            ],
          })],
        }),
      },
      children: [
        // Title page
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "eBay Authorisation Process", font: "Arial", size: 52, bold: true, color: "2E4057" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "Full Documentation for Haynes Integration", font: "Arial", size: 28, color: "5A7A8A" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "Date: 15 May 2026", font: "Arial", size: 22, color: "777777" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "Project: Haynes Amazon & eBay Integrations", font: "Arial", size: 22, color: "777777" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Source: eBay Developer Program Documentation", font: "Arial", size: 20, color: "999999", italics: true })],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // Overview
        h1("Overview"),
        para("eBay uses the OAuth 2.0 protocol for API authorisation. There are two grant flows, each producing a different token type:"),
        spacer(),
        makeTable(
          ["Flow", "Token Type", "Use Case"],
          [
            ["Client Credentials Grant", "Application access token", "Non-user-specific data (metadata, taxonomy)"],
            ["Authorization Code Grant", "User access token", "User-specific data (orders, inventory, selling)"],
          ],
          [3000, 3000, 3026]
        ),
        spacer(),
        para("All tokens are minted via the Identity API endpoint:"),
        bullet("Production: `POST https://api.ebay.com/identity/v1/oauth2/token`"),
        bullet("Sandbox: `POST https://api.sandbox.ebay.com/identity/v1/oauth2/token`"),

        hr(),

        // Prerequisites
        h1("Prerequisites"),

        h2("1. Application Keys"),
        bullet("Register with the eBay Developer Program"),
        bullet("Generate application keys (App ID / Client ID, Dev ID, Cert ID / Client Secret) for Sandbox and Production"),
        bullet("Each keyset is assigned a set of OAuth scopes controlling which API methods the app can call"),

        h2("2. RuName (Redirect URL Name)"),
        bullet("Required for User access tokens (not needed for Application tokens)"),
        bullet("A custom redirect identifier eBay generates for your app — used in place of a standard redirect_uri"),
        bullet("Separate RuName values for Sandbox and Production"),
        bullet("Configure via Developer Portal > Application Keys > User Tokens"),
        spacer(),
        bold("RuName configuration fields (for User tokens):"),
        spacer(),
        makeTable(
          ["Field", "Purpose"],
          [
            ["Display Title", "Shown at top of the Grant Application Access page"],
            ["Privacy Policy URL", "Link to your privacy policy"],
            ["Auth Accepted URL", "Redirect destination when user grants consent"],
            ["Auth Declined URL", "Redirect destination when user declines consent"],
          ],
          [3500, 5526]
        ),

        h2("3. Base64-Encoded Credentials"),
        bullet("Combine: `<client_id>:<client_secret>`"),
        bullet("Base64 encode the combined string"),
        bullet("Use in the Authorization header as: `Basic <B64-encoded-credentials>`"),

        hr(),

        // Flow 1
        h1("Flow 1: Client Credentials Grant (Application Token)"),
        para("For accessing non-user-specific resources (e.g., Browse API, Taxonomy API)."),

        h2("Request"),
        ...code([
          "POST https://api.ebay.com/identity/v1/oauth2/token",
          "",
          "Headers:",
          "  Content-Type: application/x-www-form-urlencoded",
          "  Authorization: Basic <B64-encoded-oauth-credentials>",
          "",
          "Body:",
          "  grant_type=client_credentials",
          "  &scope=<URL-encoded space-separated scope list>",
        ]),

        h2("Response"),
        ...code([
          "{",
          '  "access_token": "v^1.1#i^1#...",',
          '  "expires_in": 7200,',
          '  "token_type": "Application Access Token"',
          "}",
        ]),

        h2("Key Details"),
        bullet("Token lifetime: 2 hours (7200 seconds)"),
        bullet("No user consent required — the app has inherent authorisation"),
        bullet("Rate limit: 1,000 requests/day"),
        bullet("When token expires, mint a new one (no refresh token)"),

        hr(),

        // Flow 2
        h1("Flow 2: Authorization Code Grant (User Token)"),
        para("For accessing user-specific resources (orders, inventory, selling, etc.). This is a two-step process: get user consent, then exchange the authorisation code for a token."),

        h2("Step 1: Get User Consent"),
        para("Redirect the user to eBay’s Grant Application Access page:"),
        ...code([
          "GET https://auth.ebay.com/oauth2/authorize?",
          "  client_id=<app-client-id>",
          "  &redirect_uri=<RuName-value>",
          "  &response_type=code",
          "  &scope=<URL-encoded space-separated scope list>",
          "  &state=<optional-CSRF-value>",
          "  &locale=<optional-locale>",
          "  &prompt=login              // optional, forces re-login",
        ]),
        spacer(),
        para("Sandbox endpoint: `https://auth.sandbox.ebay.com/oauth2/authorize`"),
        spacer(),
        bold("Query parameters:"),
        spacer(),
        makeTable(
          ["Parameter", "Required", "Description"],
          [
            ["client_id", "Yes", "Your App ID / Client ID"],
            ["redirect_uri", "Yes", "Your RuName value"],
            ["response_type", "Yes", "Must be \"code\""],
            ["scope", "Yes", "URL-encoded space-separated scope list"],
            ["state", "No", "CSRF protection value (recommended)"],
            ["locale", "No", "Localise consent page (e.g., en-GB)"],
            ["prompt", "No", "Set to \"login\" to force re-authentication"],
          ],
          [2000, 1200, 5826]
        ),
        spacer(),
        bold("What happens:"),
        numbered("User sees the Grant Application Access page listing the permissions your scopes require"),
        numbered("User clicks Agree and Continue (or Not now to decline)"),
        numbered("On consent, eBay redirects to your Auth Accepted URL with an authorisation code:"),
        spacer(),
        ...code([
          "https://your-accept-url.com?",
          "  code=v%5E1.1%23...NjA%3D",
          "  &expires_in=299",
          "  &state=<your-state-value>",
        ]),
        spacer(),
        bullet("The `code` is single-use and expires in ~5 minutes (299 seconds)"),
        bullet("The `state` value is echoed back for CSRF verification"),

        h2("Step 2: Exchange Authorisation Code for User Token"),
        ...code([
          "POST https://api.ebay.com/identity/v1/oauth2/token",
          "",
          "Headers:",
          "  Content-Type: application/x-www-form-urlencoded",
          "  Authorization: Basic <B64-encoded-oauth-credentials>",
          "",
          "Body:",
          "  grant_type=authorization_code",
          "  &code=<URL-encoded-authorization-code>",
          "  &redirect_uri=<RuName-value>",
        ]),
        spacer(),
        para("Note: The authorisation code returned by eBay is already URL-encoded. If your HTTP library auto-encodes, decode it first to avoid double-encoding.", { italics: true }),

        h2("Response"),
        ...code([
          "{",
          '  "access_token": "v^1.1#i^1#p^3#r^1...XzMjRV4xMjg0",',
          '  "expires_in": 7200,',
          '  "refresh_token": "v^1.1#i^1#p^3#r^1...zYjRV4xMjg0",',
          '  "refresh_token_expires_in": 47304000,',
          '  "token_type": "User Access Token"',
          "}",
        ]),

        h2("Key Details"),
        bullet("Access token lifetime: 2 hours (7200 seconds)"),
        bullet("Refresh token lifetime: ~18 months (47,304,000 seconds)"),
        bullet("Rate limit: 10,000 requests/day for authorization_code grant"),

        hr(),

        // Refresh
        h1("Refreshing a User Access Token"),
        para("When a User access token expires, use the refresh token to mint a new one without requiring user consent again."),

        h2("Request"),
        ...code([
          "POST https://api.ebay.com/identity/v1/oauth2/token",
          "",
          "Headers:",
          "  Content-Type: application/x-www-form-urlencoded",
          "  Authorization: Basic <B64-encoded-oauth-credentials>",
          "",
          "Body:",
          "  grant_type=refresh_token",
          "  &refresh_token=<refresh-token-value>",
          "  &scope=<URL-encoded scope list>   // optional",
        ]),
        spacer(),
        bullet("If `scope` is omitted, defaults to the scopes from the original consent request"),
        bullet("If `scope` is provided, it must be equal to or a subset of the original consent scopes"),

        h2("Response"),
        ...code([
          "{",
          '  "access_token": "v^1.1#i...AjRV4yNjA=",',
          '  "expires_in": 7200,',
          '  "token_type": "User Access Token"',
          "}",
        ]),

        h2("Key Details"),
        bullet("Rate limit: 50,000 requests/day for refresh_token grant"),
        bullet("Best practice: refresh after expiry (on \"Invalid access token\" error) rather than tracking lifetimes"),
        bullet("If the refresh token itself expires or is revoked, you must redo the full consent flow"),

        hr(),

        // Revocation
        h1("Token Revocation & Expiry"),
        para("Refresh tokens can be revoked when:"),
        bullet("The eBay user changes their username or password"),
        bullet("The user manually revokes app access via My eBay > Third-party app access"),
        bullet("eBay detects suspicious activity"),
        spacer(),
        para("When revoked, you must restart the consent flow from Step 1."),

        hr(),

        // Rate limits
        h1("Rate Limits Summary"),
        spacer(),
        makeTable(
          ["Grant Type", "Token Type", "Daily Limit"],
          [
            ["`client_credentials`", "Application access token", "1,000/day"],
            ["`authorization_code`", "User access token", "10,000/day"],
            ["`refresh_token`", "User access token (renewed)", "50,000/day"],
          ],
          [3200, 3200, 2626]
        ),

        hr(),

        // Scopes
        h1("OAuth Scopes"),
        bullet("Scopes are assigned to your application keyset in the Developer Portal"),
        bullet("Each API method documents which scopes it requires"),
        bullet("Tokens must be minted with all scopes needed for the methods you intend to call"),
        bullet("More scopes = more permissions the user must consent to — use only what you need"),
        bullet("Sandbox and Production may have different scope sets"),
        bullet("Adding new scopes to an existing token requires a fresh consent from each user"),

        hr(),

        // Best practices
        h1("Best Practices"),
        numbered("Store tokens securely — treat access tokens, refresh tokens, and client secrets as confidential"),
        numbered("Re-use tokens until expiry — don’t mint new tokens on every request"),
        numbered("Request all needed scopes upfront — adding scopes later requires new consent from every user"),
        numbered("Handle revocations gracefully — refresh tokens can be unexpectedly revoked"),
        numbered("Match environment — Sandbox tokens only work with Sandbox APIs, Production with Production"),
        numbered("URL-encode scopes — scope values must be URL-encoded and space-separated in requests"),

        hr(),

        // Traditional APIs
        h1("Using OAuth with Traditional APIs"),
        para("For the Trading API, Post Order API, and Business Policy Management API:"),

        h3("Trading API"),
        bullet("Remove `<RequesterCredentials>` from the request payload"),
        bullet("Add HTTP header: `X-EBAY-API-IAF-TOKEN: <UserAccessToken>`"),

        h3("Post Order API"),
        bullet("Set Authorization header: `IAF <UserAccessToken>`"),

        h3("Business Policy Management API"),
        bullet("Remove header `X-EBAY-SOA-SECURITY-TOKEN`"),
        bullet("Add header: `X-EBAY-SOA-SECURITY-IAFTOKEN: <UserAccessToken>`"),

        hr(),

        // Client libraries
        h1("eBay OAuth Client Libraries"),
        para("eBay provides official client libraries for token minting:"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [link("C#", "https://github.com/eBay/ebay-oauth-csharp-client")] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [link("Java", "https://github.com/eBay/ebay-oauth-java-client")] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [link("Node.js", "https://github.com/eBay/ebay-oauth-nodejs-client")] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [link("Python", "https://github.com/eBay/ebay-oauth-python-client")] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [link("Android", "https://github.com/eBay/ebay-oauth-android-client")] }),
      ],
    },
  ],
});

const outPath = process.argv[2];
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Created: " + outPath);
});
