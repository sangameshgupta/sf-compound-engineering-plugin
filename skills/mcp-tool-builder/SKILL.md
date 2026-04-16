---
name: mcp-tool-builder
description: Building custom MCP server tools — Apex InvocableMethod actions, Flow tools, Named Query APIs, prompt templates, and testing patterns
scope: HOSTED_MCP
---

# <span data-proof="authored" data-by="ai:claude">MCP Tool Builder</span>

**<span data-proof="authored" data-by="ai:claude">SCOPE: HOSTED_MCP</span>** <span data-proof="authored" data-by="ai:claude">- This skill applies to building custom tools for Salesforce Hosted MCP Servers.
**Use when:**</span> <span data-proof="authored" data-by="ai:claude">Creating Apex</span> <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">actions, Flow-based tools, Named Query APIs, or prompt templates that will be exposed as MCP tools to AI clients.</span>

***

<span data-proof="authored" data-by="ai:claude">Custom MCP servers expose backend logic as tools that AI clients (Claude, ChatGPT, Cursor) can invoke. Three types of backend logic can become MCP tools.</span>

***

## <span data-proof="authored" data-by="ai:claude">Tool Types</span>

| <span data-proof="authored" data-by="ai:claude">Tool Type</span>                 | <span data-proof="authored" data-by="ai:claude">Backend</span>                                                                                 | <span data-proof="authored" data-by="ai:claude">Best For</span>                                        | <span data-proof="authored" data-by="ai:claude">Complexity</span> |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **<span data-proof="authored" data-by="ai:claude">Apex Invocable Action</span>** | <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">global method</span> | <span data-proof="authored" data-by="ai:claude">Complex logic, orchestration, external callouts</span> | <span data-proof="authored" data-by="ai:claude">High</span>       |
| **<span data-proof="authored" data-by="ai:claude">Flow Action</span>**           | <span data-proof="authored" data-by="ai:claude">Autolaunched Flow</span>                                                                       | <span data-proof="authored" data-by="ai:claude">Declarative logic, admin-maintainable</span>           | <span data-proof="authored" data-by="ai:claude">Medium</span>     |
| **<span data-proof="authored" data-by="ai:claude">Named Query API</span>**       | <span data-proof="authored" data-by="ai:claude">SOQL query with bind variables</span>                                                          | <span data-proof="authored" data-by="ai:claude">Read-only data retrieval</span>                        | <span data-proof="authored" data-by="ai:claude">Low</span>        |

### <span data-proof="authored" data-by="ai:claude">Decision Guide</span>

```
Is the logic read-only SOQL?
  → Yes → Named Query API
  → No → Does it need code (callouts, complex logic, multi-step)?
    → Yes → Apex Invocable Action
    → No → Flow Action
```

***

## <span data-proof="authored" data-by="ai:claude">Apex Invocable Action Tools</span>

<span data-proof="authored" data-by="ai:claude">Apex</span> <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">classes are the most powerful custom MCP tool type. The method's input/output classes define the MCP tool's parameter schema.</span>

### <span data-proof="authored" data-by="ai:claude">Requirements</span>

* <span data-proof="authored" data-by="ai:claude">Class must be</span> <span data-proof="authored" data-by="ai:claude">`global`</span> <span data-proof="authored" data-by="ai:claude">(not</span> <span data-proof="authored" data-by="ai:claude">`public`) for MCP exposure</span>

* <span data-proof="authored" data-by="ai:claude">Method must use</span> <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">annotation</span>

* <span data-proof="authored" data-by="ai:claude">Input/output variables use</span> <span data-proof="authored" data-by="ai:claude">`@InvocableVariable`</span> <span data-proof="authored" data-by="ai:claude">with</span> **<span data-proof="authored" data-by="ai:claude">descriptive descriptions</span>** <span data-proof="authored" data-by="ai:claude">— AI clients read these to understand parameters</span>

* <span data-proof="authored" data-by="ai:claude">Accept</span> <span data-proof="authored" data-by="ai:claude">`List<>`</span> <span data-proof="authored" data-by="ai:claude">input and return</span> <span data-proof="authored" data-by="ai:claude">`List<>`</span> <span data-proof="authored" data-by="ai:claude">output (bulk-safe pattern)</span>

* <span data-proof="authored" data-by="ai:claude">Use</span> <span data-proof="authored" data-by="ai:claude">`with sharing`</span> <span data-proof="authored" data-by="ai:claude">for user-context enforcement</span>

