# <span data-proof="authored" data-by="ai:claude">SF Compound Engineering Plugin v2.2.0</span>

**<span data-proof="authored" data-by="ai:claude">Instruction-Based Compound Engineering for Salesforce</span>** <span data-proof="authored" data-by="ai:claude">— a Claude Code plugin where each iteration becomes smarter than the last through institutional knowledge capture and parallel agent dispatch.</span>

<span data-proof="authored" data-by="ai:claude">Inspired by</span> [<span data-proof="authored" data-by="ai:claude">Every's Compound Engineering</span>](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) <span data-proof="authored" data-by="ai:claude">and</span> [<span data-proof="authored" data-by="ai:claude">GitHub Spec-Kit</span>](https://github.com/github/spec-kit)<span data-proof="authored" data-by="ai:claude">.</span>

***

## <span data-proof="authored" data-by="ai:claude">The Compound Engineering Loop</span>

```
Brainstorm → Plan (40%) → Deepen → Work (20%) → Review (20%) → Compound (20%) → Repeat
     │            │           │          │              │               │
     │            │           │          │              │               └── Capture to docs/solutions/
     │            │           │          │              └── Parallel agent dispatch (33 agents)
     │            │           │          └── Implement with pre-research + test checks
     │            │           └── Enhance plan with section-level parallel research
     │            └── Research & design using 12 skills + 5 research agents
     └── Explore requirements through collaborative dialogue
```

**<span data-proof="authored" data-by="ai:claude">Each iteration starts smarter</span>** <span data-proof="authored" data-by="ai:claude">because learnings compound into</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`, agents, skills, and CLAUDE.md.</span>

***

## Quick Start

### Claude Code (Native)

```bash
# Add as a Claude Code plugin
/plugin marketplace add https://github.com/sangameshgupta/sf-compound-engineering-plugin

# Install
/plugin install sf-compound-engineering
```

### Other AI Coding Tools (11 platforms)

```bash
# GitHub Copilot
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to copilot

# Cursor
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to cursor

# Windsurf
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to windsurf

# Gemini CLI
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to gemini

# OpenCode
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to opencode

# Codex
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to codex

# Kiro
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to kiro

# Factory Droid
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to droid

# Pi
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to pi

# OpenClaw
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to openclaw

# Qwen Code
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to qwen

# Auto-detect and install to all detected tools
bunx @sangameshgupta/sf-compound-plugin install sf-compound-engineering --to all

# Sync from current directory to all detected tools
bunx @sangameshgupta/sf-compound-plugin sync
```

### What Gets Converted

| Platform     | Commands                   | Agents                          | Skills                       | MCP Config                |
| ------------ | -------------------------- | ------------------------------- | ---------------------------- | ------------------------- |
| **Copilot**  | `.github/skills/`          | `.github/agents/*.agent.md`     | `.github/skills/`            | `copilot-mcp-config.json` |
| **Cursor**   | Sync only                  | Sync only                       | `.cursor/skills/` (symlinks) | `.cursor/mcp.json`        |
| **Windsurf** | `workflows/*.md`           | `skills/*/SKILL.md`             | `skills/`                    | `mcp_config.json`         |
| **Gemini**   | `.gemini/commands/*.toml`  | `.gemini/skills/`               | `.gemini/skills/`            | `settings.json`           |
| **OpenCode** | `commands/*.md`            | `agents/*.md`                   | `skills/`                    | `opencode.json`           |
| **Codex**    | `prompts/*.md` + `skills/` | `skills/*/SKILL.md`             | `skills/`                    | `config.toml`             |
| **Kiro**     | `.kiro/skills/`            | `.kiro/agents/*.json` + prompts | `.kiro/skills/`              | `mcp.json`                |
| **Droid**    | `commands/*.md`            | `agents/*.md`                   | `skills/`                    | `mcp.json`                |
| **Pi**       | `prompts/*.md`             | `skills/*/SKILL.md`             | `skills/`                    | `mcp.json`                |
| **OpenClaw** | `commands/*.md`            | `agents/*.md`                   | `skills/`                    | TS entry point            |
| **Qwen**     | `commands/*.md`            | `agents/*.yaml`                 | `skills/`                    | N/A                       |

The plugin provides:

* **7 slash commands** for the full compound engineering workflow

* **<span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">33 specialized agents</span>** <span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">across 7 categories</span>

* **<span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">12 skills</span>** <span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">with Salesforce domain knowledge</span>

* **<span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">MCP integration</span>** <span data-proof="suggestion" data-id="m1776337295895_18" data-by="ai:claude" data-kind="replace">with Context7 for live framework documentation</span>

* **Institutional knowledge system** in `docs/solutions/` with YAML schema

* **Index-based routing** for low-context, selective agent/skill dispatch

***

## <span data-proof="authored" data-by="ai:claude">How It Works</span>

<span data-proof="authored" data-by="ai:claude">Commands tell Claude the</span> **<span data-proof="authored" data-by="ai:claude">goal</span>** <span data-proof="authored" data-by="ai:claude">and</span> **<span data-proof="authored" data-by="ai:claude">where to find knowledge</span>**<span data-proof="authored" data-by="ai:claude">. Claude decides</span> **<span data-proof="authored" data-by="ai:claude">which agents and skills are relevant</span>** <span data-proof="authored" data-by="ai:claude">for each specific task.</span>

### <span data-proof="authored" data-by="ai:claude">Index-Based Routing</span>

```
agents/index.md  →  Classification → Dispatch relevant agents in parallel
skills/index.md  →  Classification → Read only relevant skill sections
```

<span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">Classifications:</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`APEX`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`AUTOMATION`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`LWC`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`INTEGRATION`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`ARCHITECTURE`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`WORKFLOW`,</span></span> <span data-proof="suggestion" data-id="m1776337295868_17" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`TOOLING`</span></span>

***

## <span data-proof="authored" data-by="ai:claude">7 Commands</span>

| <span data-proof="authored" data-by="ai:claude">Command</span>          | <span data-proof="authored" data-by="ai:claude">Purpose</span>                                                                                                                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`/sf-brainstorm`</span> | <span data-proof="authored" data-by="ai:claude">Explore requirements through collaborative dialogue</span>                                                                                                                   |
| <span data-proof="authored" data-by="ai:claude">`/sf-plan`</span>       | <span data-proof="authored" data-by="ai:claude">Research & design specs with parallel agent research (NO CODE)</span>                                                                                                        |
| <span data-proof="authored" data-by="ai:claude">`/sf-deepen`</span>     | <span data-proof="authored" data-by="ai:claude">Enhance plan sections with parallel deep research</span>                                                                                                                     |
| <span data-proof="authored" data-by="ai:claude">`/sf-work`</span>       | <span data-proof="authored" data-by="ai:claude">Implement with pre-research, skills routing, and test checks</span>                                                                                                          |
| <span data-proof="authored" data-by="ai:claude">`/sf-review`</span>     | <span data-proof="authored" data-by="ai:claude">Review with parallel agent dispatch (fast/thorough/comprehensive)</span>                                                                                                     |
| <span data-proof="authored" data-by="ai:claude">`/sf-compound`</span>   | <span data-proof="authored" data-by="ai:claude">Capture learnings to</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span> <span data-proof="authored" data-by="ai:claude">with YAML schema</span> |
| <span data-proof="authored" data-by="ai:claude">`/sf-lfg`</span>        | <span data-proof="authored" data-by="ai:claude">Full autonomous pipeline — plan through deploy in one command</span>                                                                                                         |

### <span data-proof="authored" data-by="ai:claude">`/sf-lfg`</span> <span data-proof="authored" data-by="ai:claude">— The Full Pipeline</span>

```
Plan → Deepen → Work → Review → Resolve → Test → Deploy → Compound
```

<span data-proof="authored" data-by="ai:claude">Each stage has gates that must pass before proceeding. Aborts and asks for input on security issues, repeated test failures, or deployment validation problems.</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6NzEsImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19XQ==
/sf-lfg "Lead auto-assignment flow based on territory" --deploy=scratch
```

***

## <span data-proof="suggestion" data-id="m1776337295845_16" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">33 Agents by Category</span></span>

### <span data-proof="authored" data-by="ai:claude">Apex (6 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                  | <span data-proof="authored" data-by="ai:claude">Checks For</span>                              |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Governor Guardian</span>      | <span data-proof="authored" data-by="ai:claude">SOQL/DML in loops, limit compliance</span>     |
| <span data-proof="authored" data-by="ai:claude">Security Sentinel</span>      | <span data-proof="authored" data-by="ai:claude">CRUD/FLS, SOQL injection, credentials</span>   |
| <span data-proof="authored" data-by="ai:claude">Bulkification Reviewer</span> | <span data-proof="authored" data-by="ai:claude">200+ record handling, collections</span>       |
| <span data-proof="authored" data-by="ai:claude">Trigger Architect</span>      | <span data-proof="authored" data-by="ai:claude">One trigger per object, handler pattern</span> |
| <span data-proof="authored" data-by="ai:claude">Test Coverage Analyst</span>  | <span data-proof="authored" data-by="ai:claude">Assertions, bulk tests, coverage</span>        |
| <span data-proof="authored" data-by="ai:claude">Exception Handler</span>      | <span data-proof="authored" data-by="ai:claude">Error handling, custom exceptions</span>       |

### <span data-proof="authored" data-by="ai:claude">LWC (5 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                   | <span data-proof="authored" data-by="ai:claude">Checks For</span>                            |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Architecture Strategist</span> | <span data-proof="authored" data-by="ai:claude">Component hierarchy, state management</span> |
| <span data-proof="authored" data-by="ai:claude">Performance Oracle</span>      | <span data-proof="authored" data-by="ai:claude">Wire vs imperative, rendering</span>         |
| <span data-proof="authored" data-by="ai:claude">Security Reviewer</span>       | <span data-proof="authored" data-by="ai:claude">XSS, CSP compliance</span>                   |
| <span data-proof="authored" data-by="ai:claude">Accessibility Guardian</span>  | <span data-proof="authored" data-by="ai:claude">ARIA, keyboard navigation</span>             |
| <span data-proof="authored" data-by="ai:claude">Aura Migration Advisor</span>  | <span data-proof="authored" data-by="ai:claude">Migration candidates</span>                  |

### <span data-proof="authored" data-by="ai:claude">Automation (4 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                         | <span data-proof="authored" data-by="ai:claude">Checks For</span>                      |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Flow Governor Monitor</span>         | <span data-proof="authored" data-by="ai:claude">DML/SOQL in loops, limits</span>       |
| <span data-proof="authored" data-by="ai:claude">Flow Complexity Analyzer</span>      | <span data-proof="authored" data-by="ai:claude">Element count, decision depth</span>   |
| <span data-proof="authored" data-by="ai:claude">Process Automation Strategist</span> | <span data-proof="authored" data-by="ai:claude">Flow vs Apex decisions</span>          |
| <span data-proof="authored" data-by="ai:claude">Validation Rule Reviewer</span>      | <span data-proof="authored" data-by="ai:claude">Rule complexity, error messages</span> |

### <span data-proof="suggestion" data-id="m1776337295821_15" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">Integration (4 agents)</span></span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                         | <span data-proof="authored" data-by="ai:claude">Checks For</span>                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">REST API Architect</span>            | <span data-proof="authored" data-by="ai:claude">Endpoint design, versioning</span>                                                                                                                                                                                                                                                                                                                                        |
| <span data-proof="authored" data-by="ai:claude">Callout Pattern Reviewer</span>      | <span data-proof="authored" data-by="ai:claude">Named Credentials, retry logic</span>                                                                                                                                                                                                                                                                                                                                     |
| <span data-proof="authored" data-by="ai:claude">Platform Event Strategist</span>     | <span data-proof="authored" data-by="ai:claude">Event design, replay handling</span>                                                                                                                                                                                                                                                                                                                                      |
| <span data-proof="authored" data-by="ai:claude">Integration Security Sentinel</span> | <span data-proof="authored" data-by="ai:claude">Auth, certificates, data transit</span><span data-proof="suggestion" data-id="m1776337276974_8" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">
MCP Server Config Reviewer
Hosted MCP setup, ECA configuration, OAuth scopes
MCP Tool Builder
Custom MCP tool code quality, @InvocableMethod patterns, descriptions</span></span> |

### <span data-proof="authored" data-by="ai:claude">Architecture (4 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                          | <span data-proof="authored" data-by="ai:claude">Checks For</span>                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Data Model Architect</span>           | <span data-proof="authored" data-by="ai:claude">Relationships, field design</span>     |
| <span data-proof="authored" data-by="ai:claude">Sharing Security Analyst</span>       | <span data-proof="authored" data-by="ai:claude">OWD, sharing rules, permissions</span> |
| <span data-proof="authored" data-by="ai:claude">Pattern Recognition Specialist</span> | <span data-proof="authored" data-by="ai:claude">God classes, duplicate code</span>     |
| <span data-proof="authored" data-by="ai:claude">Metadata Consistency Checker</span>   | <span data-proof="authored" data-by="ai:claude">Naming, API versions</span>            |

### <span data-proof="authored" data-by="ai:claude">Research (5 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                     | <span data-proof="authored" data-by="ai:claude">Model</span>  | <span data-proof="authored" data-by="ai:claude">Purpose</span>                                                                                                                                                    |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Learnings Researcher</span>      | <span data-proof="authored" data-by="ai:claude">haiku</span>  | <span data-proof="authored" data-by="ai:claude">Search</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span> <span data-proof="authored" data-by="ai:claude">by YAML frontmatter</span> |
| <span data-proof="authored" data-by="ai:claude">Best Practices Researcher</span> | <span data-proof="authored" data-by="ai:claude">sonnet</span> | <span data-proof="authored" data-by="ai:claude">Skills → Context7 → web validation</span>                                                                                                                         |
| <span data-proof="authored" data-by="ai:claude">Git History Analyzer</span>      | <span data-proof="authored" data-by="ai:claude">haiku</span>  | <span data-proof="authored" data-by="ai:claude">Git archaeology for SF metadata evolution</span>                                                                                                                  |
| <span data-proof="authored" data-by="ai:claude">Repo Research Analyst</span>     | <span data-proof="authored" data-by="ai:claude">haiku</span>  | <span data-proof="authored" data-by="ai:claude">Project structure and conventions</span>                                                                                                                          |
| <span data-proof="authored" data-by="ai:claude">Framework Docs Researcher</span> | <span data-proof="authored" data-by="ai:claude">sonnet</span> | <span data-proof="authored" data-by="ai:claude">SF platform docs via Context7 + web</span>                                                                                                                        |

### <span data-proof="authored" data-by="ai:claude">Workflow (5 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                      | <span data-proof="authored" data-by="ai:claude">Model</span>  | <span data-proof="authored" data-by="ai:claude">Purpose</span>                                        |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">Spec Flow Analyzer</span>         | <span data-proof="authored" data-by="ai:claude">sonnet</span> | <span data-proof="authored" data-by="ai:claude">Trigger permutation matrix, gap identification</span> |
| <span data-proof="authored" data-by="ai:claude">Bug Reproduction Validator</span> | <span data-proof="authored" data-by="ai:claude">sonnet</span> | <span data-proof="authored" data-by="ai:claude">Systematic 6-step bug reproduction</span>             |
| <span data-proof="authored" data-by="ai:claude">PR Comment Resolver</span>        | <span data-proof="authored" data-by="ai:claude">haiku</span>  | <span data-proof="authored" data-by="ai:claude">Parallel PR comment resolution</span>                 |
| <span data-proof="authored" data-by="ai:claude">Code Simplicity Reviewer</span>   | <span data-proof="authored" data-by="ai:claude">haiku</span>  | <span data-proof="authored" data-by="ai:claude">YAGNI enforcement, LOC reduction</span>               |
| <span data-proof="authored" data-by="ai:claude">Deployment Verification</span>    | <span data-proof="authored" data-by="ai:claude">sonnet</span> | <span data-proof="authored" data-by="ai:claude">Go/No-Go checklists, rollback procedures</span>       |

***

## <span data-proof="suggestion" data-id="m1776337295795_14" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">12 Skills</span></span>

### <span data-proof="authored" data-by="ai:claude">Domain Skills</span>

| <span data-proof="authored" data-by="ai:claude">Skill</span>                  | <span data-proof="authored" data-by="ai:claude">Scope</span>            | <span data-proof="authored" data-by="ai:claude">Use When</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`governor-limits`</span>      | <span data-proof="authored" data-by="ai:claude">Universal</span>        | <span data-proof="authored" data-by="ai:claude">Any Apex, Flow, or trigger work</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <span data-proof="authored" data-by="ai:claude">`apex-patterns`</span>        | <span data-proof="authored" data-by="ai:claude">Apex only</span>        | <span data-proof="authored" data-by="ai:claude">Apex classes, triggers, services</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| <span data-proof="authored" data-by="ai:claude">`flow-patterns`</span>        | <span data-proof="authored" data-by="ai:claude">Automation only</span>  | <span data-proof="authored" data-by="ai:claude">Building any type of Flow</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <span data-proof="authored" data-by="ai:claude">`lwc-patterns`</span>         | <span data-proof="authored" data-by="ai:claude">LWC only</span>         | <span data-proof="authored" data-by="ai:claude">Lightning Web Components</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <span data-proof="authored" data-by="ai:claude">`security-guide`</span>       | <span data-proof="authored" data-by="ai:claude">Universal</span>        | <span data-proof="authored" data-by="ai:claude">CRUD/FLS, sharing, permissions</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <span data-proof="authored" data-by="ai:claude">`integration-patterns`</span> | <span data-proof="authored" data-by="ai:claude">Integration only</span> | <span data-proof="authored" data-by="ai:claude">Callouts, APIs, Platform Events</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <span data-proof="authored" data-by="ai:claude">`test-factory`</span>         | <span data-proof="authored" data-by="ai:claude">Apex only</span>        | <span data-proof="authored" data-by="ai:claude">Test classes, test data factories</span><span data-proof="suggestion" data-id="m1776337295765_13" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">
Agentforce Skills
Skill
Scope
Use When
agent-script
Agentforce Script Builder
Building Agentforce agents — syntax, blocks, variables, patterns
prompt-builder
Agentforce Prompt Builder
Prompt templates — metadata XML, merge fields, grounding, deployment
Hosted MCP Skills
Skill
Scope
Use When
hosted-mcp-servers
Hosted MCP
Setup, ECA configuration, URL patterns, security model, troubleshooting
mcp-tool-builder
Hosted MCP
Building custom MCP tools — Apex @InvocableMethod, Flows, Named Queries, prompt templates</span></span> |

### <span data-proof="authored" data-by="ai:claude">Workflow Skills</span>

| <span data-proof="authored" data-by="ai:claude">Skill</span>           | <span data-proof="authored" data-by="ai:claude">Use When</span>                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`sf-cli`</span>        | <span data-proof="authored" data-by="ai:claude">Deploy, retrieve, test, org management</span>               |
| <span data-proof="authored" data-by="ai:claude">`compound-docs`</span> | <span data-proof="authored" data-by="ai:claude">Writing solution documents with YAML schema</span>          |
| <span data-proof="authored" data-by="ai:claude">`file-todos`</span>    | <span data-proof="authored" data-by="ai:claude">File-based task tracking with status/priority naming</span> |

### <span data-proof="authored" data-by="ai:claude">Tooling Skills</span>

| <span data-proof="authored" data-by="ai:claude">Skill</span>                 | <span data-proof="authored" data-by="ai:claude">Use When</span>                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`git-worktree`</span>        | <span data-proof="authored" data-by="ai:claude">Isolated parallel development branches</span>        |
| <span data-proof="authored" data-by="ai:claude">`create-agent-skills`</span> | <span data-proof="authored" data-by="ai:claude">Creating new agents and skills for the plugin</span> |

***

## <span data-proof="authored" data-by="ai:claude">Knowledge System</span>

<span data-proof="authored" data-by="ai:claude">Learnings are captured in</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span> <span data-proof="authored" data-by="ai:claude">with YAML frontmatter and organized by category:</span>

```
docs/solutions/
├── governor-limit-issues/   # Limit handling patterns
├── deployment-issues/       # CI/CD and deployment fixes
├── test-failures/           # Test troubleshooting guides
├── security-issues/         # Security implementations
├── integration-issues/      # External system patterns
├── flow-issues/             # Automation solutions
├── lwc-issues/              # Component solutions
├── data-model-issues/       # Schema design decisions
├── best-practices/          # Proven patterns and approaches
└── patterns/                # Reusable code patterns
```

<span data-proof="authored" data-by="ai:claude">The</span> <span data-proof="authored" data-by="ai:claude">`sf-learnings-researcher`</span> <span data-proof="authored" data-by="ai:claude">agent searches these documents by frontmatter metadata before every plan and implementation phase to surface relevant institutional knowledge.</span>

***

## <span data-proof="authored" data-by="ai:claude">Project Structure</span>

```
sf-compound-engineering-plugin/
├── .claude-plugin/
│   ├── plugin.json           # Plugin manifest (v2.0.0)
│   └── marketplace.json      # Marketplace loader schema
├── .mcp.json                 # Context7 MCP server config
├── schema.yaml               # YAML validation for docs/solutions/
├── CLAUDE.md                 # Project context and protected artifacts
├── hooks/
│   └── hooks.json            # Pre/post tool-use hooks
├── cli/                      # Multi-tool installer CLI
│   ├── package.json           # @sangameshgupta/sf-compound-plugin
│   ├── src/
│   │   ├── index.ts           # CLI entry (citty)
│   │   ├── parser/            # Plugin reader + markdown parser
│   │   ├── converters/        # 11 platform converters
│   │   ├── transforms/        # Path, reference, frontmatter rewriting
│   │   └── utils/             # Auto-detect, merge helpers
│   └── tests/
├── commands/                 # 7 slash commands
│   ├── sf-brainstorm.md
│   ├── sf-plan.md
│   ├── sf-deepen.md
│   ├── sf-work.md
│   ├── sf-review.md
│   ├── sf-compound.md
│   └── sf-lfg.md
├── agents/                   # 33 agents
│   ├── index.md              # Agent routing map
│   ├── apex/                 # 6 Apex agents
│   ├── lwc/                  # 5 LWC agents
│   ├── automation/           # 4 Flow/automation agents
│   ├── integration/          # 4 integration agents
│   ├── architecture/         # 4 architecture agents
│   ├── research/             # 5 research agents
│   └── workflow/             # 5 workflow agents
├── skills/                   # 12 skills
│   ├── index.md              # Skill routing map
│   ├── governor-limits/
│   ├── apex-patterns/
│   ├── flow-patterns/
│   ├── lwc-patterns/
│   ├── security-guide/
│   ├── integration-patterns/
│   ├── test-factory/
│   ├── sf-cli/
│   ├── compound-docs/
│   ├── git-worktree/
│   ├── create-agent-skills/
│   └── file-todos/
└── docs/
    ├── brainstorms/          # Brainstorm outputs
    ├── plans/                # Feature plans
    └── solutions/            # Institutional knowledge (10 categories)
```

***

## <span data-proof="authored" data-by="ai:claude">MCP Integration</span>

<span data-proof="suggestion" data-id="m1775681196339_10" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">The plugin includes a Context7 MCP server for live framework documentation lookup:</span></span>

```json proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MzcsImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19LHsidHlwZSI6InByb29mU3VnZ2VzdGlvbiIsImZyb20iOjM3LCJ0byI6MTMzLCJhdHRycyI6eyJpZCI6Im0xNzc1NjgxMTk2MzM0XzkiLCJraW5kIjoiaW5zZXJ0IiwiYnkiOiJhaTpjbGF1ZGUiLCJjb250ZW50IjoiXG4gICAgICBcInR5cGVcIjogXCJodHRwXCIsXG4gICAgICBcInVybFwiOiBcImh0dHBzOi8vbWNwLmNvbnRleHQ3LmNvbS9tY3BcIlxuICAgIH0sXG4gICAgXCJzYWxlc2ZvcmNlLWR4XCI6IHsiLCJzdGF0dXMiOiJwZW5kaW5nIiwiY3JlYXRlZEF0IjoiMjAyNi0wNC0wOFQyMDo0NjozNi4zMzRaIiwicnVuSWQiOm51bGwsImZvY3VzQXJlYUlkIjpudWxsLCJmb2N1c0FyZWFOYW1lIjpudWxsLCJhZ2VudElkIjpudWxsLCJwcm9wb3NhbElkIjpudWxsLCJwcm92aXNpb25hbCI6bnVsbCwib3JjaGVzdHJhdG9yIjpudWxsLCJkZWJ1Z0F1dG9GaXhlZFF1b3RlcyI6bnVsbCwiZGVidWdBdXRvRml4ZWRRdW90ZXNSZWFzb24iOm51bGx9fSx7InR5cGUiOiJwcm9vZlN1Z2dlc3Rpb24iLCJmcm9tIjoyMjIsInRvIjo4MjksImF0dHJzIjp7ImlkIjoibTE3NzU2ODExOTYzMjlfOCIsImtpbmQiOiJpbnNlcnQiLCJieSI6ImFpOmNsYXVkZSIsImNvbnRlbnQiOiJcblNhbGVzZm9yY2UgRFggTUNQIHRvb2xzZXRzIChhbGwgZW5hYmxlZCk6XG5Ub29sc2V0XG5DYXBhYmlsaXR5XG5jb3JlXG5CYXNlIERYIHRvb2xzIChhbHdheXMgb24pXG5vcmdzXG5NYW5hZ2UgYXV0aG9yaXplZCBvcmdzXG5tZXRhZGF0YVxuRGVwbG95L3JldHJpZXZlIG1ldGFkYXRhXG5kYXRhXG5TT1FMIHF1ZXJpZXMsIHJlY29yZCBtYW5hZ2VtZW50XG51c2Vyc1xuUGVybWlzc2lvbiBzZXRzLCB1c2VyIG1hbmFnZW1lbnRcbmNvZGUtYW5hbHlzaXNcblN0YXRpYyBhbmFseXNpcyB2aWEgQ29kZSBBbmFseXplclxubHdjLWV4cGVydHNcbkxXQyBkZXZlbG9wbWVudCwgdGVzdGluZywgb3B0aW1pemF0aW9uXG5hdXJhLWV4cGVydHNcbkF1cmEgYW5hbHlzaXMsIExXQyBtaWdyYXRpb25cbmV4cGVydHMtdmFsaWRhdGlvblxuTFdDIHByb2R1Y3Rpb24gcmVhZGluZXNzIGNoZWNrc1xuZGV2b3BzXG5EZXZPcHMgQ2VudGVyIG9wZXJhdGlvbnNcbmVucmljaG1lbnRcbk1ldGFkYXRhIGNvbXBvbmVudCBlbnJpY2htZW50XG5tb2JpbGVcbk1vYmlsZSBkZXZlbG9wbWVudCB0b29sc1xudGVzdGluZ1xuQXBleCBhbmQgYWdlbnQgdGVzdCBleGVjdXRpb25cbnNjYWxlLXByb2R1Y3RzXG5BcGV4IHBlcmZvcm1hbmNlIGRldGVjdGlvbiIsInN0YXR1cyI6InBlbmRpbmciLCJjcmVhdGVkQXQiOiIyMDI2LTA0LTA4VDIwOjQ2OjM2LjMyOVoiLCJydW5JZCI6bnVsbCwiZm9jdXNBcmVhSWQiOm51bGwsImZvY3VzQXJlYU5hbWUiOm51bGwsImFnZW50SWQiOm51bGwsInByb3Bvc2FsSWQiOm51bGwsInByb3Zpc2lvbmFsIjpudWxsLCJvcmNoZXN0cmF0b3IiOm51bGwsImRlYnVnQXV0b0ZpeGVkUXVvdGVzIjpudWxsLCJkZWJ1Z0F1dG9GaXhlZFF1b3Rlc1JlYXNvbiI6bnVsbH19XQ==
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "salesforce-dx": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
Salesforce DX MCP toolsets (all enabled):
Toolset
Capability
core
Base DX tools (always on)
orgs
Manage authorized orgs
metadata
Deploy/retrieve metadata
data
SOQL queries, record management
users
Permission sets, user management
code-analysis
Static analysis via Code Analyzer
lwc-experts
LWC development, testing, optimization
aura-experts
Aura analysis, LWC migration
experts-validation
LWC production readiness checks
devops
DevOps Center operations
enrichment
Metadata component enrichment
mobile
Mobile development tools
testing
Apex and agent test execution
scale-products
Apex performance detection
```

<span data-proof="authored" data-by="ai:claude">Research agents use Context7 as the second tier (after local skills) before falling back to web search.</span><span data-proof="suggestion" data-id="m1775681196325_7" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">
Prerequisites for Salesforce DX MCP: Authorize an org first with sf org login web. The server uses DEFAULT_TARGET_ORG — whatever you set with sf config set target-org.</span></span>

***

## <span data-proof="authored" data-by="ai:claude">Requirements</span>

* <span data-proof="authored" data-by="ai:claude">Claude Code</span><span data-proof="suggestion" data-id="m1775681196320_6" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">
  Node.js (for MCP servers)</span></span>

* <span data-proof="authored" data-by="ai:claude">Git (recommended)</span>

* <span data-proof="suggestion" data-id="m1775681196313_5" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">Node.js (for Context7 MCP server)</span></span>

***

## <span data-proof="authored" data-by="ai:claude">Contributing</span>

<span data-proof="authored" data-by="ai:claude">Contributions welcome! Key areas:</span>

* <span data-proof="authored" data-by="ai:claude">Add new agents for specialized reviews</span>

* <span data-proof="authored" data-by="ai:claude">Expand skills with more patterns</span>

* <span data-proof="authored" data-by="ai:claude">Improve index files for better routing</span>

* <span data-proof="authored" data-by="ai:claude">Add solution documents to</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span>

<span data-proof="authored" data-by="ai:claude">See</span> <span data-proof="authored" data-by="ai:claude">`skills/create-agent-skills/SKILL.md`</span> <span data-proof="authored" data-by="ai:claude">for agent/skill authoring guidance.</span>

***

## <span data-proof="authored" data-by="ai:claude">License</span>

<span data-proof="authored" data-by="ai:claude">MIT License</span>

***

## <span data-proof="authored" data-by="ai:claude">Credits</span>

* <span data-proof="authored" data-by="ai:claude">Built for the Salesforce developer community</span>

* <span data-proof="authored" data-by="ai:claude">Inspired by</span> [<span data-proof="authored" data-by="ai:claude">EveryInc's Compound Engineering Plugin</span>](https://github.com/EveryInc/compound-engineering-plugin)

* <span data-proof="authored" data-by="ai:claude">Inspired by</span> [<span data-proof="authored" data-by="ai:claude">GitHub Spec-Kit</span>](https://github.com/github/spec-kit)

* <span data-proof="authored" data-by="ai:claude">Powered by Claude Code</span>

<!-- PROOF
{
  "version": 2,
  "marks": {
    "m1776337325799_49": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.799Z",
      "range": {
        "from": 3698,
        "to": 3851
      },
      "content": "35 specialized agents across 7 categories\n16 skills with Salesforce domain knowledge (including Agentforce, Hosted MCP, and tool building)\nMCP integration with Context7 for framework docs + Salesforce DX for live org operations (60+ tools)",
      "status": "pending"
    },
    "m1776337325773_48": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.773Z",
      "range": {
        "from": 4314,
        "to": 4398
      },
      "content": "Classifications: APEX, AUTOMATION, LWC, INTEGRATION, HOSTED MCP, AGENTFORCE SCRIPT BUILDER, AGENTFORCE PROMPT BUILDER, ARCHITECTURE, WORKFLOW, TOOLING",
      "status": "pending"
    },
    "m1776337325760_47": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.760Z",
      "range": {
        "from": 5311,
        "to": 5332
      },
      "content": "35 Agents by Category",
      "status": "pending"
    },
    "m1776337325739_46": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.739Z",
      "range": {
        "from": 6378,
        "to": 6400
      },
      "content": "Integration (6 agents)",
      "status": "pending"
    },
    "m1776337276974_8": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:01:16.974Z",
      "range": {
        "from": 6678,
        "to": 6842
      },
      "content": "\nMCP Server Config Reviewer\nHosted MCP setup, ECA configuration, OAuth scopes\nMCP Tool Builder\nCustom MCP tool code quality, @InvocableMethod patterns, descriptions",
      "status": "pending"
    },
    "m1776337325714_45": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.714Z",
      "range": {
        "from": 8038,
        "to": 8047
      },
      "content": "16 Skills",
      "status": "pending"
    },
    "m1776337295765_13": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:01:35.765Z",
      "range": {
        "from": 8571,
        "to": 9083
      },
      "content": "\nAgentforce Skills\nSkill\nScope\nUse When\nagent-script\nAgentforce Script Builder\nBuilding Agentforce agents — syntax, blocks, variables, patterns\nprompt-builder\nAgentforce Prompt Builder\nPrompt templates — metadata XML, merge fields, grounding, deployment\nHosted MCP Skills\nSkill\nScope\nUse When\nhosted-mcp-servers\nHosted MCP\nSetup, ECA configuration, URL patterns, security model, troubleshooting\nmcp-tool-builder\nHosted MCP\nBuilding custom MCP tools — Apex @InvocableMethod, Flows, Named Queries, prompt templates",
      "status": "pending"
    },
    "m1776337325686_44": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.686Z",
      "range": {
        "from": 11460,
        "to": 11501
      },
      "content": "├── agents/                   # 35 agents",
      "status": "pending"
    },
    "m1776337325659_43": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.659Z",
      "range": {
        "from": 11700,
        "to": 11752
      },
      "content": "│   ├── integration/          # 6 integration agents",
      "status": "pending"
    },
    "m1776337325630_42": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.630Z",
      "range": {
        "from": 11907,
        "to": 11948
      },
      "content": "├── skills/                   # 16 skills",
      "status": "pending"
    },
    "m1776337307655_32": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:01:47.655Z",
      "range": {
        "from": 12167,
        "to": 12449
      },
      "content": "\n│   ├── agent-script/         # Agentforce Agent Script language\n│   ├── prompt-builder/       # Prompt Builder templates & metadata XML\n│   ├── hosted-mcp-servers/   # Salesforce Hosted MCP Server setup & config\n│   ├── mcp-tool-builder/     # Custom MCP tool development patterns",
      "status": "pending"
    },
    "m1775681196339_10": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:00:40.311Z",
      "range": {
        "from": 12758,
        "to": 12840
      },
      "content": "The plugin includes a Context7 MCP server for live framework documentation lookup:",
      "status": "pending"
    },
    "m1775681196334_9": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-08T20:46:36.334Z",
      "range": {
        "from": 12879,
        "to": 12975
      },
      "content": "\n      \"type\": \"http\",\n      \"url\": \"https://mcp.context7.com/mcp\"\n    },\n    \"salesforce-dx\": {",
      "status": "pending"
    },
    "m1775681196329_8": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-08T20:46:36.329Z",
      "range": {
        "from": 13064,
        "to": 13671
      },
      "content": "\nSalesforce DX MCP toolsets (all enabled):\nToolset\nCapability\ncore\nBase DX tools (always on)\norgs\nManage authorized orgs\nmetadata\nDeploy/retrieve metadata\ndata\nSOQL queries, record management\nusers\nPermission sets, user management\ncode-analysis\nStatic analysis via Code Analyzer\nlwc-experts\nLWC development, testing, optimization\naura-experts\nAura analysis, LWC migration\nexperts-validation\nLWC production readiness checks\ndevops\nDevOps Center operations\nenrichment\nMetadata component enrichment\nmobile\nMobile development tools\ntesting\nApex and agent test execution\nscale-products\nApex performance detection",
      "status": "pending"
    },
    "m1775681196325_7": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-08T20:46:36.325Z",
      "range": {
        "from": 13777,
        "to": 13944
      },
      "content": "\nPrerequisites for Salesforce DX MCP: Authorize an org first with sf org login web. The server uses DEFAULT_TARGET_ORG — whatever you set with sf config set target-org.",
      "status": "pending"
    },
    "m1776337325595_41": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:02:05.595Z",
      "range": {
        "from": 13944,
        "to": 14735
      },
      "content": "\nSalesforce Hosted MCP Servers (GA April 2026)\nThe plugin also provides comprehensive guidance for Salesforce's cloud-hosted MCP infrastructure — a separate capability from the DX MCP server above. Hosted MCP Servers let AI clients (Claude, ChatGPT, Cursor) access Salesforce data directly via OAuth.\nWhat\nSkill\nPurpose\nSetup & Config\nhosted-mcp-servers\nECA setup, URL patterns, OAuth scopes, security model, troubleshooting\nTool Development\nmcp-tool-builder\nBuilding custom MCP tools with Apex @InvocableMethod, Flows, Named Queries\nAvailable standard servers: platform/sobject-reads, platform/sobject-all, tableau-next, data-cloud-sql, plus custom servers.\nNote: Hosted MCP Servers are configured per-org in Setup (not in .mcp.json). See the skills for full setup and development guidance.",
      "status": "pending"
    },
    "m1775681196320_6": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-08T20:46:36.320Z",
      "range": {
        "from": 14766,
        "to": 14791
      },
      "content": "\nNode.js (for MCP servers)",
      "status": "pending"
    },
    "m1775681196313_5": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T11:00:40.311Z",
      "range": {
        "from": 14816,
        "to": 14849
      },
      "content": "Node.js (for Context7 MCP server)",
      "status": "pending"
    }
  }
}
-->

<!-- PROOF:END -->
