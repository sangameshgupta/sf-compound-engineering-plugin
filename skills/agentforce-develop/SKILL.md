---
name: agentforce-develop
description: "Build, modify, debug, and deploy Agentforce agents written in Agent Script. Use when creating or modifying .agent files or aiAuthoringBundle metadata, designing subagents and actions, writing or reviewing an Agent Spec, or running sf agent generate / preview / validate / publish / activate. Trigger phrases: 'build an Agentforce agent', 'create an agent for', 'write an Agent Script', 'design subagents for', 'add an action to my agent', 'deploy this agent', 'publish my Agentforce bundle'. Do NOT trigger for plain Apex, Flow, LWC, or Prompt Template work."
argument-hint: "[agent name, .agent file path, or agent description; optional 'employee' or 'service' agent type]"
---

# <span data-proof="authored" data-by="ai:claude">/agentforce-develop</span>

> **<span data-proof="authored" data-by="ai:claude">Principles enforced:</span>** <span data-proof="authored" data-by="ai:claude">1 (preserve the quality ceiling), 4 (spec is the artifact), 7 (institutional memory). See</span> <span data-proof="authored" data-by="ai:claude">`PRINCIPLES.md`.</span>

## <span data-proof="authored" data-by="ai:claude">Copy-paste-to-agent</span>

```
Build, modify, or deploy an Agentforce agent written in Agent Script. Always go through the
Agent Spec gate before writing code — the spec is the artifact (Principle 4). For backing
logic, scan sfdx-project.json package directories for existing @InvocableMethod classes,
AutoLaunchedFlows, and PromptTemplates before creating stubs (Principle 7). Validate compilation
with sf agent validate, preview behavior with sf agent preview --use-live-actions, then
publish + activate. Never proceed past spec creation without explicit user approval.
Always pass --json on every sf CLI command.
```

## <span data-proof="authored" data-by="ai:claude">When to use this skill</span>

<span data-proof="authored" data-by="ai:claude">Use</span> <span data-proof="authored" data-by="ai:claude">`agentforce-develop`</span> <span data-proof="authored" data-by="ai:claude">for the</span> **<span data-proof="authored" data-by="ai:claude">authoring lifecycle</span>** <span data-proof="authored" data-by="ai:claude">of an Agentforce agent:</span>

* <span data-proof="authored" data-by="ai:claude">Designing the subagent graph and Agent Spec</span>

* <span data-proof="authored" data-by="ai:claude">Writing or editing</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">files inside an</span> <span data-proof="authored" data-by="ai:claude">`aiAuthoringBundle`</span>

