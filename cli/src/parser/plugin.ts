import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename, dirname, relative } from "path";
import { parseMarkdown } from "./markdown.js";
import type { ClaudePlugin, Command, Agent, Skill, SkillFile, McpServer } from "./types.js";

function readJsonFile(path: string): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch (err) {
    throw new Error(`Failed to parse JSON at ${path}: ${(err as Error).message}`);
  }
}

function findMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(full));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".svg",
  ".pdf", ".zip", ".gz", ".tar", ".woff", ".woff2", ".ttf", ".eot",
]);

function isBinaryFile(name: string): boolean {
  const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

function readAllFiles(dir: string): SkillFile[] {
  if (!existsSync(dir)) return [];
  const files: SkillFile[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readAllFiles(full).map((f) => ({
        relativePath: join(entry.name, f.relativePath),
        content: f.content,
      })));
    } else if (!isBinaryFile(entry.name)) {
      files.push({
        relativePath: entry.name,
        content: readFileSync(full, "utf-8"),
      });
    }
  }
  return files;
}

function parseCommands(pluginDir: string): Command[] {
  const commandsDir = join(pluginDir, "commands");
  const files = findMarkdownFiles(commandsDir);
  return files.map((file) => {
    const raw = readFileSync(file, "utf-8");
    const { frontmatter, body } = parseMarkdown(raw);
    return {
      name: (frontmatter.name as string) || basename(file, ".md"),
      description: (frontmatter.description as string) || "",
      argumentHint: frontmatter.arguments ? "feature description" : undefined,
      model: frontmatter.model as string | undefined,
      body,
    };
  });
}

function parseAgents(pluginDir: string): Agent[] {
  const agentsDir = join(pluginDir, "agents");
  const files = findMarkdownFiles(agentsDir);
  return files
    .filter((f) => basename(f) !== "index.md")
    .map((file) => {
      const raw = readFileSync(file, "utf-8");
      const { frontmatter, body } = parseMarkdown(raw);
      const category = basename(dirname(file));
      return {
        name: (frontmatter.name as string) || basename(file, ".md"),
        description: (frontmatter.description as string) || "",
        scope: frontmatter.scope as string | undefined,
        model: frontmatter.model as string | undefined,
        category: category === "agents" ? "general" : category,
        body,
      };
    });
}

function parseSkills(pluginDir: string): Skill[] {
  const skillsDir = join(pluginDir, "skills");
  if (!existsSync(skillsDir)) return [];

  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const skillDir = join(skillsDir, d.name);
      const skillFile = join(skillDir, "SKILL.md");
      let description: string | undefined;
      let scope: string | undefined;

      if (existsSync(skillFile)) {
        const { frontmatter } = parseMarkdown(readFileSync(skillFile, "utf-8"));
        description = frontmatter.description as string | undefined;
        scope = frontmatter.scope as string | undefined;
      }

      return {
        name: d.name,
        description,
        scope,
        files: readAllFiles(skillDir),
      };
    });
}

function parseMcpServers(pluginDir: string): Record<string, McpServer> {
  const mcpPath = join(pluginDir, ".mcp.json");
  if (!existsSync(mcpPath)) return {};
  const data = readJsonFile(mcpPath);
  return (data.mcpServers as Record<string, McpServer>) || {};
}

export function readPlugin(pluginDir: string): ClaudePlugin {
  const manifestPath = join(pluginDir, ".claude-plugin", "plugin.json");
  if (!existsSync(manifestPath)) {
    throw new Error(`No plugin.json found at ${manifestPath}`);
  }
  const manifest = readJsonFile(manifestPath);

  return {
    name: (manifest.name as string) || "unknown",
    version: (manifest.version as string) || "0.0.0",
    description: (manifest.description as string) || "",
    commands: parseCommands(pluginDir),
    agents: parseAgents(pluginDir),
    skills: parseSkills(pluginDir),
    mcpServers: parseMcpServers(pluginDir),
  };
}
