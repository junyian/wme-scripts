import { readFileSync } from "fs";
import { resolve } from "path";

export interface ParsedTag {
  name: string;
  version: string;
}

export function parseTag(tag: string): ParsedTag {
  const match = tag.match(/^([a-z0-9-]+)@(\d+\.\d+\.\d+.*)$/);
  if (!match) {
    throw new Error(
      `Invalid tag format: "${tag}". Expected <script-name>@<version> (e.g. hello-world@1.0.0)`
    );
  }
  return { name: match[1], version: match[2] };
}

export function lookupScriptId(config: Record<string, number>, name: string): number {
  const id = config[name];
  if (!id) {
    throw new Error(
      `Script "${name}" has no Greasyfork ID configured in greasyfork.config.json. Register it on Greasyfork first.`
    );
  }
  return id;
}

export function extractVersion(source: string): string {
  const match = source.match(/version:\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error("Could not find version field in defineUserScript()");
  }
  return match[1];
}

export function assertVersionMatch(tagVersion: string, sourceVersion: string, filePath: string): void {
  if (tagVersion !== sourceVersion) {
    throw new Error(
      `Version mismatch: tag specifies ${tagVersion} but ${filePath} has ${sourceVersion}`
    );
  }
}

async function uploadToGreasyfork(scriptId: number, code: string, apiKey: string): Promise<void> {
  const form = new FormData();
  form.append("script[code]", code);
  const response = await fetch(
    `https://greasyfork.org/scripts/${scriptId}/versions.json?api_token=${apiKey}`,
    { method: "POST", body: form }
  );
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Greasyfork API error (${response.status}): ${body}`);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const tagArg = args.find((a) => !a.startsWith("--")) ?? process.env.GITHUB_REF_NAME;

  if (!tagArg) {
    console.error("Usage: bun scripts/publish.ts <name>@<version> [--dry-run]");
    process.exit(1);
  }

  const { name, version } = parseTag(tagArg);

  const configPath = resolve(import.meta.dir, "../greasyfork.config.json");
  const config: Record<string, number> = JSON.parse(readFileSync(configPath, "utf-8"));
  const scriptId = lookupScriptId(config, name);

  const sourcePath = resolve(import.meta.dir, `../src/${name}/index.user.ts`);
  const source = readFileSync(sourcePath, "utf-8");
  const sourceVersion = extractVersion(source);
  assertVersionMatch(version, sourceVersion, `src/${name}/index.user.ts`);

  console.log(`✓ Version ${version} validated for "${name}" (Greasyfork ID: ${scriptId})`);

  if (isDryRun) {
    console.log("Dry run — skipping build and upload.");
    return;
  }

  const apiKey = process.env.GREASYFORK_API_KEY;
  if (!apiKey) {
    console.error("Error: GREASYFORK_API_KEY environment variable is not set");
    process.exit(1);
  }

  const build = Bun.spawnSync(["bun", "run", "build"], { stdout: "inherit", stderr: "inherit" });
  if (build.exitCode !== 0) process.exit(build.exitCode ?? 1);

  const scriptPath = resolve(import.meta.dir, `../dist/${name}.user.js`);
  const code = readFileSync(scriptPath, "utf-8");

  await uploadToGreasyfork(scriptId, code, apiKey);
  console.log(`✓ Published "${name}" to Greasyfork`);
}

if (import.meta.main) {
  main().catch((err: Error) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}
