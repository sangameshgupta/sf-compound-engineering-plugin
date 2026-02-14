---
name: sf-work
description: Implement Salesforce features following a plan
arguments:
  - name: plan
    description: Path to plan file or feature description
    required: true
---

# /sf-work

You are implementing a Salesforce feature. Your job is to write production-quality code.

## Goal

Implement the feature described in: `$ARGUMENTS.plan`

If a plan file path is provided, read it first. If a description is provided, implement directly.

---

## Routing Guidance (Index-First)

Classify the implementation first, then route via index files:
- Use `agents/index.md` to decide applicable agent category
- Use `skills/index.md` to decide applicable skills
- Read only the selected category files (not all agents/skills)
- Include `skills/governor-limits/SKILL.md` for limit-sensitive backend work

---

## Internal-First Implementation (Guidance)

Use built-in platform features wherever possible:
- Flows, Validation Rules, Approval Processes
- Apex, Platform Events, and standard metadata
- LWC, Aura, Visualforce for UI
- Standard security model (CRUD/FLS, sharing)

If external services are needed, justify them explicitly by documenting:
- The exact platform gap
- Why a native approach cannot satisfy requirements
- The minimal external dependency needed

---

## Parallel Research (Optional Guidance)

If behavior is uncertain, version-sensitive, or new, consider parallel research across:
- Official docs: `site:developer.salesforce.com`
- Community Q&A: `site:salesforce.stackexchange.com`
- External Salesforce authors and consulting writeups

When research is used, include short evidence notes: native option considered, key edge case/pitfall, implementation guardrail.

---

## Available Resources

### Agents (Expertise)
Read `agents/index.md` to route to relevant agents.  
If running from CLI bootstrap, the equivalent path is `.claude/agents/index.md`.

### Skills (Domain Knowledge)
Read `skills/index.md` to route to relevant skills.  
If running from CLI bootstrap, the equivalent path is `.claude/skills/index.md`.

### Existing Codebase
Follow existing patterns, naming conventions, and architecture in the project.

---

## Implementation Standards

### Apex Code
- Follow existing trigger handler pattern in codebase
- Bulkify all operations (handle 200+ records)
- CRUD/FLS enforcement on all database operations
- Proper exception handling
- Meaningful method and variable names

### Flows
- Clear element naming (e.g., `Get_Account_Details`, `Decision_Check_Status`)
- Entry conditions to prevent unnecessary execution
- Bulkified operations (no DML/SOQL in loops)
- Fault handling for error scenarios

### LWC
- Component naming follows existing conventions
- Proper error handling and loading states
- Accessible markup (ARIA, keyboard navigation)
- Efficient wire/imperative Apex calls

### Test Classes
- Minimum 90% code coverage target
- Bulk tests (200+ records)
- Positive and negative scenarios
- Test as different user contexts when relevant

---

## Your Process

1. Read plan/requirements.
2. Route via indexes and read only relevant skills/agents.
3. Follow existing codebase patterns.
4. Implement with native-first approach.
5. Add tests as needed.
6. Validate compile/tests.

---

## WebSearch Guidance

Use WebSearch when:
- Need syntax for a specific Salesforce API
- Implementing a feature not covered in skills
- Need latest best practices
- Troubleshooting errors
- Native-first evaluation is complete and still insufficient

---

## Output

Create/modify only the required Salesforce files (Apex, Flows, LWC, metadata) and list changed files in your response.

---

## After Implementation

When implementation is complete:

```
Implementation complete.

Files created:
- [list of files]

Next: /sf-review
```
