import { join } from "path";
import { homedir } from "os";
import { BaseConverter } from "./base.js";
import type { ClaudePlugin, TargetPlatform } from "../parser/types.js";
import { normalizeName } from "../transforms/frontmatter.js";

export class OpenClawConverter extends BaseConverter {
  readonly target: TargetPlatform = "openclaw";
  readonly label = "OpenClaw";

  convert(plugin: ClaudePlugin, outputDir: string): void {
    const clawDir = join(homedir(), ".openclaw", "extensions", normalizeName(plugin.name));

    this.convertAgents(plugin, clawDir);
    this.convertCommands(plugin, clawDir);
    this.convertSkills(plugin, clawDir);
    this.generateEntryPoint(plugin, clawDir);
  }

  private convertAgents(plugin: ClaudePlugin, clawDir: string): void {
    for (const agent of plugin.agents) {
      const name = normalizeName(agent.name);
      const body = this.transform(agent.body);
      const path = join(clawDir, "agents", `${name}.md`);
      this.writeFile(path, body + "\n");
      this.log("Agent", path);
    }
  }

  private convertCommands(plugin: ClaudePlugin, clawDir: string): void {
    for (const cmd of plugin.commands) {
      const name = normalizeName(cmd.name);
      const body = this.transform(cmd.body);
      const path = join(clawDir, "commands", `${name}.md`);
      this.writeFile(path, body + "\n");
      this.log("Command", path);
    }
  }

  private convertSkills(plugin: ClaudePlugin, clawDir: string): void {
    for (const skill of plugin.skills) {
      const name = normalizeName(skill.name);
      for (const file of skill.files) {
        const content = this.transform(file.content);
        const path = join(clawDir, "skills", name, file.relativePath);
        this.writeFile(path, content);
      }
      this.log("Skill", join(clawDir, "skills", name));
    }
  }

  private generateEntryPoint(plugin: ClaudePlugin, clawDir: string): void {
    const ts = [
      `// Auto-generated entry point for ${plugin.name}`,
      `import { readFileSync } from "fs";`,
      `import { join, dirname } from "path";`,
      `import { fileURLToPath } from "url";`,
      ``,
      `const __dirname = dirname(fileURLToPath(import.meta.url));`,
      ``,
      `export const metadata = {`,
      `  name: ${JSON.stringify(plugin.name)},`,
      `  version: ${JSON.stringify(plugin.version)},`,
      `  description: ${JSON.stringify(plugin.description)},`,
      `};`,
      ``,
      `export function getAgent(name: string): string {`,
      `  return readFileSync(join(__dirname, "agents", name + ".md"), "utf-8");`,
      `}`,
      ``,
      `export function getCommand(name: string): string {`,
      `  return readFileSync(join(__dirname, "commands", name + ".md"), "utf-8");`,
      `}`,
    ].join("\n");

    const path = join(clawDir, "index.ts");
    this.writeFile(path, ts + "\n");
    this.log("Entry Point", path);
  }
}
