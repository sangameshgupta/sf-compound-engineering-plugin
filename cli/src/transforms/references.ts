import type { TargetPlatform } from "../parser/types.js";

/**
 * Rewrite `Task agent-name(args)` calls to platform-specific delegation syntax.
 */
export function rewriteTaskCalls(content: string, target: TargetPlatform): string {
  const pattern = /Task\s+([\w-]+)\(([^)]*)\)/g;

  return content.replace(pattern, (_match, agentName: string, args: string) => {
    switch (target) {
      case "windsurf":
        return `@${agentName} ${args}`;
      case "kiro":
        return `Use the ${agentName} agent to: ${args}`;
      case "codex":
        return `Use the $${agentName} skill to: ${args}`;
      case "opencode":
        return `Task ${agentName}(${args})`; // kept as-is
      default:
        return `Use the ${agentName} skill to: ${args}`;
    }
  });
}

/**
 * Rewrite `/sf-command` slash command references to platform syntax.
 */
export function rewriteSlashCommands(content: string, target: TargetPlatform): string {
  if (target === "kiro") {
    return content.replace(/\/sf-([\w-]+)/g, "the sf-$1 skill");
  }
  if (target === "codex") {
    return content.replace(/\/sf-([\w-]+)/g, "/prompts:sf-$1");
  }
  return content; // most platforms keep /sf-* as-is
}

/**
 * Rewrite `@agent-name` references.
 */
export function rewriteAgentRefs(content: string, target: TargetPlatform): string {
  if (target === "codex") {
    return content.replace(/@([\w-]+)/g, (_match, name: string) => `$${name} skill`);
  }
  return content; // most platforms support @agent natively
}

/**
 * Apply all reference transforms.
 */
export function rewriteAllRefs(content: string, target: TargetPlatform): string {
  let result = content;
  result = rewriteTaskCalls(result, target);
  result = rewriteSlashCommands(result, target);
  result = rewriteAgentRefs(result, target);
  return result;
}