* <span data-proof="authored" data-by="ai:claude">Use</span> <span data-proof="authored" data-by="ai:claude">`WITH SECURITY_ENFORCED`</span> <span data-proof="authored" data-by="ai:claude">in all SOQL</span>

### <span data-proof="authored" data-by="ai:claude">Basic Scaffold</span>

```apex proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MzA1MiwiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
global with sharing class AccountReviewTool {

    @InvocableMethod(
        label='Review Account'
        description='Retrieves a comprehensive account summary including open opportunities, recent cases, and key contacts for AI-assisted account review'
    )
    global static List<AccountReview> reviewAccount(List<AccountReviewRequest> requests) {
        List<AccountReview> results = new List<AccountReview>();

        Set<Id> accountIds = new Set<Id>();
        for (AccountReviewRequest req : requests) {
            accountIds.add(req.accountId);
        }

        Map<Id, Account> accounts = new Map<Id, Account>([
            SELECT Id, Name, Industry, AnnualRevenue, NumberOfEmployees,
                (SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunities WHERE IsClosed = false),
                (SELECT Id, Subject, Status, Priority FROM Cases WHERE IsClosed = false ORDER BY CreatedDate DESC LIMIT 5),
                (SELECT Id, Name, Title, Email FROM Contacts ORDER BY CreatedDate DESC LIMIT 5)
            FROM Account
            WHERE Id IN :accountIds
            WITH SECURITY_ENFORCED
        ]);

        for (AccountReviewRequest req : requests) {
            Account acc = accounts.get(req.accountId);
            AccountReview review = new AccountReview();

            if (acc != null) {
                review.accountName = acc.Name;
                review.industry = acc.Industry;
                review.annualRevenue = acc.AnnualRevenue;
                review.openOpportunityCount = acc.Opportunities.size();
                review.openCaseCount = acc.Cases.size();
                review.contactCount = acc.Contacts.size();
                review.success = true;
            } else {
                review.success = false;
                review.errorMessage = 'Account not found: ' + req.accountId;
            }

            results.add(review);
        }

        return results;
    }

    global class AccountReviewRequest {
        @InvocableVariable(required=true description='The Salesforce Account record ID to review')
        global String accountId;
    }

    global class AccountReview {
        @InvocableVariable(description='Whether the review was successful')
        global Boolean success;

        @InvocableVariable(description='Account name')
        global String accountName;

        @InvocableVariable(description='Industry classification')
        global String industry;

        @InvocableVariable(description='Annual revenue in org currency')
        global Decimal annualRevenue;

        @InvocableVariable(description='Number of open (unclosed) opportunities')
        global Integer openOpportunityCount;

        @InvocableVariable(description='Number of open (unclosed) support cases')
        global Integer openCaseCount;

        @InvocableVariable(description='Total number of contacts on the account')
        global Integer contactCount;

        @InvocableVariable(description='Error message if the review failed')
        global String errorMessage;
    }
}
```

### <span data-proof="authored" data-by="ai:claude">Common Tool Patterns</span>

#### <span data-proof="authored" data-by="ai:claude">Record Retrieval Tool</span>

```apex proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MjYwMCwiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
global with sharing class ContactLookupTool {

    @InvocableMethod(
        label='Lookup Contacts'
        description='Searches for contacts by name, email, or account. Returns matching contact records with key fields.'
    )
    global static List<ContactResult> lookupContacts(List<ContactQuery> queries) {
        List<ContactResult> results = new List<ContactResult>();

        for (ContactQuery q : queries) {
            ContactResult result = new ContactResult();
            result.contacts = new List<ContactInfo>();

            String searchClause = '';
            List<Object> binds = new List<Object>();

            if (String.isNotBlank(q.searchName)) {
                String nameFilter = '%' + q.searchName + '%';
                List<Contact> contacts = [
                    SELECT Id, Name, Email, Phone, Title, Account.Name
                    FROM Contact
                    WHERE Name LIKE :nameFilter
                    WITH SECURITY_ENFORCED
                    LIMIT 20
                ];
                for (Contact c : contacts) {
                    result.contacts.add(new ContactInfo(c));
                }
            }

            result.matchCount = result.contacts.size();
            results.add(result);
        }

        return results;
    }

    global class ContactQuery {
        @InvocableVariable(required=true description='Name to search for (partial match supported)')
        global String searchName;
    }

    global class ContactResult {
        @InvocableVariable(description='Number of matching contacts found')
        global Integer matchCount;

        @InvocableVariable(description='List of matching contact records')
        global List<ContactInfo> contacts;
    }

    global class ContactInfo {
        @InvocableVariable(description='Contact record ID')
        global String contactId;

        @InvocableVariable(description='Full name')
        global String name;

        @InvocableVariable(description='Email address')
        global String email;

        @InvocableVariable(description='Phone number')
        global String phone;

        @InvocableVariable(description='Job title')
        global String title;

        @InvocableVariable(description='Parent account name')
        global String accountName;

        global ContactInfo() {}

        global ContactInfo(Contact c) {
            this.contactId = c.Id;
            this.name = c.Name;
            this.email = c.Email;
            this.phone = c.Phone;
            this.title = c.Title;
            this.accountName = c.Account?.Name;
        }
    }
}
```

