import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { TargetPlatform } from "../parser/types.js";

const DETECTORS: Record<TargetPlatform, () => boolean> = {
  copilot: () => existsSync(".github") || existsSync(join(homedir(), ".config", "github-copilot")),
  windsurf: () => existsSync(join(homedir(), ".codeium", "windsurf")) || existsSync(".windsurf"),
  gemini: () => existsSync(".gemini") || existsSync(join(homedir(), ".gemini")),
  kiro: () => existsSync(".kiro") || existsSync(join(homedir(), ".kiro")),
  opencode: () => existsSync(join(homedir(), ".config", "opencode")),
  codex: () => existsSync(".codex") || existsSync(join(homedir(), ".codex")),
  cursor: () => existsSync(".cursor") || existsSync(join(homedir(), ".cursor")),
  droid: () => existsSync(join(homedir(), ".factory")),
  pi: () => existsSync(join(homedir(), ".pi")),
  openclaw: () => existsSync(join(homedir(), ".openclaw")),
  qwen: () => existsSync(join(homedir(), ".qwen")),
};

export function detectInstalledTools(): TargetPlatform[] {
  return (Object.entries(DETECTORS) as [TargetPlatform, () => boolean][])
    .filter(([_, detect]) => detect())
    .map(([platform]) => platform);
}

export function isValidTarget(target: string): target is TargetPlatform | "all" {
  return target === "all" || target in DETECTORS;
}
