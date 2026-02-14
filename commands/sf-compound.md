---
name: sf-compound
description: Capture learnings from completed work to improve future development
arguments:
  - name: scope
    description: What to compound (defaults to recent work)
    required: false
---

# /sf-compound

You are capturing learnings from completed work. Your job is to identify patterns and insights that will make future development faster and better.

## Goal

Analyze recent work and capture learnings to: `$ARGUMENTS.scope`

If no scope specified, analyze recent commits and changes.

---

## Routing Guidance (Index-First)

Classify recent work, then route updates via index files:
- Use `agents/index.md` to choose agent files for new checks
- Use `skills/index.md` to choose skill files for new patterns
- Update only files relevant to the work classification
- Avoid cross-contamination across Apex/Flow/LWC/Integration domains

---

## Parallel Research (Optional Guidance)

If the work involved newer features or unusual patterns, consider running web research in parallel to validate learnings.
Cross-check learnings with:
- Official docs: `site:developer.salesforce.com`
- Community Q&A: `site:salesforce.stackexchange.com`
- External Salesforce authors (blogs)
- Salesforce consulting companies (implementation writeups)
Include brief research notes: confirmed practice, pitfall, and any version-specific detail.

---

## The Compound Loop

```
Plan (40%) → Work (20%) → Review (20%) → Compound (20%) → Repeat
                                              │
                                              └── YOU ARE HERE
```

This is what makes each iteration smarter than the last.

---

## Available Resources

### Agents (to enhance)
Read `agents/index.md` to route to target agent files.  
If running from CLI bootstrap, the equivalent path is `.claude/agents/index.md`.

### Skills (to expand)
Read `skills/index.md` to route to target skill files.  
If running from CLI bootstrap, the equivalent path is `.claude/skills/index.md`.

### CLAUDE.md (to update)
Project-specific context and learnings.

---

## What to Capture

- Reusable patterns from recent work.
- Preventable issues and checks to add.
- Project context updates for `CLAUDE.md`.
- Test fixture improvements (if applicable).

---

## Your Process

1. Analyze recent work and classification.
2. Identify patterns/issues/context worth codifying.
3. Update relevant skill/agent files and `CLAUDE.md`.
4. Create a compound report.

---

## Output

Update relevant skills/agents/`CLAUDE.md`, then save a report to `.specify/compounds/<date>-<feature>.md` with: what was built, patterns captured, agent enhancements, context updates, and impact.

---

## After Compounding

When complete:

```
Compound complete.

Knowledge updates:
- Skills: X patterns added
- Agents: X checks added
- CLAUDE.md: X entries added

Report: .specify/compounds/<date>-<feature>.md

The next iteration starts smarter.
```
