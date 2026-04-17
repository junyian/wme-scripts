import { describe, test, expect } from "bun:test";
import { parseTag } from "./publish";

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
