---
name: graphql-patterns
description: GraphQL Wire Adapter patterns for LWC — queries, mutations, refresh, error handling, and the Apex-vs-GraphQL decision (including the metadata-access permission gotcha)
scope: LWC_ONLY
---

# GraphQL Patterns for LWC

**SCOPE: LWC_ONLY** — This skill applies to Lightning Web Components that talk to the Salesforce UI API via GraphQL (`lightning/uiGraphQLApi` and `lightning/graphql`). For pure Apex data access, use `apex-patterns`. For component-level state/comm patterns, use `lwc-patterns`. For integration with external GraphQL servers, use `integration-patterns`.

---

## Decision: GraphQL vs Apex vs uiRecordApi

When the agent suggests a data-access approach, lead with this table and let the use case pick the answer. Default to **GraphQL** for read-mostly UI work over standard sObjects; reach for **Apex** when business logic, cross-system access, or elevated-permission reads are needed.

| Need | Recommend | Why |
|---|---|---|
| Read records the user already has access to (standard or custom sObjects) | **GraphQL** | Cached in LDS, FLS auto-enforced, one round trip for nested data, client picks fields |
| Read a parent + multiple child related lists in one call | **GraphQL** | Single round trip via `Contacts { edges { node { ... } } }` — beats 3 SOQL or 3 wires |
| Simple Create / Update / Delete on a single record | **`lightning/graphql` `executeMutation`** *or* **`lightning/uiRecordApi`** | Both participate in LDS cache. Pick GraphQL if reads are GraphQL (one module, one mental model). Pick uiRecordApi for the simplest possible API surface. |
| Bulk DML, batch operations, complex validation/transformation | **Apex `@AuraEnabled`** | GraphQL mutations are single-record; bulk needs Apex (or async patterns) |
| Aggregations, GROUP BY, semi-joins, anti-joins, formula fields not exposed in UI API | **Apex (SOQL)** | GraphQL `where` filter is a tiny subset of SOQL |
| Reading metadata (Custom Metadata Types, Custom Settings) for users without that permission | **Apex** | See **Permission model** section below — this is the most common Apex retention reason |
| Callouts to external systems | **Apex** | UI API has no callout primitives |
| Async (Queueable, Future, Batch, Scheduled) | **Apex** | Same |
| File / Attachment / ContentVersion manipulation beyond simple reads | **Apex** | UI API support is partial |
| Server-side rules that must not be bypassable from the client | **Apex** | A GraphQL/UI API call runs in the user's session — anything the user can do, they can do directly from any GraphQL client |

**Default flow for the agent**: ask which sObjects, ask whether nested data is needed, ask whether elevated permissions are required. If all data is user-accessible and the operation is read or single-record DML → GraphQL. Else → Apex.

---

## Permission model — the metadata gotcha (READ THIS)

This is the single most surprising difference between Apex and GraphQL/UI API.

**Apex bridges permissions.** An `@AuraEnabled` method declared `with sharing` still runs with the calling user's sharing, **but** the Apex code itself can read Custom Metadata Types, Custom Settings (Hierarchy), Apex-only describe data, and anything else accessible to Apex — *without* the running user needing direct metadata permissions. Apex is the bridge.

**GraphQL does not bridge permissions.** The GraphQL Wire Adapter runs the user's session against UI API. There is no Apex layer in between. If you query a Custom Metadata Type, a Custom Setting, or any object the running user can't see, **the query returns no rows or errors out**.

### Practical consequence

If you migrate an Apex method like:

```apex
@AuraEnabled(cacheable=true)
public static List<MyConfig__mdt> getConfigs() {
    return [SELECT Id, Label, Threshold__c FROM MyConfig__mdt];
}
```

…to a GraphQL query, **every end user that runs the component must be assigned a permission set granting Read on `MyConfig__mdt`**. Otherwise the GraphQL query returns empty data, silently — no exception, no toast, just an empty list and a confused user.

### What to assign

Create (or reuse) a permission set with:
- **Custom Metadata Type Access** — Read on each `*__mdt` the GraphQL query touches
- **Custom Settings** — Read on each setting object (if reading via UI API)
- **Object Permissions** — Read on each standard/custom object the query traverses
- **Field-Level Security** — Read on each field selected (UI API drops fields silently if FLS denies them — same silent-failure mode)

Assign this permset to **every profile/user group** that uses the GraphQL-backed component.

### Rule of thumb

> If your component reads anything outside `Account`, `Contact`, `Opportunity`, `Case`, or other commonly-permissioned objects — **audit FLS and CRUD for every running profile before shipping a GraphQL migration**. Apex hides this; GraphQL exposes it.

---

## Module choice

