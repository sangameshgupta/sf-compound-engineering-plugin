# Salesforce Agents Index

Use this index to route to relevant agents only.

***

## Routing Map

Use this file as the canonical agent router.

| Classification | Read Section              | Avoid                                             |
| -------------- | ------------------------- | ------------------------------------------------- |
| AUTOMATION     | Flow & Automation         | Apex Development, LWC                             |
| APEX           | Apex Development          | Flow & Automation                                 |
| LWC            | Lightning Web Components  | Flow & Automation (unless Apex controller needed) |
| INTEGRATION    | Integration               | Flow & Automation                                 |
| ARCHITECTURE   | Architecture & Data Model | N/A (applies broadly)                             |
| RESEARCH       | Research                  | N/A (dispatch for any task)                       |
| WORKFLOW       | Workflow                  | N/A (dispatch as needed)                          |

***

## Usage Guidance

1. Confirm classification from the command.
2. Jump to matching section.
3. Read only applicable agent files.
4. For mixed work, apply each agent only to matching files.
5. **For parallel dispatch:** Use the Agent tool to launch agents simultaneously.

***

## Apex Development

**SCOPE: APEX\_ONLY** - Apex classes, triggers, batch jobs.

| Agent                  | File                                  | Use When                                   |
| ---------------------- | ------------------------------------- | ------------------------------------------ |
| Trigger Architect      | `apex/apex-trigger-architect.md`      | Designing trigger logic, handler patterns  |
| Governor Guardian      | `apex/apex-governor-guardian.md`      | Checking SOQL/DML usage, limit compliance  |
| Bulkification Reviewer | `apex/apex-bulkification-reviewer.md` | Ensuring code handles 200+ records         |
| Security Sentinel      | `apex/apex-security-sentinel.md`      | CRUD/FLS checks, SOQL injection prevention |
| Exception Handler      | `apex/apex-exception-handler.md`      | Error handling patterns, custom exceptions |
| Test Coverage Analyst  | `apex/apex-test-coverage-analyst.md`  | Test class design, coverage strategy       |

***

## Flow & Automation

**SCOPE: AUTOMATION\_ONLY** - Flows and declarative automation.

| Agent                         | File                                          | Use When                                     |
| ----------------------------- | --------------------------------------------- | -------------------------------------------- |
| Flow Governor Monitor         | `automation/flow-governor-monitor.md`         | Checking Flow limits, DML/SOQL in Flows      |
| Flow Complexity Analyzer      | `automation/flow-complexity-analyzer.md`      | Evaluating Flow maintainability, refactoring |
| Process Automation Strategist | `automation/process-automation-strategist.md` | Choosing between Flow, Apex, or triggers     |
| Validation Rule Reviewer      | `automation/validation-rule-reviewer.md`      | Validation rule logic, error messages        |

***

## Lightning Web Components (LWC)

**SCOPE: LWC\_ONLY** - LWC components and Aura migrations.
Use Apex agents only if reviewing Apex controllers.

| Agent                       | File                                 | Use When                                   |
| --------------------------- | ------------------------------------ | ------------------------------------------ |
| LWC Architecture Strategist | `lwc/lwc-architecture-strategist.md` | Component hierarchy, state management      |
| LWC Performance Oracle      | `lwc/lwc-performance-oracle.md`      | Wire vs imperative, rendering optimization |
| LWC Security Reviewer       | `lwc/lwc-security-reviewer.md`       | XSS prevention, secure data handling       |
| LWC Accessibility Guardian  | `lwc/lwc-accessibility-guardian.md`  | ARIA, keyboard navigation, screen readers  |
| Aura Migration Advisor      | `lwc/aura-migration-advisor.md`      | Converting Aura components to LWC          |

***

## Integration

**SCOPE: INTEGRATION\_ONLY** - APIs, callouts, events, external systems.

| Agent                         | File                                               | Use When                                                                     |
| ----------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| REST API Architect            | `integration/rest-api-architect.md`                | Building REST endpoints, API design                                          |
| Callout Pattern Reviewer      | `integration/callout-pattern-reviewer.md`          | HTTP callouts, Named Credentials, mocking                                    |
| Platform Event Strategist     | `integration/platform-event-strategist.md`         | Event-driven architecture, pub/sub                                           |
| Integration Security Sentinel | `integration/integration-security-sentinel.md`     | Auth, certificates, secure data transfer                                     |
| MCP Server Config Reviewer    | `integration/mcp-server-configuration-reviewer.md` | Reviewing Hosted MCP Server setup, ECA configuration                         |
| MCP Tool Builder              | `integration/mcp-tool-builder-agent.md`            | Reviewing/assisting custom MCP tool development (Apex, Flows, Named Queries) |

***

## Architecture & Data Model

**SCOPE: UNIVERSAL** - Cross-cutting org design and metadata concerns.

