# <span data-proof="authored" data-by="ai:claude">SF Compound Engineering Plugin</span>

## <span data-proof="authored" data-by="ai:claude">Project Overview</span>

<span data-proof="authored" data-by="ai:claude">Salesforce-focused compound engineering workflow plugin for Claude Code. Provides parallel agent dispatch, institutional knowledge compounding, and a full development lifecycle pipeline.</span>

## <span data-proof="authored" data-by="ai:claude">Architecture</span>

* **<span data-proof="authored" data-by="ai:claude">Agents</span>** (35): <span data-proof="authored" data-by="ai:claude">`agents/{category}/`</span> <span data-proof="authored" data-by="ai:claude">— Review, research, and workflow agents dispatched in parallel</span>

* **<span data-proof="authored" data-by="ai:claude">Commands</span>** <span data-proof="authored" data-by="ai:claude">(7):</span> <span data-proof="authored" data-by="ai:claude">`commands/sf-*.md`</span> <span data-proof="authored" data-by="ai:claude">— Workflow commands (brainstorm, plan, deepen, work, review, compound, lfg)</span>

* **<span data-proof="suggestion" data-id="m1776327085868_3" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">Skills</span></span>**<span data-proof="suggestion" data-id="m1776327085868_3" data-by="ai:claude" data-kind="replace"></span> <span data-proof="suggestion" data-id="m1776327085868_3" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">(14):</span></span> <span data-proof="suggestion" data-id="m1776327085868_3" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">`skills/*/SKILL.md`</span></span> <span data-proof="suggestion" data-id="m1776327085868_3" data-by="ai:claude" data-kind="replace"><span data-proof="authored" data-by="ai:claude">— Domain knowledge reference</span></span>

* **<span data-proof="authored" data-by="ai:claude">Knowledge</span>**<span data-proof="authored" data-by="ai:claude">:</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span> <span data-proof="authored" data-by="ai:claude">— Institutional knowledge with YAML frontmatter</span>

## <span data-proof="authored" data-by="ai:claude">Workflow</span>

```
/sf-brainstorm → /sf-plan → /sf-deepen → /sf-work → /sf-review → /sf-compound
                                    └── /sf-lfg (full autonomous pipeline) ──┘
```

## <span data-proof="authored" data-by="ai:claude">Protected Artifacts</span>

**<span data-proof="authored" data-by="ai:claude">NEVER delete or overwrite these directories or their contents:</span>**

* <span data-proof="authored" data-by="ai:claude">`docs/plans/`</span> <span data-proof="authored" data-by="ai:claude">— Plan documents are permanent project records</span>

* <span data-proof="authored" data-by="ai:claude">`docs/solutions/`</span> <span data-proof="authored" data-by="ai:claude">— Institutional knowledge is cumulative and must never be lost</span>

* <span data-proof="authored" data-by="ai:claude">`docs/brainstorms/`</span> <span data-proof="authored" data-by="ai:claude">— Brainstorm records provide context for decisions</span>

<span data-proof="authored" data-by="ai:claude">These directories contain the compounded knowledge of the project. Deleting them destroys institutional memory. If content needs correction,</span> **<span data-proof="authored" data-by="ai:claude">edit</span>** <span data-proof="authored" data-by="ai:claude">existing files rather than deleting them. If content is obsolete, add a</span> <span data-proof="authored" data-by="ai:claude">`status: deprecated`</span> <span data-proof="authored" data-by="ai:claude">field to the YAML frontmatter.</span>

## <span data-proof="authored" data-by="ai:claude">Conventions</span>

* <span data-proof="authored" data-by="ai:claude">Agent files use YAML frontmatter with</span> <span data-proof="authored" data-by="ai:claude">`name`,</span> <span data-proof="authored" data-by="ai:claude">`description`,</span> <span data-proof="authored" data-by="ai:claude">`model`,</span> <span data-proof="authored" data-by="ai:claude">`scope`</span>

* <span data-proof="authored" data-by="ai:claude">Solution documents use YAML frontmatter validated against</span> <span data-proof="authored" data-by="ai:claude">`schema.yaml`</span>

* <span data-proof="authored" data-by="ai:claude">Commands use</span> <span data-proof="authored" data-by="ai:claude">`Task`</span> <span data-proof="authored" data-by="ai:claude">syntax for parallel agent dispatch</span>