#### <span data-proof="authored" data-by="ai:claude">Record Mutation Tool</span>

```apex proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MjY4NCwiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
global with sharing class CaseEscalationTool {

    @InvocableMethod(
        label='Escalate Case'
        description='Escalates a support case by updating priority, assigning to escalation queue, and adding an internal comment with the escalation reason'
    )
    global static List<EscalationResult> escalateCase(List<EscalationRequest> requests) {
        List<EscalationResult> results = new List<EscalationResult>();

        for (EscalationRequest req : requests) {
            EscalationResult result = new EscalationResult();

            try {
                Case c = [
                    SELECT Id, CaseNumber, Priority, Status, OwnerId
                    FROM Case
                    WHERE Id = :req.caseId
                    WITH SECURITY_ENFORCED
                ];

                c.Priority = 'High';
                c.Status = 'Escalated';

                SObjectAccessDecision decision = Security.stripInaccessible(
                    AccessType.UPDATABLE, new List<Case>{ c }
                );
                update decision.getRecords();

                if (String.isNotBlank(req.reason)) {
                    CaseComment comment = new CaseComment(
                        ParentId = req.caseId,
                        CommentBody = 'Escalated: ' + req.reason,
                        IsPublished = false
                    );
                    insert comment;
                }

                result.success = true;
                result.caseNumber = c.CaseNumber;
                result.newPriority = 'High';
                result.newStatus = 'Escalated';
            } catch (Exception e) {
                result.success = false;
                result.errorMessage = e.getMessage();
            }

            results.add(result);
        }

        return results;
    }

    global class EscalationRequest {
        @InvocableVariable(required=true description='Case record ID to escalate')
        global String caseId;

        @InvocableVariable(description='Reason for escalation — will be added as an internal comment')
        global String reason;
    }

    global class EscalationResult {
        @InvocableVariable(description='Whether the escalation succeeded')
        global Boolean success;

        @InvocableVariable(description='Case number of the escalated case')
        global String caseNumber;

        @InvocableVariable(description='Updated priority value')
        global String newPriority;

        @InvocableVariable(description='Updated status value')
        global String newStatus;

        @InvocableVariable(description='Error message if escalation failed')
        global String errorMessage;
    }
}
```

#### <span data-proof="authored" data-by="ai:claude">External Callout Tool</span>

```apex proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MjgxMywiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
global with sharing class CompanyEnrichmentTool {

    @InvocableMethod(
        label='Enrich Company Data'
        description='Enriches an account with external company data (employee count, funding, industry classification) via a third-party API using Named Credentials'
    )
    global static List<EnrichmentResult> enrichCompany(List<EnrichmentRequest> requests) {
        List<EnrichmentResult> results = new List<EnrichmentResult>();

        for (EnrichmentRequest req : requests) {
            EnrichmentResult result = new EnrichmentResult();

            try {
                HttpRequest httpReq = new HttpRequest();
                httpReq.setEndpoint('callout:Company_Data_API/v1/companies?domain=' + EncodingUtil.urlEncode(req.companyDomain, 'UTF-8'));
                httpReq.setMethod('GET');
                httpReq.setHeader('Accept', 'application/json');
                httpReq.setTimeout(30000);

                Http http = new Http();
                HttpResponse res = http.send(httpReq);

                if (res.getStatusCode() == 200) {
                    Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                    result.companyName = (String) data.get('name');
                    result.employeeCount = (Integer) data.get('employees');
                    result.fundingStage = (String) data.get('funding_stage');
                    result.industryClassification = (String) data.get('industry');
                    result.success = true;
                } else {
                    result.success = false;
                    result.errorMessage = 'API returned status ' + res.getStatusCode();
                }
            } catch (Exception e) {
                result.success = false;
                result.errorMessage = e.getMessage();
            }

            results.add(result);
        }

        return results;
    }

    global class EnrichmentRequest {
        @InvocableVariable(required=true description='Company website domain (e.g., "acme.com") to look up')
        global String companyDomain;
    }

    global class EnrichmentResult {
        @InvocableVariable(description='Whether the enrichment succeeded')
        global Boolean success;

        @InvocableVariable(description='Company legal name')
        global String companyName;

        @InvocableVariable(description='Total employee count')
        global Integer employeeCount;

        @InvocableVariable(description='Funding stage (e.g., Series A, Series B, Public)')
        global String fundingStage;

        @InvocableVariable(description='Industry classification')
        global String industryClassification;

        @InvocableVariable(description='Error message if enrichment failed')
        global String errorMessage;
    }
}
```

