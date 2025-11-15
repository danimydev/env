// deno-lint-ignore-file no-explicit-any

import { assertEquals } from "@std/assert";

import { getEnv, getRuntime } from "./runtime.ts";

Deno.test("runtime", () => {
  Deno.test("detects Deno", () => {
    assertEquals(getRuntime(), "Deno");
  });

  Deno.test("detects Bun", () => {
    const original = (globalThis as any)["Bun"];
    (globalThis as any)["Bun"] = { version: "1.0.0" };
    assertEquals(getRuntime(), "Bun");
    (globalThis as any)["Bun"] = original;
  });

  Deno.test("detects Node.js", () => {
    const original = (globalThis as any)["process"];
    (globalThis as any)["process"] = { versions: { node: "20.0.0" } };
    assertEquals(getRuntime(), "Node.js");
    (globalThis as any)["process"] = original;
  });
});

Deno.test("getEnv", () => {
  Deno.test("returns Bun.env", () => {
    const original = (globalThis as any)["Bun"];
    const mockEnv = { FOO: "bar", BAZ: undefined };
    (globalThis as any)["Bun"] = { version: "1.0.0", env: mockEnv };

    assertEquals(getEnv("Bun"), mockEnv);

    (globalThis as any)["Bun"] = original;
  });

  Deno.test("returns Node.js process.env", () => {
    const original = (globalThis as any)["process"];
    const mockEnv = { NODE_ENV: "test", UNSET: undefined };
    (globalThis as any)["process"] = {
      versions: { node: "20.0.0" },
      env: mockEnv,
    };

    assertEquals(getEnv("Node.js"), mockEnv);

    (globalThis as any)["process"] = original;
  });

  Deno.test("returns Deno.env.toObject()", () => {
    const original = (globalThis as any)["Deno"];
    const mockEnv = { HOME: "/home/test", TEMP: undefined };
    (globalThis as any)["Deno"] = {
      version: { deno: "1.40.0" },
      env: { toObject: () => mockEnv },
    };

    assertEquals(getEnv("Deno"), mockEnv);

    (globalThis as any)["Deno"] = original;
  });

  Deno.test("returns empty object for unknown runtime", () => {
    assertEquals(getEnv("Unknown"), {});
  });
});
