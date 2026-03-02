import { describe, expect, test } from "bun:test";
import { formatFrontmatter, normalizeName } from "../../src/transforms/frontmatter.js";

describe("formatFrontmatter", () => {
  test("formats simple key-value pairs", () => {
    const result = formatFrontmatter({ name: "test", description: "A test" });
    expect(result).toBe("---\nname: test\ndescription: A test\n---");
  });

  test("quotes strings with special YAML characters", () => {
    const result = formatFrontmatter({ desc: "has: colon" });
    expect(result).toContain('"has: colon"');
  });

  test("formats arrays", () => {
    const result = formatFrontmatter({ tools: ["*"] });
    expect(result).toContain("tools:\n  - \"*\"");
  });

  test("formats booleans and numbers", () => {
    const result = formatFrontmatter({ infer: true, temperature: 0.3 });
    expect(result).toContain("infer: true");
    expect(result).toContain("temperature: 0.3");
  });

  test("skips undefined and null values", () => {
    const result = formatFrontmatter({ name: "test", missing: undefined, empty: null });
    expect(result).not.toContain("missing");
    expect(result).not.toContain("empty");
  });
});

describe("normalizeName", () => {
  test("converts to lowercase kebab-case", () => {
    expect(normalizeName("My Agent")).toBe("my-agent");
  });

  test("replaces special characters with hyphens", () => {
    expect(normalizeName("test_agent.v2")).toBe("test-agent-v2");
  });

  test("collapses multiple hyphens", () => {
    expect(normalizeName("test---agent")).toBe("test-agent");
  });

  test("strips leading and trailing hyphens", () => {
    expect(normalizeName("-test-agent-")).toBe("test-agent");
  });
});
