---
name: hosted-mcp-servers
description: Salesforce Hosted MCP Server setup, configuration, URL patterns, ECA management, security model, and troubleshooting
scope: HOSTED_MCP
---

# Salesforce Hosted MCP Servers

**SCOPE: HOSTED_MCP** - This skill applies to setting up and configuring Salesforce Hosted MCP Servers.
**Use when:** Enabling MCP servers in an org, creating External Client Apps, connecting AI clients (Claude, Cursor, ChatGPT), or troubleshooting MCP connectivity.

---

Salesforce Hosted MCP Servers are fully managed, cloud-hosted MCP (Model Context Protocol) servers that let AI clients access Salesforce data and logic without local CLI tooling. They are **different** from the `@salesforce/mcp` CLI-based MCP server used for local development.

---

## Available Standard Servers

| Server | API Name | Capabilities | Use When |
|--------|----------|-------------|----------|
| **SObject Reads** | `platform/sobject-reads` | Read-only SObject access | Safe evaluation, sandbox exploration |
| **SObject All** | `platform/sobject-all` | Full CRUD + prompt templates | Production AI workflows, Account Review Briefings |
| **Tableau Next** | `tableau-next` | Tableau Next analytics | AI-driven data visualization and analytics |
| **Data Cloud SQL** | `data-cloud-sql` | Data Cloud SQL queries | Querying unified customer data |
| **Custom** | User-defined | Apex actions, Flows, Named Queries | Domain-specific AI tools |

### Choosing a Server

- **Start with `platform/sobject-reads`** for evaluation — no data modification risk
- **Upgrade to `platform/sobject-all`** for production use — includes prompt templates
- **Build custom servers** when you need domain-specific tools (see `mcp-tool-builder` skill)

---

## URL Patterns

The MCP protocol encodes everything in the URL path (no query parameters or headers during discovery).

### Standard Patterns

| Org Type | URL Pattern |
|----------|------------|
| **Production** | `https://api.salesforce.com/platform/mcp/v1/{servername}` |
| **Sandbox** | `https://api.salesforce.com/platform/mcp/v1/sandbox/{servername}` |
| **Scratch Org** | `https://api.salesforce.com/platform/mcp/v1/sandbox/{servername}` |
| **Developer Edition** | `https://api.salesforce.com/platform/mcp/v1/{servername}` |

### My Domain Patterns (Recommended)

Required for orgs that disabled login from standard endpoints.

| Org Type | URL Pattern |
|----------|------------|
| **Production** | `https://api.salesforce.com/platform/mcp/v1/d/{mydomainname}/{servername}` |
| **Sandbox** | `https://api.salesforce.com/platform/mcp/v1/d/{mydomainname}--{sandboxname}/sandbox/{servername}` |
| **Scratch Org** | `https://api.salesforce.com/platform/mcp/v1/d/{mydomainname}/scratch/{servername}` |
| **Developer Edition** | `https://api.salesforce.com/platform/mcp/v1/d/{mydomainname}/develop/{servername}` |

### Examples

```
# Production org, sobject-all
https://api.salesforce.com/platform/mcp/v1/platform/sobject-all

# Sandbox named "uat", My Domain "acme"
https://api.salesforce.com/platform/mcp/v1/d/acme--uat/sandbox/platform/sobject-all

# Developer Edition, My Domain "dev-sandbox"
https://api.salesforce.com/platform/mcp/v1/d/dev-sandbox/develop/platform/sobject-reads
```

---

## Setup Checklist

### Step 1: Verify Eligibility

- [ ] Org edition: Enterprise, Unlimited, Performance, or Developer Edition
- [ ] Admin access to Setup
- [ ] `MCPService` permission enabled (auto-enabled for eligible orgs; contact Support if missing)

### Step 2: Enable MCP Server

1. Navigate to **Setup > API Catalog > MCP Servers**
2. Toggle on the desired server (e.g., `platform/sobject-reads`)
3. Wait up to **2 minutes** for activation to propagate

