# SF Compound Engineering Plugin

## Project Overview

Salesforce-focused compound engineering plugin for Claude Code, Cursor, and Codex. V3 skills-first architecture with parallel agent dispatch, institutional knowledge compounding, and a full Salesforce development lifecycle (Apex, LWC, Flow, Integration, metadata, deploy).

The plugin's architecture is skills-first: skills are the user-facing entry points, agents dispatch in parallel via the Task tool, and institutional knowledge accumulates under `docs/solutions/`. Multi-platform manifests ship for Claude Code, Cursor, and Codex.

## Architecture

- **Skills** (`skills/<name>/SKILL.md`) — User-facing entry points. Auto-route from natural-language phrases via `description` frontmatter; direct invocation via `/sf-<name>` also works. Includes the seven core workflow skills (`sf-brainstorm`, `sf-plan`, `sf-deepen`, `sf-work`, `sf-review`, `sf-compound`, `sf-lfg`) and Salesforce domain knowledge skills (governor-limits, apex-patterns, lwc-patterns, etc.).
- **Agents** (`agents/<name>.agent.md`, flat) — Specialized review/research/workflow personas dispatched in parallel via the Task tool. Topical groupings (Apex / LWC / Flow / Integration / Architecture / Research / Workflow) are documentation aids, not filesystem paths.
- **Knowledge** (`docs/solutions/`) — Institutional knowledge with YAML frontmatter validated against `schema.yaml`. Searched by `sf-learnings-researcher`.
- **Multi-platform manifests** — `.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/` carry per-platform plugin metadata.

There is no `commands/` directory in V3. Skills replaced commands cleanly.

## Workflow

```
/sf-brainstorm → /sf-plan → /sf-deepen → /sf-work → /sf-review → /sf-compound
                                    └── /sf-lfg (full autonomous pipeline) ──┘
```

All seven entry points are skills (under `skills/`), not commands. The harness routes natural-language phrases to the right skill via the skill's `description` frontmatter.

## Protected Artifacts

**NEVER delete or overwrite these directories or their contents:**

- `docs/plans/` — Plan documents are permanent project records
- `docs/solutions/` — Institutional knowledge is cumulative and must never be lost
- `docs/brainstorms/` — Brainstorm records provide context for decisions

These directories contain the compounded knowledge of the project. Deleting them destroys institutional memory. If content needs correction, **edit** existing files rather than deleting them. If content is obsolete, add a `status: deprecated` field to the YAML frontmatter.

## Conventions

- **Agent files** use V3 frontmatter: `name`, `description`, `model`, `tools`, `color`. The `scope` field has been retired. Filenames use the `<name>.agent.md` suffix.
- **Skill files** use V3 frontmatter: `name`, `description`, `argument-hint`. `description` enumerates Salesforce-flavored trigger phrases for auto-routing. Each skill lives under `skills/<name>/SKILL.md`.
- **Solution documents** (`docs/solutions/`) use YAML frontmatter validated against `schema.yaml`.
- **Skills dispatch agents** in parallel using the Task tool. The seven core workflow skills (`sf-review`, `sf-doc-review`, `sf-work`, etc.) wire up parallel persona dispatch internally.
- **Model selection**: research agents use `model: haiku` for speed (`sf-learnings-researcher`); deep-analysis agents use `model: sonnet` (`sf-spec-flow-analyzer`); review and workflow agents default to `model: inherit`.
- **Tool sets**: review/research agents get `Read, Grep, Glob, Bash`; workflow agents that may write files (`sf-bug-reproduction-validator`, `sf-pr-comment-resolver`, `sf-deployment-verification-agent`, `sf-mcp-tool-builder-agent`) get the full `Read, Edit, Write, Grep, Glob, Bash`.
- **File names** use kebab-case with date prefixes for time-ordered documents (`docs/plans/YYYY-MM-DD-NNN-<type>-<name>-plan.md`).
- **`sf-` prefix** is the Salesforce namespace, used for every agent and skill in this plugin.

## MCP Servers

- **Context7**: Framework documentation via `@upstash/context7-mcp`. Configured in `.claude-plugin/plugin.json` and `.mcp.json`.
- **Salesforce DX**: Live org operations via `@salesforce/mcp` (60+ tools — SOQL, deploy, retrieve, code analysis, LWC experts, testing). Configured in `.mcp.json`.
- **Hosted MCP Servers**: Salesforce's cloud-managed MCP infrastructure (GA April 2026). Not configured in `.mcp.json` — this is per-org setup. See `hosted-mcp-servers` and `mcp-tool-builder` skills for setup and development guidance.

### Hosted MCP Key Gotchas (From Real Testing)

1. **`global` not `public`** — MCP tools require `global` access modifier on class, method, AND all inner classes. `public` silently hides the tool.
2. **Flow data providers break MCP** — `templateDataProviders` with `flow://` causes "Failed to attach prompt" in Claude. Remove for MCP templates.
3. **Claude ignores template formatting** — Prompt templates are passive in MCP. Pre-format output server-side or include EXAMPLE OUTPUT in template.
4. **Template type** — Use `einstein_gpt__global` for MCP (not `FlexTemplate` which the API rejects). Use `einstein_gpt__flex` for Agentforce.
5. **Input definitions** — Use `primitive://String` for text inputs (undocumented — discovered from standard templates). Use `SOBJECT://ObjectName` for records.
6. **API 66.0 changes** — Omit `activeVersion` (removed) and `versionIdentifier` (let platform auto-generate).
7. **Dual architecture** — Same Apex can serve both MCP and Agentforce but needs separate templates and wiring. Share the service layer.
8. **Accept both IDs and names** — AI clients pass Case Numbers, not Salesforce IDs. Tools should detect format and query accordingly.

## Key Files

| File                              | Purpose                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `agents/index.md`                 | Agent index — flat `sf-*.agent.md` listing organized by topical concern                          |
| `skills/index.md`                 | Skill index — core workflow skills, domain knowledge skills, V3 capability skills                |
| `.claude-plugin/plugin.json`      | Claude Code manifest with `mcpServers` (Context7)                                                |
| `.cursor-plugin/plugin.json`      | Cursor manifest                                                                                  |
| `.codex-plugin/plugin.json`       | Codex manifest with `skills` path and `interface` metadata                                       |
| `.claude-plugin/marketplace.json` | Marketplace catalog entry                                                                        |
| `.mcp.json`                       | Project-level MCP server configuration (Context7 + Salesforce DX)                                |
| `schema.yaml`                     | YAML frontmatter validation schema for solution documents                                        |
| `docs/plans/`                     | Implementation plans (protected — see "Protected Artifacts" above)                               |
| `docs/solutions/`                 | Institutional knowledge (protected — see "Protected Artifacts" above)                            |
| `docs/brainstorms/`               | Pre-planning exploration records (protected — see "Protected Artifacts" above)                   |

## Component Counts (v3.0.0-beta.1)

- **Skills**: 45 (7 core workflow + 11 Salesforce domain knowledge + 5 workflow support + 22 V3 capability skills).
- **Agents**: 59 (6 Apex + 4 Flow + 5 LWC + 6 Integration + 4 Architecture + 5 Research + 5 Workflow + 24 V3 review/research personas).
- **Commands**: 0 (removed in V3 migration; replaced by skills).
- **Manifests**: 3 (Claude / Cursor / Codex).
- **MCP Servers**: 2 (Context7, Salesforce DX).