***

## <span data-proof="authored" data-by="ai:claude">Flow-Based MCP Tools</span>

<span data-proof="authored" data-by="ai:claude">Autolaunched Flows can be exposed as MCP tools. Flow input variables become tool parameters; output variables become the response.</span>

### <span data-proof="authored" data-by="ai:claude">When to Use Flows vs Apex</span>

| <span data-proof="authored" data-by="ai:claude">Use Flow</span>                      | <span data-proof="authored" data-by="ai:claude">Use Apex</span>                        |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Admin-maintainable logic</span>      | <span data-proof="authored" data-by="ai:claude">Complex conditional logic</span>       |
| <span data-proof="authored" data-by="ai:claude">Simple record operations</span>      | <span data-proof="authored" data-by="ai:claude">External API callouts</span>           |
| <span data-proof="authored" data-by="ai:claude">No external callouts needed</span>   | <span data-proof="authored" data-by="ai:claude">Multi-step orchestration</span>        |
| <span data-proof="authored" data-by="ai:claude">Declarative-first org culture</span> | <span data-proof="authored" data-by="ai:claude">Performance-critical operations</span> |

### <span data-proof="authored" data-by="ai:claude">Flow Design for MCP</span>

1. **<span data-proof="authored" data-by="ai:claude">Flow Type</span>**<span data-proof="authored" data-by="ai:claude">: Autolaunched Flow (no screen elements)</span>
2. **<span data-proof="authored" data-by="ai:claude">Input Variables</span>**<span data-proof="authored" data-by="ai:claude">: Mark as "Available for Input" — these become MCP tool parameters</span>
3. **<span data-proof="authored" data-by="ai:claude">Output Variables</span>**<span data-proof="authored" data-by="ai:claude">: Mark as "Available for Output" — these become the MCP tool response</span>
4. **<span data-proof="authored" data-by="ai:claude">Naming</span>**<span data-proof="authored" data-by="ai:claude">: Use descriptive variable API names — AI clients see these</span>

### <span data-proof="authored" data-by="ai:claude">Flow Input/Output Best Practices</span>

```
Input Variables (become tool parameters):
  - recordId (Text) — "The record ID to process"
  - actionType (Text) — "The action to perform: approve, reject, or defer"
  - notes (Text) — "Optional notes to attach to the action"

Output Variables (become tool response):
  - success (Boolean) — "Whether the action completed successfully"
  - resultMessage (Text) — "Human-readable result description"
  - updatedRecordId (Text) — "ID of the updated record"
```

> **<span data-proof="authored" data-by="ai:claude">Key Insight:</span>** <span data-proof="authored" data-by="ai:claude">Flow variable descriptions are visible to AI clients. Write them as if explaining the parameter to a person who has never seen your org.</span>

***

## <span data-proof="authored" data-by="ai:claude">Named Query API Tools</span>

<span data-proof="authored" data-by="ai:claude">Named Query APIs expose parameterized SOQL queries as read-only MCP tools. They are the simplest tool type.</span>

### <span data-proof="authored" data-by="ai:claude">When to Use</span>

* <span data-proof="authored" data-by="ai:claude">Read-only data access (no DML)</span>

* <span data-proof="authored" data-by="ai:claude">Standard SOQL queries with bind variables</span>

* <span data-proof="authored" data-by="ai:claude">Reporting and dashboard-style queries</span>

