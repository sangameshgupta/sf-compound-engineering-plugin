import { describe, expect, test } from "bun:test";
import { rewritePaths } from "../../src/transforms/paths.js";

describe("rewritePaths", () => {
  test("rewrites global ~/.claude/ paths for copilot", () => {
    const input = "Store config in ~/.claude/settings.json";
    expect(rewritePaths(input, "copilot")).toBe("Store config in ~/.copilot/settings.json");
  });

  test("rewrites local .claude/ paths for copilot", () => {
    const input = "See .claude/commands/ for details";
    expect(rewritePaths(input, "copilot")).toBe("See .github/commands/ for details");
  });

  test("rewrites paths for windsurf", () => {
    expect(rewritePaths("~/.claude/config", "windsurf")).toBe("~/.codeium/windsurf/config");
    expect(rewritePaths(".claude/skills/", "windsurf")).toBe(".windsurf/skills/");
  });

  test("rewrites paths for gemini", () => {
    expect(rewritePaths("~/.claude/config", "gemini")).toBe("~/.gemini/config");
  });

  test("rewrites paths for cursor", () => {
    expect(rewritePaths(".claude/agents/", "cursor")).toBe(".cursor/agents/");
  });

  test("does not rewrite non-claude paths", () => {
    const input = "See ~/.config/other for details";
    expect(rewritePaths(input, "copilot")).toBe(input);
  });

  test("rewrites global before local to avoid partial matches", () => {
    const input = "global: ~/.claude/foo, local: .claude/bar";
    const result = rewritePaths(input, "copilot");
    expect(result).toBe("global: ~/.copilot/foo, local: .github/bar");
  });
});
