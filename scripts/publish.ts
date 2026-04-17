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