* <span data-proof="authored" data-by="ai:claude">Low-complexity data retrieval</span>

### <span data-proof="authored" data-by="ai:claude">Configuration</span>

<span data-proof="authored" data-by="ai:claude">Named Query APIs are registered in Setup and exposed through the custom MCP server. The query parameters become tool input parameters.</span>

### <span data-proof="authored" data-by="ai:claude">Query Design</span>

```sql proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6Mzc3LCJhdHRycyI6eyJieSI6ImFpOmNsYXVkZSJ9fV0=
-- Good: Parameterized with clear purpose
SELECT Id, Name, Amount, StageName, CloseDate
FROM Opportunity
WHERE AccountId = :accountId
AND IsClosed = false
ORDER BY CloseDate ASC

-- Good: Aggregate query for reporting
SELECT StageName, COUNT(Id) totalCount, SUM(Amount) totalAmount
FROM Opportunity
WHERE OwnerId = :userId
AND CloseDate = THIS_FISCAL_QUARTER
GROUP BY StageName
```

> **<span data-proof="authored" data-by="ai:claude">Security:</span>** <span data-proof="authored" data-by="ai:claude">Named Queries inherit the authenticated user's CRUD/FLS/sharing automatically.</span>

***

## <span data-proof="authored" data-by="ai:claude">Custom Server Registration</span>

### <span data-proof="authored" data-by="ai:claude">Step 1: Create Custom Server</span>

1. <span data-proof="authored" data-by="ai:claude">Navigate to</span> **<span data-proof="authored" data-by="ai:claude">Setup > API Catalog > MCP Servers</span>**
2. <span data-proof="authored" data-by="ai:claude">Click</span> **<span data-proof="authored" data-by="ai:claude">New Custom MCP Server</span>**
3. <span data-proof="authored" data-by="ai:claude">Enter server name and description</span>

### <span data-proof="authored" data-by="ai:claude">Step 2: Add Tools</span>

<span data-proof="authored" data-by="ai:claude">For each tool:</span>

1. <span data-proof="authored" data-by="ai:claude">Select backing type:</span> **<span data-proof="authored" data-by="ai:claude">Apex Action</span>**<span data-proof="authored" data-by="ai:claude">,</span> **<span data-proof="authored" data-by="ai:claude">Flow</span>**<span data-proof="authored" data-by="ai:claude">, or</span> **<span data-proof="authored" data-by="ai:claude">Named Query</span>**
2. <span data-proof="authored" data-by="ai:claude">Choose the specific action/flow/query</span>
3. **<span data-proof="authored" data-by="ai:claude">Name the tool</span>** <span data-proof="authored" data-by="ai:claude">— AI clients see this name</span>
4. **<span data-proof="authored" data-by="ai:claude">Write a clear description</span>** <span data-proof="authored" data-by="ai:claude">— AI clients use this to decide when to invoke the tool</span>

### <span data-proof="authored" data-by="ai:claude">Step 3: Publish and Activate</span>

1. <span data-proof="authored" data-by="ai:claude">Review all tools and descriptions</span>
2. <span data-proof="authored" data-by="ai:claude">Activate the server</span>
3. <span data-proof="authored" data-by="ai:claude">Wait up to 2 minutes for propagation</span>

> **<span data-proof="authored" data-by="ai:claude">Critical:</span>** <span data-proof="authored" data-by="ai:claude">Tool names and descriptions are what AI clients use to understand and select tools. Invest time in writing clear, action-oriented descriptions.</span>

***

## <span data-proof="authored" data-by="ai:claude">MCP Prompt Templates</span>

<span data-proof="authored" data-by="ai:claude">The</span> <span data-proof="authored" data-by="ai:claude">`platform/sobject-all`</span> <span data-proof="authored" data-by="ai:claude">server ships with built-in prompt templates (e.g., Account Review Briefing). You can create custom prompt templates for your custom servers.</span>

### <span data-proof="authored" data-by="ai:claude">How Prompt Templates Work with MCP</span>

<span data-proof="authored" data-by="ai:claude">Prompt templates provide pre-built natural language starting points that AI clients can invoke. They combine:</span>

* <span data-proof="authored" data-by="ai:claude">A structured prompt with merge fields</span>

* <span data-proof="authored" data-by="ai:claude">Input object bindings (which record to analyze)</span>

* <span data-proof="authored" data-by="ai:claude">Optional Flow/Apex grounding for additional data</span>

