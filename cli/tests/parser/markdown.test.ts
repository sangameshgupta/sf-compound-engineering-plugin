import { describe, expect, test } from "bun:test";
import { parseMarkdown } from "../../src/parser/markdown.js";

describe("parseMarkdown", () => {
  test("parses frontmatter and body", () => {
    const input = `---
name: test-agent
description: A test agent
---

This is the body content.`;

    const result = parseMarkdown(input);
    expect(result.frontmatter.name).toBe("test-agent");
    expect(result.frontmatter.description).toBe("A test agent");
    expect(result.body).toBe("This is the body content.");
  });

  test("handles markdown without frontmatter", () => {
    const input = "Just a plain body.";
    const result = parseMarkdown(input);
    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe("Just a plain body.");
  });

  test("trims body whitespace", () => {
    const input = `---
name: test
---

  Body with leading spaces.

`;
    const result = parseMarkdown(input);
    expect(result.body).toBe("Body with leading spaces.");
  });
});