| Agent                          | File                                             | Use When                                  |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------- |
| Data Model Architect           | `architecture/data-model-architect.md`           | Object relationships, field design        |
| Sharing Security Analyst       | `architecture/sharing-security-analyst.md`       | OWD, sharing rules, permission sets       |
| Pattern Recognition Specialist | `architecture/pattern-recognition-specialist.md` | Identifying reusable patterns in codebase |
| Metadata Consistency Checker   | `architecture/metadata-consistency-checker.md`   | Naming conventions, API versions          |

***

## Research

**SCOPE: UNIVERSAL** - Dispatch during planning and pre-implementation research.
**MODEL: haiku/sonnet** - Optimized for speed or depth as noted.

| Agent                     | File                                                                                         | Model                                                        | Use When                                         |
| ------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| Learnings Researcher      | `research/sf-learnings-researcher.md`                                                        | haiku                                                        | Searching `docs/solutions/` for past solutions   |
| Best Practices Researcher | `research/sf-best-practices-researcher.md`                                                   | sonnet                                                       | 3-phase research: skills → Context7 → web        |
| Git History Analyzer      | <span data-proof="authored" data-by="ai:claude">`research/sf-git-history-analyzer.md`</span> | <span data-proof="authored" data-by="ai:claude">haiku</span> | Understanding code evolution via git archaeology |
| Repo Research Analyst     | `research/sf-repo-research-analyst.md`                                                       | haiku                                                        | Analyzing project structure and conventions      |
| Framework Docs Researcher | `research/sf-framework-docs-researcher.md`                                                   | sonnet                                                       | Salesforce platform docs via Context7 + web      |

***

## Workflow

**SCOPE: UNIVERSAL** - Dispatch for workflow automation and quality assurance.

| Agent                      | File                                           | Model  | Use When                                                        |
| -------------------------- | ---------------------------------------------- | ------ | --------------------------------------------------------------- |
| Spec Flow Analyzer         | `workflow/sf-spec-flow-analyzer.md`            | sonnet | Validating specs for completeness, trigger context permutations |
| Bug Reproduction Validator | `workflow/sf-bug-reproduction-validator.md`    | sonnet | Systematic 6-step bug reproduction                              |
| PR Comment Resolver        | `workflow/sf-pr-comment-resolver.md`           | haiku  | Parallel resolution of PR review comments                       |
| Code Simplicity Reviewer   | `workflow/sf-code-simplicity-reviewer.md`      | haiku  | YAGNI enforcement, simplification opportunities                 |
| Deployment Verification    | `workflow/sf-deployment-verification-agent.md` | sonnet | Go/No-Go checklists, rollback procedures                        |

***

## Quick Reference: Which Agents for Which Task?

| Task                  | Classification | Primary Agents                                                                                                                                                                                                                        |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Apex Trigger          | APEX           | `apex-trigger-architect`, `apex-bulkification-reviewer`, `apex-governor-guardian`                                                                                                                                                     |
| Apex Service Class    | APEX           | `apex-governor-guardian`, `apex-security-sentinel`, `apex-exception-handler`                                                                                                                                                          |
| Apex Test Class       | APEX           | `apex-test-coverage-analyst`                                                                                                                                                                                                          |
| Record-Triggered Flow | AUTOMATION     | `flow-governor-monitor`, `flow-complexity-analyzer`                                                                                                                                                                                   |
| Screen Flow           | AUTOMATION     | `flow-complexity-analyzer`, `process-automation-strategist`                                                                                                                                                                           |
| LWC Component         | LWC            | `lwc-architecture-strategist`, `lwc-performance-oracle`                                                                                                                                                                               |
| REST API              | INTEGRATION    | `rest-api-architect`, `integration-security-sentinel`                                                                                                                                                                                 |
| External Callout      | INTEGRATION    | `callout-pattern-reviewer`, `integration-security-sentinel`                                                                                                                                                                           |
| Platform Event        | INTEGRATION    | `platform-event-strategist`                                                                                                                                                                                                           |
| Custom Object         | ARCHITECTURE   | `data-model-architect`, `sharing-security-analyst`                                                                                                                                                                                    |
| Planning Phase        | RESEARCH       | `sf-learnings-researcher`, `sf-repo-research-analyst`, `sf-best-practices-researcher`                                                                                                                                                 |
| Pre-Deploy            | WORKFLOW       | `sf-deployment-verification-agent`, `sf-code-simplicity-reviewer`                                                                                                                                                                     |
| Bug Investigation     | WORKFLOW       | `sf-bug-reproduction-validator`, `sf-git-history-analyzer``
Hosted MCP Setup
INTEGRATION
mcp-server-configuration-reviewer, integration-security-sentinel
Custom MCP Tool
INTEGRATION
mcp-tool-builder-agent, apex-governor-guardian` |

<!-- PROOF
{
  "version": 2,
  "marks": {
    "m1776327061780_1": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T08:11:01.780Z",
      "range": {
        "from": 7203,
        "to": 7372
      },
      "content": "\nHosted MCP Setup\nINTEGRATION\nmcp-server-configuration-reviewer, integration-security-sentinel\nCustom MCP Tool\nINTEGRATION\nmcp-tool-builder-agent, apex-governor-guardian",
      "status": "pending"
    }
  }
}
-->

<!-- PROOF:END -->
