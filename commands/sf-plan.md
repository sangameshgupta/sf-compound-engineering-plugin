---
name: sf-plan
description: Research and design Salesforce features - creates specifications, not code
arguments:
  - name: feature
    description: Description of the feature to plan
    required: true
---

# /sf-plan

You are planning a Salesforce implementation. Your job is to research and design - **NOT write code**.

## Goal

Create a specification and technical design for: `$ARGUMENTS.feature`

---

## Routing Guidance (Index-First)

Classify the task first, then route via index files:
- Use `agents/index.md` as the source of truth for which agent category to read
- Use `skills/index.md` as the source of truth for which skills to read
- Read only relevant sections/files for the chosen classification
- Keep reads selective: index first, deep-read only what applies
- Include `skills/governor-limits/SKILL.md` when backend limits are relevant

---

## Internal-First Discovery (Guidance)

Prefer Salesforce-native capabilities first:
- Declarative automation (Flows, Validation Rules, Approval Processes)
- Apex and platform events
- LWC, Aura, Visualforce, and standard UI patterns
- Standard objects, fields, and metadata
- Standard security model

If external services are proposed, state:
- Why native Salesforce options are insufficient
- What capability is missing internally
- Why the external option is necessary

---

## Parallel Research (Optional Guidance)

If the requirement is unclear, novel, or has multiple valid approaches, consider parallel research across:
- Official docs: `site:developer.salesforce.com`
- Community Q&A: `site:salesforce.stackexchange.com`
- External Salesforce authors and consulting writeups

When research is used, include short evidence notes: native option considered, key pitfall/limit, chosen pattern.

---

## Critical Constraint

**DO NOT WRITE CODE.** This command produces:
- Architecture decisions (which components, how they connect)
- Method signatures (names, parameters, return types)
- Configuration specifications (object names, field names, Flow structure)
- Task lists for implementation

Code implementation happens in `/sf-work`.

---

## Available Resources

### Agents (Expertise)
Read `agents/index.md` to route to relevant agents.  
If running from CLI bootstrap, the equivalent path is `.claude/agents/index.md`.

### Skills (Domain Knowledge)
Read `skills/index.md` to route to relevant skills.  
If running from CLI bootstrap, the equivalent path is `.claude/skills/index.md`.

### Existing Codebase
Explore the codebase to understand existing patterns, naming conventions, and architecture.

---

## Your Process

1. Classify and route with index files.
2. Read only relevant agent/skill files.
3. Explore existing code patterns.
4. Use WebSearch only when needed.
5. Design architecture (no code).
6. Save under `.specify/specs/`.

---

## Output

Create `.specify/specs/<NNN>-<feature-slug>/` with:
- `spec.md` (business requirements, acceptance criteria, constraints)
- `plan.md` (components, architecture, design decisions, limits, security)
- `tasks.md` (implementation, testing, deployment checklist)

---

## WebSearch Guidance

Use WebSearch when:
- Skills don't cover the specific pattern
- Need latest Salesforce documentation
- Working with newer features
- Need community solutions
- Native-first evaluation is complete and still insufficient

Search sites:
- `site:developer.salesforce.com` - Official docs
- `site:salesforce.stackexchange.com` - Community solutions

---

## Quality Bar

- Keep output architecture-focused (no implementation code).
- Include Salesforce limits and security implications.
- Prefer simple, native-first designs.

---

## After Planning

When plan is complete, inform the user:

```
Plan created: .specify/specs/<NNN>-<feature>/

Next: /sf-work .specify/specs/<NNN>-<feature>/plan.md
```
