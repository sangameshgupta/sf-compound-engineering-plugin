---
name: sf-review
description: Review Salesforce code for quality, security, and best practices
arguments:
  - name: target
    description: File path, directory, or PR number to review (defaults to uncommitted changes)
    required: false
---

# /sf-review

You are reviewing Salesforce code. Your job is to identify issues and suggest improvements.

## Goal

Review the code at: `$ARGUMENTS.target`

If no target specified, review uncommitted changes (`git diff`).

---

## Routing Guidance (Index-First)

Classify reviewed files first, then route via index files:
- Use `agents/index.md` to map file types to agent categories
- Load only agent categories that match files in scope
- For mixed diffs, apply each checklist only to matching file types
- Use skills only when a finding needs additional pattern/limit context

---

## Parallel Research (Optional Guidance)

If review criteria are unclear or the feature uses newer platform capabilities, consider running web research in parallel.
Validate review criteria against:
- Official docs: `site:developer.salesforce.com`
- Community Q&A: `site:salesforce.stackexchange.com`
- External Salesforce authors (blogs)
- Salesforce consulting companies (implementation writeups)
Summarize research-backed criteria and common pitfalls briefly.

---

## Available Resources

### Agents (Review Expertise)
Read `agents/index.md` to route to relevant review agents.  
If running from CLI bootstrap, the equivalent path is `.claude/agents/index.md`.

### Skills (Domain Knowledge)
Use `skills/index.md` only when review findings need extra pattern/limit context.  
If running from CLI bootstrap, the equivalent path is `.claude/skills/index.md`.

---

## Review Focus Areas

### For Apex Code
- **Governor Limits**: SOQL/DML in loops, CPU-intensive operations
- **Security**: CRUD/FLS enforcement, SOQL injection, hardcoded credentials
- **Bulkification**: Handles 200+ records, uses collections properly
- **Error Handling**: Try-catch blocks, meaningful error messages
- **Test Quality**: Assertions, bulk tests, negative scenarios

### For Flows
- **Governor Limits**: DML/SOQL in loops, bulkification
- **Complexity**: Too many elements, deeply nested decisions
- **Error Handling**: Fault paths, user-friendly errors
- **Recursion**: Entry conditions, prevention mechanisms

### For LWC
- **Performance**: Wire vs imperative, unnecessary re-renders
- **Security**: XSS prevention, secure data handling
- **Accessibility**: ARIA attributes, keyboard navigation
- **Architecture**: Component hierarchy, event communication

### For Configuration
- **Data Model**: Relationships, field naming, indexes
- **Sharing**: OWD implications, sharing rules
- **Naming**: Conventions, API versions

---

## Your Process

1. Identify files in scope.
2. Classify file types.
3. Read relevant agent checklists.
4. Review and categorize findings by severity.
5. Report issue + fix suggestion.

---

## Severity

Use four levels: Critical, High, Medium, Low.

---

## Output Format

Report: target, files reviewed, findings grouped by severity, fix suggestions, and a short summary.

---

## After Review

When review is complete:

```
Review complete.

[Summary of findings]

Next: Fix issues and run /sf-review again
```