### <span data-proof="authored" data-by="ai:claude">Creating Prompt Templates for MCP</span>

<span data-proof="authored" data-by="ai:claude">Use the</span> <span data-proof="authored" data-by="ai:claude">`prompt-builder`</span> <span data-proof="authored" data-by="ai:claude">skill for full metadata XML reference. Key considerations for MCP:</span>

* **<span data-proof="authored" data-by="ai:claude">Template Type</span>**<span data-proof="authored" data-by="ai:claude">: Use</span> <span data-proof="authored" data-by="ai:claude">`FlexTemplate`</span> <span data-proof="authored" data-by="ai:claude">for maximum flexibility with MCP clients</span>

* **<span data-proof="authored" data-by="ai:claude">Descriptions</span>**<span data-proof="authored" data-by="ai:claude">: Write descriptions that help AI clients understand when to use the template</span>

* **<span data-proof="authored" data-by="ai:claude">Inputs</span>**<span data-proof="authored" data-by="ai:claude">: Keep inputs simple — ideally a single record ID</span>

* **<span data-proof="authored" data-by="ai:claude">Output</span>**<span data-proof="authored" data-by="ai:claude">: Structure output as actionable insights, not raw data</span>

### <span data-proof="authored" data-by="ai:claude">Example: Deal Analysis Template</span>

```xml proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MTQ4MSwiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
<?xml version="1.0" encoding="UTF-8"?>
<GenAiPromptTemplate xmlns="http://soap.sforce.com/2006/04/metadata">
    <activeVersion>v1</activeVersion>
    <createdInVersion>63.0</createdInVersion>
    <developerName>MCP_Deal_Analysis</developerName>
    <masterLabel>Deal Analysis for MCP</masterLabel>
    <relatedEntity>Opportunity</relatedEntity>
    <templateVersions>
        <content>Analyze this opportunity and provide a deal assessment:

Opportunity: {!$Input:Opportunity.Name}
Amount: {!$Input:Opportunity.Amount}
Stage: {!$Input:Opportunity.StageName}
Close Date: {!$Input:Opportunity.CloseDate}
Probability: {!$Input:Opportunity.Probability}

Account: {!$Input:Opportunity.Account.Name}
Industry: {!$Input:Opportunity.Account.Industry}

Related activities:
{!$RelatedList:Opportunity.ActivityHistories.Records}

Provide:
1. Deal health assessment (Green/Yellow/Red)
2. Key risks identified
3. Recommended next actions
4. Probability of closing by the target date</content>
        <inputs>
            <apiName>opportunityInput</apiName>
            <definition>SOBJECT://Opportunity</definition>
            <referenceName>Input:Opportunity</referenceName>
            <required>true</required>
        </inputs>
        <primaryModel>sfdc_ai__DefaultGPT4Omni</primaryModel>
        <status>Published</status>
        <versionIdentifier>v1</versionIdentifier>
    </templateVersions>
    <type>FlexTemplate</type>
    <visibility>Global</visibility>
</GenAiPromptTemplate>
```

***

## <span data-proof="authored" data-by="ai:claude">Testing MCP Tools</span>

### <span data-proof="authored" data-by="ai:claude">Unit Testing Invocable Actions</span>

```apex proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MjE3MSwiYXR0cnMiOnsiYnkiOiJhaTpjbGF1ZGUifX1d
@IsTest
private class AccountReviewToolTest {

    @TestSetup
    static void setupTestData() {
        Account testAccount = new Account(
            Name = 'Test Corp',
            Industry = 'Technology',
            AnnualRevenue = 5000000
        );
        insert testAccount;

        insert new Opportunity(
            Name = 'Test Opp',
            AccountId = testAccount.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30),
            Amount = 100000
        );

        insert new Contact(
            FirstName = 'Test',
            LastName = 'Contact',
            AccountId = testAccount.Id,
            Email = 'test@testcorp.com'
        );
    }

    @IsTest
    static void testReviewAccount_success() {
        Account acc = [SELECT Id FROM Account LIMIT 1];

        AccountReviewTool.AccountReviewRequest req = new AccountReviewTool.AccountReviewRequest();
        req.accountId = acc.Id;

        Test.startTest();
        List<AccountReviewTool.AccountReview> results = AccountReviewTool.reviewAccount(
            new List<AccountReviewTool.AccountReviewRequest>{ req }
        );
        Test.stopTest();

        System.assertEquals(1, results.size(), 'Should return one result');
        System.assert(results[0].success, 'Review should succeed');
        System.assertEquals('Test Corp', results[0].accountName);
        System.assertEquals(1, results[0].openOpportunityCount);
        System.assertEquals(1, results[0].contactCount);
    }

    @IsTest
    static void testReviewAccount_notFound() {
        AccountReviewTool.AccountReviewRequest req = new AccountReviewTool.AccountReviewRequest();
        req.accountId = '001000000000000AAA'; // Non-existent

        Test.startTest();
        List<AccountReviewTool.AccountReview> results = AccountReviewTool.reviewAccount(
            new List<AccountReviewTool.AccountReviewRequest>{ req }
        );
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assert(!results[0].success, 'Review should fail for non-existent account');
        System.assert(results[0].errorMessage.contains('not found'));
    }
}
```

