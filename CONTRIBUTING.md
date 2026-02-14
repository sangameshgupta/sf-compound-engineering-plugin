# Contributing to SF Compound Engineering

Thanks for contributing.

## How to Contribute

1. Fork the repository.
2. Create a branch (`git checkout -b feature/my-change`).
3. Make and test your changes.
4. Open a pull request with a clear description.

## Project Structure

```text
sf-compound-engineering-plugin/
├── .claude-plugin/              # Plugin metadata (Claude plugin-first)
├── commands/                    # 4 commands: sf-plan/sf-work/sf-review/sf-compound
├── agents/                      # 23 specialized agents + index.md
├── skills/                      # 7 skills + index.md
├── tests/                       # Prompt validation checks
├── sfce.py                      # Optional CLI bootstrap/update utility
├── pyproject.toml               # Packaging metadata
├── README.md
└── CONTRIBUTING.md
```

## Command Authoring Guidelines

- Keep prompts concise and selective in context use.
- Route through `agents/index.md` and `skills/index.md`.
- Prefer guidance language (`prefer`, `consider`) over rigid mandates.
- Keep Salesforce-native options first; use external research when needed.

## Frontmatter Requirements

### Commands and Agents

```yaml
---
name: some-name
description: Short description
---
```

### Skills

Each `skills/*/SKILL.md` must include frontmatter with `name` and `description`.

## Testing

Run these checks before opening a PR:

```bash
python tests/validate_prompts.py
python sfce.py --help
```

Optional CLI smoke test:

```bash
mkdir /tmp/sfce-test && cd /tmp/sfce-test
python /path/to/sfce.py init . --ai claude
```

## Notes on Scope

- Current focus is Claude Code plugin behavior.
- The CLI remains available as an optional bootstrap path.
