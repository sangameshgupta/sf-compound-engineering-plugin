import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import type { ClaudePlugin, TargetPlatform } from "../parser/types.js";
import { rewritePaths } from "../transforms/paths.js";
import { rewriteAllRefs } from "../transforms/references.js";

export abstract class BaseConverter {
  abstract readonly target: TargetPlatform;
  abstract readonly label: string;

  abstract convert(plugin: ClaudePlugin, outputDir: string): void;

  /**
   * Apply all content transforms (paths + references) for this target.
   */
  protected transform(content: string): string {
    let result = rewritePaths(content, this.target);
    result = rewriteAllRefs(result, this.target);
    return result;
  }

  /**
   * Write a file, creating parent directories as needed.
   */
  protected writeFile(path: string, content: string, mode?: number): void {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, { mode });
  }

  /**
   * Merge JSON into an existing file (user keys win on conflict).
   */
  protected mergeJsonFile(path: string, newData: Record<string, unknown>): void {
    let existing: Record<string, unknown> = {};
    if (existsSync(path)) {
      existing = JSON.parse(readFileSync(path, "utf-8"));
    }
    // Plugin data goes first, user data overrides
    const merged = { ...newData, ...existing };
    this.writeFile(path, JSON.stringify(merged, null, 2) + "\n");
  }

  /**
   * Log a conversion action.
   */
  protected log(action: string, path: string): void {
    console.log(`  ${action}: ${path}`);
  }
}