* <span data-proof="authored" data-by="ai:claude">Generating and deploying backing logic (Apex</span> <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`, Flows, Prompt Templates)</span>

* <span data-proof="authored" data-by="ai:claude">Validating compilation, previewing behavior, publishing, activating</span>

<span data-proof="authored" data-by="ai:claude">Sister skills:</span>

* <span data-proof="authored" data-by="ai:claude">`/agentforce-test`</span> <span data-proof="authored" data-by="ai:claude">— once the agent compiles, write or run test suites against it</span>

* <span data-proof="authored" data-by="ai:claude">`/agentforce-observe`</span> <span data-proof="authored" data-by="ai:claude">— once the agent is in production, analyze STDM session traces and reproduce issues</span>

***

## <span data-proof="authored" data-by="ai:claude">Rules that always apply</span>

1. **<span data-proof="authored" data-by="ai:claude">`--json`</span>** **<span data-proof="authored" data-by="ai:claude">on every</span>** **<span data-proof="authored" data-by="ai:claude">`sf`</span><span data-proof="authored" data-by="ai:claude">command.</span>**  <span data-proof="authored" data-by="ai:claude">Always. Read the JSON directly; don't pipe through</span> <span data-proof="authored" data-by="ai:claude">`jq`</span> <span data-proof="authored" data-by="ai:claude">or</span> <span data-proof="authored" data-by="ai:claude">`2>/dev/null`</span> <span data-proof="authored" data-by="ai:claude">and don't strip the structured output. LLMs parse JSON natively — that's the agent-native default (Principle 6).</span>
2. **<span data-proof="authored" data-by="ai:claude">Verify target org first.</span>** <span data-proof="authored" data-by="ai:claude">Run</span> <span data-proof="authored" data-by="ai:claude">`sf config get target-org --json`. If none is set, ask the user before doing anything else.</span>
3. **<span data-proof="authored" data-by="ai:claude">Diagnose before you fix.</span>** <span data-proof="authored" data-by="ai:claude">When the agent misbehaves,</span> *<span data-proof="authored" data-by="ai:claude">always</span>* <span data-proof="authored" data-by="ai:claude">preview with</span> <span data-proof="authored" data-by="ai:claude">`--use-live-actions --authoring-bundle <Name>`, send a representative utterance, and read the resulting trace file</span> *<span data-proof="authored" data-by="ai:claude">before</span>* <span data-proof="authored" data-by="ai:claude">editing the</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">file or backing logic. Modifying without trace evidence is the jagged-intelligence failure mode (Principle 3).</span>
4. **<span data-proof="authored" data-by="ai:claude">Spec approval is a hard gate (Principle 4).</span>** <span data-proof="authored" data-by="ai:claude">Never proceed past the Agent Spec without explicit user approval. The spec IS the contract.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 0: Pre-implementation research (parallel, Principle 7)</span>

<span data-proof="authored" data-by="ai:claude">Before designing the agent, dispatch in parallel:</span>

* <span data-proof="authored" data-by="ai:claude">Task</span> <span data-proof="authored" data-by="ai:claude">`sf-learnings-researcher(agent_description)`</span> <span data-proof="authored" data-by="ai:claude">— has anyone solved this agent shape before?</span> **<span data-proof="authored" data-by="ai:claude">Must-read.</span>** <span data-proof="authored" data-by="ai:claude">Returned solutions are constraints on the design, not optional context.</span>

* <span data-proof="authored" data-by="ai:claude">Task</span> <span data-proof="authored" data-by="ai:claude">`sf-repo-research-analyst(agent_description)`</span> <span data-proof="authored" data-by="ai:claude">— what</span> <span data-proof="authored" data-by="ai:claude">`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">classes,</span> <span data-proof="authored" data-by="ai:claude">`AutoLaunchedFlow`s,</span> <span data-proof="authored" data-by="ai:claude">`PromptTemplate`s, and custom objects already exist in</span> <span data-proof="authored" data-by="ai:claude">`sfdx-project.json`</span> <span data-proof="authored" data-by="ai:claude">package directories? Existing backing logic should be reused, not regenerated.</span>

* <span data-proof="authored" data-by="ai:claude">Task</span> <span data-proof="authored" data-by="ai:claude">`sf-framework-docs-researcher("Agentforce Agent Script")`</span> <span data-proof="authored" data-by="ai:claude">— confirm API version, license, and any platform constraints.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 1: Design the agent and produce an Agent Spec</span>

<span data-proof="authored" data-by="ai:claude">The Agent Spec is the artifact. Write it before any code.</span>

<span data-proof="authored" data-by="ai:claude">The spec must include:</span>

* **<span data-proof="authored" data-by="ai:claude">Purpose</span>** <span data-proof="authored" data-by="ai:claude">— one paragraph stating what the agent does and what it explicitly does</span> *<span data-proof="authored" data-by="ai:claude">not</span>* <span data-proof="authored" data-by="ai:claude">do.</span>

* **<span data-proof="authored" data-by="ai:claude">Agent type</span>** <span data-proof="authored" data-by="ai:claude">—</span> <span data-proof="authored" data-by="ai:claude">`employee`</span> <span data-proof="authored" data-by="ai:claude">(internal user-facing) or</span> <span data-proof="authored" data-by="ai:claude">`service`</span> <span data-proof="authored" data-by="ai:claude">(external messaging-facing). Drives environment prerequisites.</span>

* **<span data-proof="authored" data-by="ai:claude">Subagents</span>** <span data-proof="authored" data-by="ai:claude">— one per coherent topic. Name, description (with routing keywords), and the actions each subagent calls.</span>

* **<span data-proof="authored" data-by="ai:claude">Actions</span>** <span data-proof="authored" data-by="ai:claude">— for each, mark</span> <span data-proof="authored" data-by="ai:claude">`EXISTS`</span> <span data-proof="authored" data-by="ai:claude">(with file path) or</span> <span data-proof="authored" data-by="ai:claude">`NEEDS STUB`</span> <span data-proof="authored" data-by="ai:claude">(with proposed Apex/Flow/Template name and signature). Don't generate stubs for actions that already exist somewhere in the package.</span>

* **<span data-proof="authored" data-by="ai:claude">Flow control</span>** <span data-proof="authored" data-by="ai:claude">— start agent, transitions between subagents, and any</span> <span data-proof="authored" data-by="ai:claude">`available when:`</span> <span data-proof="authored" data-by="ai:claude">guards.</span>

* **<span data-proof="authored" data-by="ai:claude">Variables</span>** <span data-proof="authored" data-by="ai:claude">— names, types, scope, and which subagents read/write them.</span>

* **<span data-proof="authored" data-by="ai:claude">Verification Strategy (Principle 2)</span>** <span data-proof="authored" data-by="ai:claude">— what utterances will prove this agent works? Name at least one routing test, one happy-path action invocation test, one guardrail test (off-topic), and one safety probe.</span>

**<span data-proof="authored" data-by="ai:claude">STOP. Save the spec to</span>** **<span data-proof="authored" data-by="ai:claude">`docs/plans/YYYY-MM-DD-feat-<agent-slug>-spec.md`. Present to the user. Do not proceed without explicit approval.</span>**

***

## <span data-proof="authored" data-by="ai:claude">Step 2: Validate environment prerequisites</span>

<span data-proof="authored" data-by="ai:claude">Pick the right path based on agent type:</span>

* **<span data-proof="authored" data-by="ai:claude">Employee agent</span>** <span data-proof="authored" data-by="ai:claude">— verify the</span> <span data-proof="authored" data-by="ai:claude">`config:`</span> <span data-proof="authored" data-by="ai:claude">block does NOT include</span> <span data-proof="authored" data-by="ai:claude">`default_agent_user`,</span> <span data-proof="authored" data-by="ai:claude">`connection messaging:`, or</span> <span data-proof="authored" data-by="ai:claude">`MessagingSession`-linked variables. Remove if present.</span>

* **<span data-proof="authored" data-by="ai:claude">Service agent</span>** <span data-proof="authored" data-by="ai:claude">— query the org for an Einstein Agent User. If none exists, walk the user through creating one before code generation.</span>

<span data-proof="authored" data-by="ai:claude">Do not generate the authoring bundle until environment is validated.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 3: Generate the authoring bundle</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MTA0LCJhdHRycyI6eyJieSI6ImFpOmNsYXVkZSJ9fV0=
sf agent generate authoring-bundle --json --no-spec --name "<Display Label>" --api-name <Developer_Name>
```

<span data-proof="authored" data-by="ai:claude">This produces an</span> <span data-proof="authored" data-by="ai:claude">`aiAuthoringBundle`</span> <span data-proof="authored" data-by="ai:claude">directory under</span> <span data-proof="authored" data-by="ai:claude">`force-app/main/default/aiAuthoringBundles/<Developer_Name>/`</span> <span data-proof="authored" data-by="ai:claude">containing a</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">file (Agent Script source) and</span> <span data-proof="authored" data-by="ai:claude">`bundle-meta.xml`.</span>

<span data-proof="authored" data-by="ai:claude">Never create</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">or</span> <span data-proof="authored" data-by="ai:claude">`bundle-meta.xml`</span> <span data-proof="authored" data-by="ai:claude">files manually. Always go through</span> <span data-proof="authored" data-by="ai:claude">`sf agent generate`.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 4: Write Agent Script in the</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">file</span>

<span data-proof="authored" data-by="ai:claude">Edit the generated</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">file. Agent Script syntax in one paragraph:</span>

* <span data-proof="authored" data-by="ai:claude">`->`</span> <span data-proof="authored" data-by="ai:claude">introduces a</span> **<span data-proof="authored" data-by="ai:claude">logic instruction</span>** <span data-proof="authored" data-by="ai:claude">— deterministic execution, business rules, variable assignment, conditionals.</span>

* <span data-proof="authored" data-by="ai:claude">`|`</span> <span data-proof="authored" data-by="ai:claude">introduces a</span> **<span data-proof="authored" data-by="ai:claude">prompt instruction</span>** <span data-proof="authored" data-by="ai:claude">— natural-language text sent to the LLM.</span>

* <span data-proof="authored" data-by="ai:claude">Indentation is whitespace-significant. Pick tabs OR spaces; do not mix.</span>

* <span data-proof="authored" data-by="ai:claude">Variable interpolation:</span> <span data-proof="authored" data-by="ai:claude">`{!@variables.name}`.</span>

* <span data-proof="authored" data-by="ai:claude">Comments:</span> <span data-proof="authored" data-by="ai:claude">`# this is a comment`.</span>

**<span data-proof="authored" data-by="ai:claude">Anti-patterns to avoid (Principle 5 — taste):</span>**

* <span data-proof="authored" data-by="ai:claude">Mixing personality and routing in</span> <span data-proof="authored" data-by="ai:claude">`start_agent`. Persona belongs in</span> <span data-proof="authored" data-by="ai:claude">`system: instructions:`</span> <span data-proof="authored" data-by="ai:claude">only;</span> <span data-proof="authored" data-by="ai:claude">`start_agent`</span> <span data-proof="authored" data-by="ai:claude">is a router.</span>

* <span data-proof="authored" data-by="ai:claude">Identical</span> <span data-proof="authored" data-by="ai:claude">`instructions:`</span> <span data-proof="authored" data-by="ai:claude">text across subagents. Each subagent's instructions must be distinct enough to drive routing.</span>

* <span data-proof="authored" data-by="ai:claude">"Dead hub" subagents — defined but never reached from any transition.</span>

* <span data-proof="authored" data-by="ai:claude">Orphan actions — listed in</span> <span data-proof="authored" data-by="ai:claude">`subagent: actions:`</span> <span data-proof="authored" data-by="ai:claude">Level 1 but never invoked from Level 2</span> <span data-proof="authored" data-by="ai:claude">`reasoning: actions:`.</span>

<span data-proof="authored" data-by="ai:claude">Agent Script is NOT JavaScript, AppleScript, or Python. Do not let LLM training-set pattern-matching pull syntax from those languages.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 5: Validate compilation</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6NjksImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19XQ==
sf agent validate authoring-bundle --json --api-name <Developer_Name>
```

<span data-proof="authored" data-by="ai:claude">If validation fails, fix syntax and structural errors before generating any backing logic. A</span> <span data-proof="authored" data-by="ai:claude">`.agent`</span> <span data-proof="authored" data-by="ai:claude">file that doesn't compile is not worth writing tests for.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 6: Generate backing logic (Apex / Flow / Prompt Template stubs)</span>

<span data-proof="authored" data-by="ai:claude">For each action marked</span> <span data-proof="authored" data-by="ai:claude">`NEEDS STUB`</span> <span data-proof="authored" data-by="ai:claude">in the spec:</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6OTgsImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19XQ==
sf template generate apex class --name <ClassName> --output-dir <PACKAGE_DIR>/main/default/classes
```

<span data-proof="authored" data-by="ai:claude">Replace the class body with the invocable pattern (`@InvocableMethod`</span> <span data-proof="authored" data-by="ai:claude">with</span> <span data-proof="authored" data-by="ai:claude">`@InvocableVariable`</span> <span data-proof="authored" data-by="ai:claude">inputs and outputs). Then deploy:</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6NjMsImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19XQ==
sf project deploy start --json --metadata ApexClass:<ClassName>
```

<span data-proof="authored" data-by="ai:claude">Fix deploy errors before generating the next stub. One stub at a time, deploy and verify, then move on.</span>

<span data-proof="authored" data-by="ai:claude">For Flow and Prompt Template stubs, follow the same one-at-a-time discipline.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 7: Preview with live actions and read traces (Principle 3)</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6ODQsImF0dHJzIjp7ImJ5IjoiYWk6Y2xhdWRlIn19XQ==
sf agent preview start --json --use-live-actions --authoring-bundle <Developer_Name>
```

<span data-proof="authored" data-by="ai:claude">Capture the session ID, then:</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MTkzLCJhdHRycyI6eyJieSI6ImFpOmNsYXVkZSJ9fV0=
sf agent preview send --json --authoring-bundle <Developer_Name> --session-id <ID> --utterance "<test message>"
sf agent preview end --json --authoring-bundle <Developer_Name> --session-id <ID>
```

<span data-proof="authored" data-by="ai:claude">Trace files land at:</span> <span data-proof="authored" data-by="ai:claude">`.sfdx/agents/<Developer_Name>/sessions/<sessionId>/traces/<planId>.json`.</span>

<span data-proof="authored" data-by="ai:claude">Confirm subagent routing, gating, and action invocations match the Agent Spec. If behavior diverges from spec, the diagnosis flow is in</span> <span data-proof="authored" data-by="ai:claude">`/agentforce-observe`</span> <span data-proof="authored" data-by="ai:claude">(jq queries against trace JSON to surface routing, action invocation, grounding, and safety scores). Return here only after correcting.</span>

**<span data-proof="authored" data-by="ai:claude">Checkpoint — do NOT proceed to publish unless ALL of the following are true:</span>**

* <span data-proof="authored" data-by="ai:claude">`validate authoring-bundle`</span> <span data-proof="authored" data-by="ai:claude">passes with zero errors</span>

* <span data-proof="authored" data-by="ai:claude">Live preview run with at least one representative utterance per subagent</span>

* <span data-proof="authored" data-by="ai:claude">Traces confirm correct subagent routing and action invocation</span>

* <span data-proof="authored" data-by="ai:claude">Safety probe utterances handled correctly</span>

* <span data-proof="authored" data-by="ai:claude">User explicitly approves deployment</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 8: Publish, activate, verify</span>

```bash proof:W3sidHlwZSI6InByb29mQXV0aG9yZWQiLCJmcm9tIjowLCJ0byI6MzYxLCJhdHRycyI6eyJieSI6ImFpOmNsYXVkZSJ9fV0=
# Publish — validates metadata, creates a permanent version
sf agent publish authoring-bundle --json --api-name <Developer_Name>

# Activate — makes the new version available to users
sf agent activate --json --api-name <Developer_Name>

# Verify with --api-name (NOT --authoring-bundle) post-activation
sf agent preview start --json --api-name <Developer_Name>
```

<span data-proof="authored" data-by="ai:claude">Every publish creates a permanent, immutable version number. Treat publish as production-grade.</span>

***

## <span data-proof="authored" data-by="ai:claude">Step 9: End-user access (employee agents only)</span>

<span data-proof="authored" data-by="ai:claude">For employee agents, configure permission sets and assign access. For service agents, the agent is reached through messaging channels — no end-user perm assignment.</span>

***

## <span data-proof="authored" data-by="ai:claude">Capture learnings (Principle 7)</span>

<span data-proof="authored" data-by="ai:claude">When the build is complete or you fixed a non-obvious bug, run</span> <span data-proof="authored" data-by="ai:claude">`/sf-compound`</span> <span data-proof="authored" data-by="ai:claude">to capture the learning under</span> <span data-proof="authored" data-by="ai:claude">`docs/solutions/`. Agent debugging produces patterns that will not be in any general Salesforce knowledge base — this is exactly the institutional memory the plugin compounds.</span>

***

## <span data-proof="authored" data-by="ai:claude">Inspiration</span>

<span data-proof="authored" data-by="ai:claude">This skill is adapted from</span> [<span data-proof="authored" data-by="ai:claude">`forcedotcom/afv-library/skills/developing-agentforce`</span>](https://github.com/forcedotcom/afv-library/tree/main/skills/developing-agentforce) <span data-proof="authored" data-by="ai:claude">(Apache-2.0). The upstream skill ships with eight reference files (`references/agent-script-core-language.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-design-and-spec-creation.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/salesforce-cli-for-agents.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-validation-and-debugging.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-metadata-and-lifecycle.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-user-setup.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-access-guide.md`,</span> <span data-proof="authored" data-by="ai:claude">`references/agent-subagent-map-diagrams.md`) that hold the full syntax tables and command references. For deep details — Agent Script grammar, complete CLI flag tables, permission set examples — read the upstream references. This plugin's adaptation focuses on the lifecycle gate structure and integrates with the seven-principle framework in</span> <span data-proof="authored" data-by="ai:claude">`PRINCIPLES.md`.</span>