> **Note:** At GA, all MCP servers are **disabled by default**. Each must be individually enabled.

### Step 3: Create External Client App (ECA)

1. Navigate to **Setup > External Client App Manager**
2. Create a new External Client App
3. Enable OAuth and configure:
   - **Callback URL**: See Client Configuration section below
   - **OAuth Scopes**: `mcp_api` + `refresh_token`
4. Security settings:
   - **Enable** "Require Proof Key for Code Exchange (PKCE)"
   - **Enable** "Issue JWT-based access tokens for named users"
   - **Disable** all Flow Enablement checkboxes
5. Save and note the **Consumer Key** (Client ID)

> **Important:** ECAs may take **up to 30 minutes** to propagate worldwide. Try after 1-2 minutes first.

### Step 4: Connect Client

Every MCP client needs three values:
1. **MCP Server URL** — from URL Patterns above
2. **OAuth Client ID** — Consumer Key from the ECA
3. **OAuth Client Secret** — from the ECA (if required)

### Step 5: Test Connectivity

Call `getUserInfo` with no parameters. A successful response confirms authentication and connection.

---

## External Client App Configuration

### OAuth Scopes

| Scope | Purpose | Required |
|-------|---------|----------|
| `mcp_api` | Access Salesforce hosted MCP servers | Yes |
| `refresh_token` | Maintain persistent sessions | Yes |

> **Beta scopes are retired.** Do not use `api`, `sfap_api`, or `einstein_gpt_api` — these were beta-only.

### Callback URLs by Client

| Client | Callback URL |
|--------|-------------|
| **Claude** | `https://claude.ai/api/mcp/auth_callback` |
| **Cursor** | `cursor://anysphere.cursor-mcp/oauth/callback` |
| **Postman (Desktop)** | `https://oauth.pstmn.io/v1/callback` |
| **Postman (Web)** | `https://oauth.pstmn.io/v1/browser-callback` |
| **ChatGPT** | Check Advanced settings in ChatGPT connectors |

### One ECA Per Client

Create separate ECAs for each MCP client to enable:
- Per-client usage auditing
- Individual user access policies
- Granular revocation control

### Production Hardening

| Setting | Purpose | When |
|---------|---------|------|
| Require Client Secret | Prevent unauthorized token requests | Web server apps |
| Permission Set Restriction | Limit to specific user groups | Production orgs |
| IP Restrictions | Restrict to known IP ranges | Fixed-IP clients |
| Token Rotation | Rotate refresh tokens on use | All production |
| Refresh Token Expiry | Expire tokens after 30 days | All production |
| Single Logout | End MCP when SF session ends | Shared workstations |

---

## Security Model

Hosted MCP Servers inherit Salesforce's existing permission model automatically:

### Automatic Enforcement

- **CRUD**: Object-level access enforced per authenticated user
- **FLS**: Field-level security respected — users only see fields they can access
- **Sharing Rules**: Record-level access follows OWD, sharing rules, and manual shares
- **Audit Trail**: All operations logged with user attribution

### Scope Isolation

The `mcp_api` OAuth scope is **separate** from REST API access:
- A user with `mcp_api` scope **cannot** access REST APIs through the MCP connection
- This prevents MCP clients from being used as general-purpose API bridges
- Full REST API access requires the `api` scope on a different Connected App/ECA

### Named User Context

- Every MCP operation executes as the **authenticated human user**
- No service accounts or system context — "human at the wheel" principle
- Audit trails show exactly which user performed each action
- Operations inherit the user's profile, permission sets, and sharing

---

## Client Configuration

### Claude (Desktop & Web)

1. Open Claude > Settings > MCP Connections
2. Add new connection:
   - **URL**: MCP Server URL (see URL Patterns)
   - **Client ID**: Consumer Key from ECA