* <span data-proof="authored" data-by="ai:claude">Research agents use</span> <span data-proof="authored" data-by="ai:claude">`model: haiku`</span> <span data-proof="authored" data-by="ai:claude">for speed,</span> <span data-proof="authored" data-by="ai:claude">`model: sonnet`</span> <span data-proof="authored" data-by="ai:claude">for depth</span>

* <span data-proof="authored" data-by="ai:claude">File names use kebab-case with date prefixes for time-ordered documents</span>

* <span data-proof="authored" data-by="ai:claude">Salesforce-specific agents in research/workflow categories are prefixed with</span> <span data-proof="authored" data-by="ai:claude">`sf-`</span>

## <span data-proof="authored" data-by="ai:claude">MCP Servers</span>

* **<span data-proof="authored" data-by="ai:claude">Context7</span>**<span data-proof="authored" data-by="ai:claude">: Framework documentation via</span> <span data-proof="authored" data-by="ai:claude">`@upstash/context7-mcp`</span><span data-proof="suggestion" data-id="m1775681235127_1" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">`
  Salesforce DX: Live org operations via @salesforce/mcp (60+ tools — SOQL, deploy, retrieve, code analysis, LWC experts, testing)`</span></span><span data-proof="suggestion" data-id="m1776327085865_2" data-by="ai:claude" data-kind="insert"><span data-proof="authored" data-by="ai:claude">`
  Hosted MCP Servers: Salesforce's cloud-managed MCP infrastructure (GA April 2026). Not configured in .mcp.json — this is per-org setup. See hosted-mcp-servers and mcp-tool-builder skills for setup and development guidance.`</span></span>

## <span data-proof="authored" data-by="ai:claude">Key Files</span>

| <span data-proof="authored" data-by="ai:claude">File</span>                         | <span data-proof="authored" data-by="ai:claude">Purpose</span>                                                        |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <span data-proof="authored" data-by="ai:claude">`agents/index.md`</span>            | <span data-proof="authored" data-by="ai:claude">Agent routing table — maps classifications to agent categories</span> |
| <span data-proof="authored" data-by="ai:claude">`skills/index.md`</span>            | <span data-proof="authored" data-by="ai:claude">Skill routing table — maps classifications to skills</span>           |
| <span data-proof="authored" data-by="ai:claude">`.claude-plugin/plugin.json`</span> | <span data-proof="authored" data-by="ai:claude">Plugin manifest with component counts</span>                          |
| <span data-proof="authored" data-by="ai:claude">`.mcp.json`</span>                  | <span data-proof="authored" data-by="ai:claude">MCP server configuration</span>                                       |
| <span data-proof="authored" data-by="ai:claude">`schema.yaml`</span>                | <span data-proof="authored" data-by="ai:claude">YAML frontmatter validation schema for solution documents</span>      |
| <span data-proof="authored" data-by="ai:claude">`hooks/hooks.json`</span>           | <span data-proof="authored" data-by="ai:claude">Lifecycle hook configuration</span>                                   |

<!-- PROOF
{
  "version": 2,
  "marks": {
    "m1776327085868_3": {
      "kind": "replace",
      "by": "ai:claude",
      "createdAt": "2026-04-16T08:11:25.868Z",
      "range": {
        "from": 463,
        "to": 522
      },
      "content": "Skills (16): skills/*/SKILL.md — Domain knowledge reference",
      "status": "pending"
    },
    "m1775681235127_1": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-08T20:47:15.127Z",
      "range": {
        "from": 1865,
        "to": 1994
      },
      "content": "\nSalesforce DX: Live org operations via @salesforce/mcp (60+ tools — SOQL, deploy, retrieve, code analysis, LWC experts, testing)",
      "status": "pending"
    },
    "m1776327085865_2": {
      "kind": "insert",
      "by": "ai:claude",
      "createdAt": "2026-04-16T08:11:25.865Z",
      "range": {
        "from": 1994,
        "to": 2217
      },
      "content": "\nHosted MCP Servers: Salesforce's cloud-managed MCP infrastructure (GA April 2026). Not configured in .mcp.json — this is per-org setup. See hosted-mcp-servers and mcp-tool-builder skills for setup and development guidance.",
      "status": "pending"
    }
  }
}
-->

<!-- PROOF:END -->
