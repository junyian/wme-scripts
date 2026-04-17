import { describe, test, expect } from "bun:test";
import { parseTag, lookupScriptId, extractVersion, assertVersionMatch } from "./publish";

describe("parseTag", () => {
  test("parses valid tag into name and version", () => {
    expect(parseTag("hello-world@1.0.0")).toEqual({ name: "hello-world", version: "1.0.0" });
  });

  test("parses tag with pre-release version", () => {
    expect(parseTag("sdk-playground@2.1.0-beta.1")).toEqual({
      name: "sdk-playground",
      version: "2.1.0-beta.1",
    });
  });

  test("throws on tag with no @", () => {
    expect(() => parseTag("hello-world")).toThrow('Invalid tag format: "hello-world"');
  });

  test("throws on tag with no version after @", () => {
    expect(() => parseTag("hello-world@")).toThrow('Invalid tag format: "hello-world@"');
  });
});

describe("lookupScriptId", () => {
  test("returns script ID when name is found", () => {
    expect(lookupScriptId({ "hello-world": 12345 }, "hello-world")).toBe(12345);
  });

  test("throws with descriptive error when name is missing", () => {
    expect(() => lookupScriptId({ "hello-world": 12345 }, "unknown-script")).toThrow(
      'Script "unknown-script" not found in greasyfork.config.json'
    );
  });
});

describe("extractVersion", () => {
  test("extracts version from double-quoted defineUserScript field", () => {
    const source = `export default defineUserScript({ name: "Test", version: "1.2.3" })`;
    expect(extractVersion(source)).toBe("1.2.3");
  });

  test("extracts version from single-quoted defineUserScript field", () => {
    const source = `export default defineUserScript({ version: '0.9.0', name: 'Test' })`;
    expect(extractVersion(source)).toBe("0.9.0");
  });

  test("throws when no version field found", () => {
    expect(() => extractVersion("export default defineUserScript({ name: 'No version' })")).toThrow(
      "Could not find version field in defineUserScript()"
    );
  });
});

describe("assertVersionMatch", () => {
  test("does not throw when versions match", () => {
    expect(() => assertVersionMatch("1.0.0", "1.0.0", "src/foo/index.user.ts")).not.toThrow();
  });

  test("throws with both versions and file path when versions differ", () => {
    expect(() =>
      assertVersionMatch("1.0.1", "1.0.0", "src/hello-world/index.user.ts")
    ).toThrow(
      "Version mismatch: tag specifies 1.0.1 but src/hello-world/index.user.ts has 1.0.0"
    );
  });
});