3. Authenticate via browser OAuth flow

### Cursor

1. Open Cursor > Settings > MCP
2. Add new server:
   - **URL**: MCP Server URL
   - **Client ID**: Consumer Key from ECA
3. Authenticate via OAuth callback

### Postman (Testing — Recommended First)

Postman returns raw JSON without LLM interpretation — ideal for validating configuration.

1. Create new MCP request
2. Set URL to MCP Server URL
3. Configure OAuth 2.0:
   - Grant Type: Authorization Code with PKCE
   - Auth URL: `https://login.salesforce.com/services/oauth2/authorize` (or `test.salesforce.com` for sandbox)
   - Token URL: `https://login.salesforce.com/services/oauth2/token`
   - Client ID: Consumer Key
   - Scope: `mcp_api refresh_token`
4. Get New Access Token > Authenticate
5. Call `getUserInfo` to verify

> **Tip:** Always test with Postman first before connecting AI clients.

---

## Troubleshooting

### Common Issues

| Symptom | Cause | Resolution |
|---------|-------|------------|
| **404** on MCP URL | Server not activated | Enable in Setup > API Catalog > MCP Servers; wait 2 minutes |
| **401** Unauthorized | Wrong OAuth scopes | Verify ECA has `mcp_api` + `refresh_token` scopes |
| **401** persistent | ECA not propagated | Wait up to 30 minutes after ECA creation/modification |
| Wrong data returned | Environment mismatch | Don't mix Production and Sandbox URLs |
| Connection refused | Edition requirement | Verify Enterprise+ or Developer Edition |
| **403** Forbidden | Insufficient permissions | Check user's profile, permission sets, and sharing rules |

### Known Limitations

| Limitation | Detail |
|------------|--------|
| **Edition requirement** | Enterprise Edition or above (Developer Edition also qualifies) |
| **ECA propagation** | Up to 30 minutes after creation or modification |
| **Server activation** | Up to 2 minutes after toggling on/off |
| **Experience Cloud URLs** | Not supported (e.g., `partners.acme.com` custom domains) |
| **API quota** | MCP tool calls consume against daily API quota |
| **`mcp-remote` npm** | **Not supported** — only native OAuth/HTTP MCP clients work |
| **Scratch Org ECAs** | Cannot create via Setup UI — must package from DevHub |
| **Connected Apps** | **Not supported** for MCP — must use External Client Apps |

### Scratch Org Workaround

ECAs cannot be created directly in scratch orgs:
1. Create the ECA in a developer hub org
2. Add it to an unlocked or managed package
3. Install the package in the target scratch org

---

## Hosted MCP vs Salesforce DX MCP

| Aspect | Hosted MCP Servers | Salesforce DX MCP (`@salesforce/mcp`) |
|--------|-------------------|--------------------------------------|
| **Hosting** | Cloud-managed by Salesforce | Local CLI on developer machine |
| **Audience** | End users, AI agents, production workflows | Developers during local development |
| **Transport** | Streamable HTTP via `api.salesforce.com` | STDIO via `npx` CLI |
| **Auth** | OAuth 2.0 + PKCE via External Client Apps | SF CLI authentication (`sf org login`) |
| **Tools** | SObject CRUD, prompt templates, custom actions | 60+ dev tools: deploy, retrieve, test, analyze |
| **Use Case** | AI clients querying CRM data in production | Claude Code building/deploying Salesforce code |
| **Configuration** | Per-org in Setup > API Catalog | Per-project in `.mcp.json` |
| **API Quota** | Consumes daily API quota | Uses SF CLI quota |

### When to Use Each

- **Hosted MCP**: When AI clients need to **access Salesforce data** (query accounts, update records, run reports)
- **DX MCP**: When developers need to **build Salesforce code** (deploy metadata, run tests, analyze code quality)
- **Both**: An AI assistant that both builds code (DX MCP) and queries org data (Hosted MCP) uses both