| Module | Use for | Status |
|---|---|---|
| `lightning/uiGraphQLApi` | Queries only (legacy) | Still works; queries-only |
| `lightning/graphql` | Queries **and** mutations | Canonical going forward — use for new components |

```javascript
// New components — single import surface
import { gql, graphql, executeMutation } from 'lightning/graphql';

// Legacy / queries-only — still supported
import { gql, graphql, refreshGraphQL } from 'lightning/uiGraphQLApi';
```

---

## Query basics

```javascript
import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/graphql';

export default class AccountList extends LightningElement {
    accounts = [];
    refreshGraphQL;

    @wire(graphql, {
        query: gql`
            query AccountList {
                uiapi {
                    query {
                        Account(
                            first: 10
                            orderBy: { Name: { order: ASC } }
                        ) {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                    Industry { value }
                                    AnnualRevenue { value displayValue }
                                }
                            }
                        }
                    }
                }
            }
        `
    })
    handleResult(result) {
        const { data, errors, refresh } = result;
        if (refresh) this.refreshGraphQL = refresh; // capture once for later use
        if (data) {
            this.accounts = data.uiapi.query.Account.edges.map((e) => ({
                Id: e.node.Id,
                Name: e.node.Name.value,
                Industry: e.node.Industry?.value,
                Revenue: e.node.AnnualRevenue?.displayValue // formatted currency
            }));
        }
    }
}
```

**Key shape rules:**
- Every field is an object: `Name { value }` or `Name { value displayValue }`
- `value` = raw; `displayValue` = locale-formatted (currency, date, picklist label)
- `edges/node` = Relay connection wrapper — supports pagination via `pageInfo`
- `first: N` caps at 100 per connection

---

## Variables (reactive parameters)

```javascript
@api recordId;

get variables() {
    return { accountId: this.recordId };
}

@wire(graphql, {
    query: gql`
        query AccountDetail($accountId: ID!) {
            uiapi {
                query {
                    Account(where: { Id: { eq: $accountId } }) {
                        edges { node { Id Name { value } } }
                    }
                }
            }
        }
    `,
    variables: '$variables'
})
handleResult(result) { /* ... */ }
```

**Reactivity**: when `recordId` changes (e.g., navigating between record pages), the getter re-runs, the wire re-fires, and LDS cache is consulted before any network call.

---

## Nested relationships (the killer feature)

One query fetches an Account + its Contacts + its Opportunities.

```graphql
query AccountWithChildren($accountId: ID!) {
    uiapi {
        query {
            Account(where: { Id: { eq: $accountId } }) {
                edges {
                    node {
                        Id
                        Name { value }
                        Contacts(first: 50, orderBy: { LastName: { order: ASC } }) {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                    Email { value }
                                }
                            }
                            totalCount
                        }
                        Opportunities(first: 50, orderBy: { CloseDate: { order: DESC } }) {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                    StageName { value }
                                    Amount { value displayValue }
                                    CloseDate { value displayValue }
                                }
                            }
                            totalCount
                        }
                    }
                }
            }
        }
    }
}
```

**Relationship name = the child collection name** (`Contacts`, `Opportunities` for standard; `Custom_Children__r` for custom).

Pagination cap: 100 per connection. For larger sets use `pageInfo { endCursor hasNextPage }` and `after: "<cursor>"`.

---

## Mutations (Create / Update / Delete)

`executeMutation` is **imperative** — not wired. It returns a Promise resolving to `{ data, errors }`.

### Create

```javascript
import { gql, executeMutation } from 'lightning/graphql';

const mutation = gql`
    mutation CreateAccount {
        uiapi {
            AccountCreate(input: { Account: { Name: ${gqlString(name)} } }) {
                Record {
                    Id
                    Name { value }
                }
            }
        }
    }
`;
const result = await executeMutation({ query: mutation });
if (result.errors?.length) throw new Error(result.errors.map(e => e.message).join(', '));
const newId = result.data.uiapi.AccountCreate.Record.Id;
```

### Update

```javascript
const mutation = gql`
    mutation UpdateAccount {
        uiapi {
            AccountUpdate(input: {
                Id: ${gqlString(id)},
                Account: { Name: ${gqlString(newName)} }
            }) {
                Record { Id Name { value } }
            }
        }
    }
`;
```

### Delete

```javascript
const mutation = gql`
    mutation DeleteAccount {
        uiapi {
            AccountDelete(input: { Id: ${gqlString(id)} }) {
                Id
            }
        }
    }
`;
```

### Input shape conventions

| Op | Input shape |
|---|---|
| `<Obj>Create` | `{ <Obj>: { Field1, Field2, ... } }` |
| `<Obj>Update` | `{ Id, <Obj>: { Field1, ... } }` |
| `<Obj>Delete` | `{ Id }` |

Custom objects use `<ApiName>Create` etc. — e.g., `Diving_Trip__cCreate` (yes, the `__c` stays in the operation name).

