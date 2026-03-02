import { describe, expect, test } from "bun:test";
import { isValidTarget } from "../../src/utils/detect.js";

describe("isValidTarget", () => {
  test("accepts 'all'", () => {
    expect(isValidTarget("all")).toBe(true);
  });

  test("accepts known platforms", () => {
    const platforms = ["copilot", "windsurf", "gemini", "kiro", "opencode", "codex", "cursor", "droid", "pi", "openclaw", "qwen"];
    for (const p of platforms) {
      expect(isValidTarget(p)).toBe(true);
    }
  });

  test("rejects unknown platforms", () => {
    expect(isValidTarget("vscode")).toBe(false);
    expect(isValidTarget("")).toBe(false);
    expect(isValidTarget("unknown")).toBe(false);
  });
});
