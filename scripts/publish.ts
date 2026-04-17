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
  if (id === undefined) {
    throw new Error(`Script "${name}" not found in greasyfork.config.json`);
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
