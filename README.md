# <span data-proof="authored" data-by="ai:claude">SF Compound Engineering Plugin v2.0.0</span>

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

| Platform | Commands | Agents | Skills | MCP Config |
|----------|----------|--------|--------|------------|
| **Copilot** | `.github/skills/` | `.github/agents/*.agent.md` | `.github/skills/` | `copilot-mcp-config.json` |
| **Cursor** | Sync only | Sync only | `.cursor/skills/` (symlinks) | `.cursor/mcp.json` |
| **Windsurf** | `workflows/*.md` | `skills/*/SKILL.md` | `skills/` | `mcp_config.json` |
| **Gemini** | `.gemini/commands/*.toml` | `.gemini/skills/` | `.gemini/skills/` | `settings.json` |
| **OpenCode** | `commands/*.md` | `agents/*.md` | `skills/` | `opencode.json` |
| **Codex** | `prompts/*.md` + `skills/` | `skills/*/SKILL.md` | `skills/` | `config.toml` |
| **Kiro** | `.kiro/skills/` | `.kiro/agents/*.json` + prompts | `.kiro/skills/` | `mcp.json` |
| **Droid** | `commands/*.md` | `agents/*.md` | `skills/` | `mcp.json` |
| **Pi** | `prompts/*.md` | `skills/*/SKILL.md` | `skills/` | `mcp.json` |
| **OpenClaw** | `commands/*.md` | `agents/*.md` | `skills/` | TS entry point |
| **Qwen** | `commands/*.md` | `agents/*.yaml` | `skills/` | N/A |

The plugin provides:

* **7 slash commands** for the full compound engineering workflow

* **33 specialized agents** across 7 categories

* **12 skills** with Salesforce domain knowledge

* **MCP integration** with Context7 for live framework documentation

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

<span data-proof="authored" data-by="ai:claude">Classifications:</span> <span data-proof="authored" data-by="ai:claude">`APEX`,</span> <span data-proof="authored" data-by="ai:claude">`AUTOMATION`,</span> <span data-proof="authored" data-by="ai:claude">`LWC`,</span> <span data-proof="authored" data-by="ai:claude">`INTEGRATION`,</span> <span data-proof="authored" data-by="ai:claude">`ARCHITECTURE`,</span> <span data-proof="authored" data-by="ai:claude">`WORKFLOW`,</span> <span data-proof="authored" data-by="ai:claude">`TOOLING`</span>

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

## <span data-proof="authored" data-by="ai:claude">33 Agents by Category</span>

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

### <span data-proof="authored" data-by="ai:claude">Integration (4 agents)</span>

| <span data-proof="authored" data-by="ai:claude">Agent</span>                         | <span data-proof="authored" data-by="ai:claude">Checks For</span>                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">REST API Architect</span>            | <span data-proof="authored" data-by="ai:claude">Endpoint design, versioning</span>      |
| <span data-proof="authored" data-by="ai:claude">Callout Pattern Reviewer</span>      | <span data-proof="authored" data-by="ai:claude">Named Credentials, retry logic</span>   |
| <span data-proof="authored" data-by="ai:claude">Platform Event Strategist</span>     | <span data-proof="authored" data-by="ai:claude">Event design, replay handling</span>    |
| <span data-proof="authored" data-by="ai:claude">Integration Security Sentinel</span> | <span data-proof="authored" data-by="ai:claude">Auth, certificates, data transit</span> |

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

## <span data-proof="authored" data-by="ai:claude">12 Skills</span>

### <span data-proof="authored" data-by="ai:claude">Domain Skills</span>

| <span data-proof="authored" data-by="ai:claude">Skill</span>                  | <span data-proof="authored" data-by="ai:claude">Scope</span>            | <span data-proof="authored" data-by="ai:claude">Use When</span>                          |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`governor-limits`</span>      | <span data-proof="authored" data-by="ai:claude">Universal</span>        | <span data-proof="authored" data-by="ai:claude">Any Apex, Flow, or trigger work</span>   |
| <span data-proof="authored" data-by="ai:claude">`apex-patterns`</span>        | <span data-proof="authored" data-by="ai:claude">Apex only</span>        | <span data-proof="authored" data-by="ai:claude">Apex classes, triggers, services</span>  |
| <span data-proof="authored" data-by="ai:claude">`flow-patterns`</span>        | <span data-proof="authored" data-by="ai:claude">Automation only</span>  | <span data-proof="authored" data-by="ai:claude">Building any type of Flow</span>         |
| <span data-proof="authored" data-by="ai:claude">`lwc-patterns`</span>         | <span data-proof="authored" data-by="ai:claude">LWC only</span>         | <span data-proof="authored" data-by="ai:claude">Lightning Web Components</span>          |
| <span data-proof="authored" data-by="ai:claude">`security-guide`</span>       | <span data-proof="authored" data-by="ai:claude">Universal</span>        | <span data-proof="authored" data-by="ai:claude">CRUD/FLS, sharing, permissions</span>    |
| <span data-proof="authored" data-by="ai:claude">`integration-patterns`</span> | <span data-proof="authored" data-by="ai:claude">Integration only</span> | <span data-proof="authored" data-by="ai:claude">Callouts, APIs, Platform Events</span>   |
| <span data-proof="authored" data-by="ai:claude">`test-factory`</span>         | <span data-proof="authored" data-by="ai:claude">Apex only</span>        | <span data-proof="authored" data-by="ai:claude">Test classes, test data factories</span> |

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

<span data-proof="authored" data-by="ai:claude">The plugin includes a Context7 MCP server for live framework documentation lookup:</span>

```json proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MTI2LCJhdHRycyI6eyJieSI6ImFpOmNsYXVkZSJ9fV0=
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

<span data-proof="authored" data-by="ai:claude">Research agents use Context7 as the second tier (after local skills) before falling back to web search.</span>

***

## <span data-proof="authored" data-by="ai:claude">Requirements</span>

* <span data-proof="authored" data-by="ai:claude">Claude Code</span>

* <span data-proof="authored" data-by="ai:claude">Git (recommended)</span>

* <span data-proof="authored" data-by="ai:claude">Node.js (for Context7 MCP server)</span>

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