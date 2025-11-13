import { assertEquals } from "@std/assert";

import { boolean } from "./boolean.ts";

Deno.test("boolean", () => {
  assertEquals(boolean().type, "boolean");
  assertEquals(boolean().message, "Expected a boolean");
  assertEquals(boolean()["~standard"].types, undefined);
  assertEquals(typeof boolean()["~standard"].validate, "function");

  const validate = boolean()["~standard"].validate;

  Deno.test(validate.name, () => {
    assertEquals(validate(true), { value: true });
    assertEquals(validate(false), { value: false });
    assertEquals(validate("1"), { value: true });
    assertEquals(validate("true"), { value: true });
    assertEquals(validate("True"), { value: true });
    assertEquals(validate("TRUE"), { value: true });
    assertEquals(validate(new String("1")), {
      value: true,
    });
    assertEquals(validate(new String("true")), {
      value: true,
    });
    assertEquals(validate(new String("True")), {
      value: true,
    });
    assertEquals(validate(new String("TRUE")), {
      value: true,
    });
    assertEquals(validate("0"), { value: false });
    assertEquals(validate("false"), { value: false });
    assertEquals(validate("False"), { value: false });
    assertEquals(validate("FALSE"), { value: false });
    assertEquals(validate(new String("0")), {
      value: false,
    });
    assertEquals(validate(new String("false")), {
      value: false,
    });
    assertEquals(validate(new String("False")), {
      value: false,
    });
    assertEquals(validate(new String("FALSE")), {
      value: false,
    });
    assertEquals(validate(1), { value: true });
    assertEquals(validate(0), { value: false });

    assertEquals(validate("string"), {
      issues: [{ message: "Expected a boolean" }],
    });
    assertEquals(validate({}), {
      issues: [{ message: "Expected a boolean" }],
    });
    assertEquals(validate([]), {
      issues: [{ message: "Expected a boolean" }],
    });
  });
});
