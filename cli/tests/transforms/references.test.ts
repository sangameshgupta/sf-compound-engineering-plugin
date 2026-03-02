import { describe, expect, test } from "bun:test";
import { rewriteTaskCalls, rewriteSlashCommands, rewriteAgentRefs, rewriteAllRefs } from "../../src/transforms/references.js";

describe("rewriteTaskCalls", () => {
  test("rewrites for windsurf as @agent", () => {
    expect(rewriteTaskCalls("Task my-agent(review code)", "windsurf")).toBe("@my-agent review code");
  });

  test("rewrites for kiro as natural language", () => {
    expect(rewriteTaskCalls("Task security-sentinel(check auth)", "kiro")).toBe(
      "Use the security-sentinel agent to: check auth"
    );
  });

  test("rewrites for codex with $ prefix", () => {
    expect(rewriteTaskCalls("Task my-agent(do stuff)", "codex")).toBe(
      "Use the $my-agent skill to: do stuff"
    );
  });

  test("keeps as-is for opencode", () => {
    expect(rewriteTaskCalls("Task my-agent(args)", "opencode")).toBe("Task my-agent(args)");
  });

  test("defaults to skill syntax for other platforms", () => {
    expect(rewriteTaskCalls("Task my-agent(args)", "copilot")).toBe("Use the my-agent skill to: args");
  });
});

describe("rewriteSlashCommands", () => {
  test("rewrites for kiro", () => {
    expect(rewriteSlashCommands("Run /sf-deploy first", "kiro")).toBe("Run the sf-deploy skill first");
  });

  test("rewrites for codex", () => {
    expect(rewriteSlashCommands("/sf-test-runner", "codex")).toBe("/prompts:sf-test-runner");
  });

  test("keeps as-is for copilot", () => {
    expect(rewriteSlashCommands("/sf-deploy", "copilot")).toBe("/sf-deploy");
  });
});

describe("rewriteAgentRefs", () => {
  test("rewrites for codex with $ prefix", () => {
    expect(rewriteAgentRefs("Ask @security-sentinel", "codex")).toBe("Ask $security-sentinel skill");
  });

  test("keeps as-is for other platforms", () => {
    expect(rewriteAgentRefs("Ask @security-sentinel", "windsurf")).toBe("Ask @security-sentinel");
  });
});

describe("rewriteAllRefs", () => {
  test("applies all transforms", () => {
    const input = "Task my-agent(review) then run /sf-deploy and ask @helper";
    const result = rewriteAllRefs(input, "codex");
    expect(result).toContain("$my-agent skill");
    expect(result).toContain("/prompts:sf-deploy");
    expect(result).toContain("$helper skill");
  });
});
