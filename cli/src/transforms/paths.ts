import type { TargetPlatform } from "../parser/types.js";

const PATH_MAP: Record<TargetPlatform, { local: string; global: string }> = {
  copilot: { local: ".github/", global: "~/.copilot/" },
  windsurf: { local: ".windsurf/", global: "~/.codeium/windsurf/" },
  gemini: { local: ".gemini/", global: "~/.gemini/" },
  kiro: { local: ".kiro/", global: "~/.kiro/" },
  opencode: { local: ".opencode/", global: "~/.config/opencode/" },
  codex: { local: ".codex/", global: "~/.codex/" },
  cursor: { local: ".cursor/", global: "~/.cursor/" },
  droid: { local: ".factory/", global: "~/.factory/" },
  pi: { local: ".pi/", global: "~/.pi/" },
  openclaw: { local: ".openclaw/", global: "~/.openclaw/" },
  qwen: { local: ".qwen/", global: "~/.qwen/" },
};

export function rewritePaths(content: string, target: TargetPlatform): string {
  const map = PATH_MAP[target];
  let result = content;
  // Global paths first (longer match)
  result = result.replaceAll("~/.claude/", map.global);
  // Local paths
  result = result.replaceAll(".claude/", map.local);
  return result;
}
