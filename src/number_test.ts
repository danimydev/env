import { assertEquals } from "@std/assert";

import { number } from "./number.ts";

Deno.test("number", () => {
  assertEquals(number().type, "number");
  assertEquals(number().message, "Expected a number");
  assertEquals(number()["~standard"].types, undefined);
  assertEquals(typeof number()["~standard"].validate, "function");

  const validate = number()["~standard"].validate;

  Deno.test(validate.name, () => {
    assertEquals(validate(1), { value: 1 });
    assertEquals(validate("1"), { value: 1 });

    assertEquals(validate({}), {
      issues: [{ message: "Expected a number" }],
    });
    assertEquals(validate([]), {
      issues: [{ message: "Expected a number" }],
    });
    assertEquals(validate(true), {
      issues: [{ message: "Expected a number" }],
    });
    assertEquals(validate("string"), {
      issues: [{ message: "Expected a number" }],
    });
  });
});