### <span data-proof="authored" data-by="ai:claude">Testing via Postman</span>

<span data-proof="authored" data-by="ai:claude">Postman returns raw JSON without LLM interpretation — ideal for validating tool behavior:</span>

1. <span data-proof="authored" data-by="ai:claude">Connect Postman to your custom MCP server</span>
2. <span data-proof="authored" data-by="ai:claude">Call each tool with known test inputs</span>
3. <span data-proof="authored" data-by="ai:claude">Verify JSON response structure matches expectations</span>
4. <span data-proof="authored" data-by="ai:claude">Test error cases (invalid IDs, missing required fields)</span>

### <span data-proof="authored" data-by="ai:claude">Integration Testing with AI Clients</span>

<span data-proof="authored" data-by="ai:claude">After Postman validation, test with actual AI clients:</span>

1. <span data-proof="authored" data-by="ai:claude">Connect Claude/Cursor to the custom MCP server</span>
2. <span data-proof="authored" data-by="ai:claude">Ask natural language questions that should trigger each tool</span>
3. <span data-proof="authored" data-by="ai:claude">Verify the AI correctly selects and invokes tools</span>
4. <span data-proof="authored" data-by="ai:claude">Check that responses are useful and well-structured</span>

***

## <span data-proof="authored" data-by="ai:claude">Tool Description Best Practices</span>

<span data-proof="authored" data-by="ai:claude">Tool descriptions are the</span> **<span data-proof="authored" data-by="ai:claude">most important part</span>** <span data-proof="authored" data-by="ai:claude">of custom MCP tools. AI clients use descriptions to decide which tool to invoke and how to construct parameters.</span>

### <span data-proof="authored" data-by="ai:claude">Good Descriptions</span>

```
# Tool-level description
"Retrieves a comprehensive account summary including open opportunities,
recent cases, and key contacts for AI-assisted account review"

# Parameter-level descriptions
@InvocableVariable(description='The Salesforce Account record ID to review')
@InvocableVariable(description='Number of open (unclosed) support cases')
@InvocableVariable(description='Reason for escalation — will be added as an internal comment')
```

### <span data-proof="authored" data-by="ai:claude">Bad Descriptions</span>

```
# Too vague — AI doesn't know when to use it
"Processes account data"

# Too technical — AI can't translate user intent
"Executes SOQL against Account with subqueries on Opportunity and Case"

# Missing context — AI doesn't know the parameter format
@InvocableVariable(description='id')
@InvocableVariable(description='the reason')
```

### <span data-proof="authored" data-by="ai:claude">Rules</span>

1. **<span data-proof="authored" data-by="ai:claude">Describe what, not how</span>** <span data-proof="authored" data-by="ai:claude">— "Retrieves account summary" not "Runs SOQL query"</span>
2. **<span data-proof="authored" data-by="ai:claude">Be specific about scope</span>** <span data-proof="authored" data-by="ai:claude">— "open opportunities" not "opportunities"</span>
3. **<span data-proof="authored" data-by="ai:claude">Document parameter format</span>** <span data-proof="authored" data-by="ai:claude">— "Account record ID" not just "id"</span>
4. **<span data-proof="authored" data-by="ai:claude">Explain side effects</span>** <span data-proof="authored" data-by="ai:claude">— "will be added as an internal comment"</span>
5. **<span data-proof="authored" data-by="ai:claude">Use action verbs</span>** <span data-proof="authored" data-by="ai:claude">— "Retrieves", "Creates", "Escalates", "Searches"</span>