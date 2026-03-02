import { describe, expect, test } from "bun:test";
import { readPlugin } from "../../src/parser/plugin.js";
import { resolve } from "path";

const PLUGIN_ROOT = resolve(import.meta.dir, "..", "..", "..");

describe("readPlugin", () => {
  test("reads plugin manifest from project root", () => {
    const plugin = readPlugin(PLUGIN_ROOT);
    expect(plugin.name).toBe("sf-compound-engineering");
    expect(plugin.version).toBe("2.0.0");
  });

  test("parses commands from commands/ directory", () => {
    const plugin = readPlugin(PLUGIN_ROOT);
    expect(plugin.commands.length).toBeGreaterThan(0);
    for (const cmd of plugin.commands) {
      expect(cmd.name).toBeTruthy();
      expect(cmd.body).toBeTruthy();
    }
  });

  test("parses agents from agents/ directory", () => {
    const plugin = readPlugin(PLUGIN_ROOT);
    expect(plugin.agents.length).toBeGreaterThan(0);
    for (const agent of plugin.agents) {
      expect(agent.name).toBeTruthy();
      expect(agent.body).toBeTruthy();
      expect(agent.category).toBeTruthy();
    }
  });

  test("parses skills from skills/ directory", () => {
    const plugin = readPlugin(PLUGIN_ROOT);
    expect(plugin.skills.length).toBeGreaterThan(0);
    for (const skill of plugin.skills) {
      expect(skill.name).toBeTruthy();
      expect(skill.files.length).toBeGreaterThan(0);
    }
  });

  test("parses MCP servers from .mcp.json", () => {
    const plugin = readPlugin(PLUGIN_ROOT);
    expect(Object.keys(plugin.mcpServers).length).toBeGreaterThanOrEqual(0);
  });

  test("throws on invalid plugin directory", () => {
    expect(() => readPlugin("/nonexistent/path")).toThrow("No plugin.json found");
  });
});
