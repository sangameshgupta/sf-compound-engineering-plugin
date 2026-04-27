# Changelog

All notable changes to the `sf-compound-engineering-plugin` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0-beta.1] - 2026-04-25

V3 capability ports: 22 V3 skills and 24 V3 review/research agents added as Salesforce-aware sf-* counterparts.

### Added

- **22 V3 capability skills** as Salesforce-aware `sf-*` skeletons. Each carries V3 frontmatter (`name`, `description` with auto-routing trigger phrases, `argument-hint`), a Salesforce Angle bullet list, and a self-contained Procedure section. Skills shipped: `sf-debug`, `sf-doc-review`, `sf-pr-description`, `sf-resolve-pr-feedback`, `sf-update`, `sf-setup`, `sf-sessions`, `sf-session-inventory`, `sf-session-extract`, `sf-clean-gone-branches`, `sf-commit`, `sf-commit-push-pr`, `sf-ideate`, `sf-optimize`, `sf-agent-native-architecture`, `sf-agent-native-audit`, `sf-compound-refresh`, `sf-release-notes`, `sf-report-bug`, `sf-slack-research`, `sf-proof`, `sf-demo-reel`.
- **24 V3 review/research agents** as Salesforce-aware personas dispatched by `sf-review` and `sf-doc-review`:
  - Always-on review (4): `sf-correctness-reviewer`, `sf-maintainability-reviewer`, `sf-testing-reviewer`, `sf-project-standards-reviewer`.
  - Conditional review (7): `sf-architecture-strategist`, `sf-performance-oracle`, `sf-performance-reviewer`, `sf-reliability-reviewer`, `sf-api-contract-reviewer`, `sf-data-migrations-reviewer`, `sf-data-integrity-guardian`.
  - Doc-review lenses (6): `sf-feasibility-reviewer`, `sf-coherence-reviewer`, `sf-product-lens-reviewer`, `sf-scope-guardian-reviewer`, `sf-security-lens-reviewer`, `sf-design-lens-reviewer`.
  - Adversarial (2): `sf-adversarial-reviewer`, `sf-adversarial-document-reviewer`.
  - Workflow / research (5): `sf-previous-comments-reviewer`, `sf-issue-intelligence-analyst`, `sf-session-historian`, `sf-slack-researcher`, `sf-web-researcher`.

### Changed