### Cache behavior after mutation

| Operation | Refresh needed? |
|---|---|
| **Create** | Yes — `await this.refreshGraphQL?.()`. New records won't appear until cache is invalidated. |
| **Update** | Sometimes auto-propagates via LDS field overlap. Call `refreshGraphQL` defensively unless you benchmark otherwise. |
| **Delete** | No — deleted records are auto-pruned from every LDS-aware wire. |

---

## Refresh patterns

### Modern (lightning/graphql)
The `refresh` function is on the wire result.

```javascript
handleResult(result) {
    const { data, errors, refresh } = result;
    if (refresh) this.refreshGraphQL = refresh; // capture once
    // ...
}

async someAction() {
    await mutate(...);
    await this.refreshGraphQL?.();
}
```

### Legacy (lightning/uiGraphQLApi)
Import a function, store the whole wire result.

```javascript
import { refreshGraphQL } from 'lightning/uiGraphQLApi';

handleResult(result) {
    this.wiredResult = result;
    // ...
}

async someAction() {
    await mutate(...);
    await refreshGraphQL(this.wiredResult);
}
```

---

## Error handling

UI API returns errors in two shapes depending on entry point. Normalize once:

```javascript
readError(e) {
    const body = e?.body;
    if (Array.isArray(body)) {
        return body.map(b => b.message).join(', ');
    }
    if (body?.output?.errors?.length) {
        return body.output.errors.map(x => x.message).join(', ');
    }
    if (body?.output?.fieldErrors) {
        const f = body.output.fieldErrors;
        return Object.keys(f)
            .flatMap(k => f[k].map(x => `${k}: ${x.message}`))
            .join(', ');
    }
    return body?.message || e?.message || 'Unknown error';
}
```

For mutation results, also check the result body:

```javascript
if (result?.errors?.length) {
    throw new Error(result.errors.map(e => e.message).join(', '));
}
```

The generic *"An error occurred while trying to update the record. Please try again"* almost always means the body parser missed the actual error shape — fix the parser, don't guess at the underlying issue.

---

## Security: GraphQL string escaping

The official LWC Recipes use raw template interpolation (`"${name}"`) — this **breaks or GraphQL-injects** on any input containing a quote or backslash. Always escape:

```javascript
gqlString(raw) {
    return JSON.stringify(raw ?? ''); // produces a fully-quoted, fully-escaped GraphQL string literal
}
```

Used as: `Name: ${gqlString(userInput)}` → expands to `Name: "O'Brien \"Co\""`.

Alternatively, use GraphQL **variables** (`$name: String!` declared in the operation, passed via the `variables` property of `executeMutation`). Variables are the production-clean path, but the input type names (`AccountCreateInput`, etc.) aren't always documented — introspect the schema first via the org's GraphiQL endpoint when in doubt.

---

## Composition pattern (multiple components sharing LDS)

Two LWCs each with their own GraphQL `@wire` on the same data share the LDS cache automatically — no parent→child plumbing required.

```html
<!-- parent.html -->
<c-account-list></c-account-list>
<c-account-editor></c-account-editor>
```

When `c-account-editor` mutates (via either `executeMutation` or `uiRecordApi`), LDS invalidates the cache and `c-account-list`'s wire re-fires on its own. Cross-component reactivity is free.

---

## Working reference

See `divingsorg` for live, deployed examples (matching this skill's patterns):

- `force-app/main/default/lwc/graphqlBasicDemo/` — Query + `uiRecordApi` mutations, embeds the GraphQL-mutation child
- `force-app/main/default/lwc/graphqlMutationsDemo/` — `executeMutation` Create / Update / Delete
- `force-app/main/default/lwc/graphqlAccountWithChildren/` — Nested parent + children in one query, reactive `$recordId` variable

---

## Common pitfalls

1. **Pagination cap silently truncates at `first: 100`** — for larger sets, use cursor pagination, not a higher `first:` value.
2. **`displayValue` is undefined for plain text fields** — only currency / date / percent / picklist labels populate it. Use `value` for text.
3. **GraphQL FLS is silent**: if the user lacks FLS on a selected field, it's dropped from the response (no error). Audit FLS for every running profile.
4. **GraphQL is NOT in `@AuraEnabled(cacheable=true)`** — it has its own cache scoped to LDS. Don't reason about it via Apex cache semantics.
5. **Mutations are single-record** — for bulk DML keep Apex. Don't loop `executeMutation` to fake bulk; you'll hit governor / network limits.
6. **The `!` operator is banned in LWC template expressions** (LWC1060). Use a JS getter (`get isNotReady()`).
7. **Custom relationship names use `__r`** — `Custom_Children__r`, with the trailing `__r` preserved in the GraphQL field name.
