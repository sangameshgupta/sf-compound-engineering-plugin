export interface Command {
  name: string;
  description: string;
  argumentHint?: string;
  model?: string;
  body: string;
}

export interface Agent {
  name: string;
  description: string;
  scope?: string;
  model?: string;
  category: string;
  body: string;
}

export interface SkillFile {
  relativePath: string;
  content: string;
}

export interface Skill {
  name: string;
  description?: string;
  scope?: string;
  files: SkillFile[];
}

export interface McpServer {
  command?: string;
  args?: string[];
  url?: string;
  headers?: Record<string, string>;
  env?: Record<string, string>;
}

export interface ClaudePlugin {
  name: string;
  version: string;
  description: string;
  commands: Command[];
  agents: Agent[];
  skills: Skill[];
  mcpServers: Record<string, McpServer>;
}

export type TargetPlatform =
  | "copilot"
  | "windsurf"
  | "gemini"
  | "kiro"
  | "opencode"
  | "codex"
  | "cursor"
  | "droid"
  | "pi"
  | "openclaw"
  | "qwen";
