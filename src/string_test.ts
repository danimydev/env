import { assertEquals } from "@std/assert";

import { string } from "./string.ts";

Deno.test("string", () => {
  assertEquals(string().type, "string");
  assertEquals(string().message, "Expected a string");
  assertEquals(string()["~standard"].types, undefined);
  assertEquals(typeof string()["~standard"].validate, "function");

  const validate = string()["~standard"].validate;

  Deno.test(validate.name, () => {
    assertEquals(validate("string"), { value: "string" });
    assertEquals(validate(""), { value: "" });
    assertEquals(validate(new String()), {
      value: new String().toString(),
    });

    assertEquals(validate(true), {
      issues: [{ message: "Expected a string" }],
    });
    assertEquals(validate(1), {
      issues: [{ message: "Expected a string" }],
    });
    assertEquals(validate({}), {
      issues: [{ message: "Expected a string" }],
    });
    assertEquals(validate([]), {
      issues: [{ message: "Expected a string" }],
    });
  });
});