- Plugin version bumped to `3.0.0-beta.1` across all four manifests (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.cursor-plugin/plugin.json`, `.codex-plugin/plugin.json`).
- Total agent count: 35 → 59. Total skill count: 23 → 45.

### Not Ported (out of scope)

- Personality reviewer agents tied to non-Salesforce stacks (Rails, frontend race conditions, Ruby gem READMEs, Swift / iOS).
- Non-Salesforce design / test skills (frontend-design, figma-design-sync, design-iterator, design-implementation-reviewer, gemini-imagegen, test-xcode, test-browser).
- Upstream-only experimental beta variants (work-beta, polish-beta).
- A Bun/TypeScript cross-platform converter CLI — deferred; the existing Python `sfce.py` CLI is retained as-is.

## [3.0.0-alpha.1] - 2026-04-25

**BREAKING.** V3 architecture migration — skills replace commands, agents flatten with `<name>.agent.md` naming, multi-platform manifests added.

### BREAKING CHANGES

- **`commands/` directory removed.** All seven workflow entry points (`sf-brainstorm`, `sf-plan`, `sf-deepen`, `sf-work`, `sf-review`, `sf-compound`, `sf-lfg`) are now skills under `skills/<name>/SKILL.md`. Direct invocation via `/sf-<name>` continues to work, and skills now auto-route from natural-language phrases via their `description` frontmatter — a capability commands cannot match.
- **All 35 agents flattened.** Files moved from `agents/{apex,architecture,automation,integration,lwc,research,workflow}/<name>.md` to `agents/sf-<name>.agent.md` (flat layout, `.agent.md` suffix). Category folders are removed; topical groupings remain in `agents/index.md` as documentation aids only.
- **Agent frontmatter updated to V3 conventions.** Fields: `name`, `description`, `model`, `tools`, `color`. The `scope` field is retired. `model: inherit` is the default; research agents keep `model: haiku` for speed; deep-analysis agents keep `model: sonnet`. Tools default to `Read, Grep, Glob, Bash`; workflow agents that may write files get the full `Read, Edit, Write, Grep, Glob, Bash` set.
- **Skill frontmatter updated to V3 conventions.** Fields: `name`, `description`, `argument-hint`. Skill descriptions enumerate Salesforce-flavored auto-routing trigger phrases.
- **`sf-` prefix is now the universal namespace.** Every agent and skill is prefixed `sf-` so the Salesforce identity is unambiguous when the plugin coexists with other compound-engineering-style tools.

### Added

- `.cursor-plugin/plugin.json` — Cursor manifest for native install in Cursor IDE.
- `.codex-plugin/plugin.json` — Codex manifest with `skills` path and `interface` metadata for native Codex install.
- `agents/index.md` — V3 flat-layout routing index (rewritten).
- `skills/index.md` — V3 skill index covering core workflow skills, domain knowledge skills, and V3 capability skills (rewritten).
- This `CHANGELOG.md` file.

### Changed

- `.claude-plugin/plugin.json` version: `2.2.0` → `3.0.0-alpha.1`. Description and keywords updated for multi-platform / skills-first.
- `.claude-plugin/marketplace.json` catalog and entry version bumped to `3.0.0-alpha.1`.
- `CLAUDE.md` rewritten for V3 architecture. The "Hosted MCP Key Gotchas" section (8 items) and "Protected Artifacts" rules are preserved verbatim.
- `README.md` updated: BREAKING migration banner, component counts (35 → 59 agents, 23 → 45 skills), workflow diagram clarified that entry points are skills.

### Removed

- The `commands/` directory and its 7 files (`sf-brainstorm.md`, `sf-plan.md`, `sf-deepen.md`, `sf-work.md`, `sf-review.md`, `sf-compound.md`, `sf-lfg.md`). The bodies were preserved in their new skill homes.
- The 7 agent category subdirectories (`agents/{apex,architecture,automation,integration,lwc,research,workflow}/`). All agent files were preserved via `git mv` so blame and history follow.
- `scope` field from all agent frontmatter (V3 retired this field).

### Migration Guide for v2.x Users

If you have scripts, docs, or muscle memory tied to v2.x, here's what changes:

| v2.x                                                       | v3.x                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `/sf-plan` (command, in `commands/sf-plan.md`)             | `/sf-plan` (skill, in `skills/sf-plan/SKILL.md`)                  |
| `agents/apex/apex-trigger-architect.md`                    | `agents/sf-apex-trigger-architect.agent.md`                       |
| `agents/research/sf-learnings-researcher.md`               | `agents/sf-learnings-researcher.agent.md`                         |
| `agents/workflow/sf-spec-flow-analyzer.md`                 | `agents/sf-spec-flow-analyzer.agent.md`                           |
| Agent frontmatter `scope: APEX_ONLY`                       | (removed; topical grouping is in `agents/index.md` only)          |
| Single-target Claude Code install                          | Multi-target install (Claude Code, Cursor, Codex)                 |

**For most users**: re-install the plugin (`/plugin update sf-compound-engineering`). Slash invocations (`/sf-plan`, `/sf-debug`, `/sf-review`) work identically. Custom scripts that hard-coded paths under `commands/` or `agents/<category>/` need updating — see the table above.

## [2.2.0] and earlier

See git history for v2.x release notes. Background research that informed the v3 migration is captured in [`Compound-Engineering-Plugin-Teardown.md`](./Compound-Engineering-Plugin-Teardown.md) — a 1628-line gap analysis dated 2026-03-02 that surveyed the broader compound-engineering ecosystem before the v3 migration was scoped.
