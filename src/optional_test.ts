import { assertEquals } from "@std/assert";

import { string } from "./string.ts";
import { boolean } from "./boolean.ts";
import { number } from "./number.ts";

import { optional } from "./optional.ts";

Deno.test("optional", () => {
  assertEquals(optional().type, "optional");
  assertEquals(optional().message, "Value is optional");
  assertEquals(optional().schema, undefined);
  assertEquals(optional()["~standard"].types, undefined);
  assertEquals(typeof optional()["~standard"].validate, "function");

  const validate = optional()["~standard"].validate;

  Deno.test(validate.name, () => {
    assertEquals(validate(undefined), { value: undefined });
    assertEquals(validate(null), { value: undefined });
    assertEquals(validate(true), { value: undefined });
    assertEquals(validate(false), { value: undefined });
    assertEquals(validate("string"), { value: undefined });
    assertEquals(validate(1), { value: undefined });
    assertEquals(validate(0), { value: undefined });
    assertEquals(validate({}), { value: undefined });
    assertEquals(validate([]), { value: undefined });
  });

  Deno.test("string", () => {
    const validate = optional(string())["~standard"].validate;

    Deno.test(validate.name, () => {
      assertEquals(validate(undefined), { value: undefined });
      assertEquals(validate(null), { value: undefined });
      assertEquals(validate("string"), { value: "string" });

      assertEquals(validate(true), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
      assertEquals(validate(false), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
      assertEquals(validate(1), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
      assertEquals(validate(0), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
      assertEquals(validate({}), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
      assertEquals(validate([]), {
        issues: [
          {
            message: "Expected a string",
          },
        ],
      });
    });
  });

  Deno.test("boolean", () => {
    const validate = optional(boolean())["~standard"].validate;

    Deno.test(validate.name, () => {
      assertEquals(validate(undefined), { value: undefined });
      assertEquals(validate(null), { value: undefined });
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

  Deno.test("number", () => {
    const validate = optional(number())["~standard"].validate;

    Deno.test(validate.name, () => {
      assertEquals(validate(undefined), { value: undefined });
      assertEquals(validate(null), { value: undefined });
      assertEquals(validate(1), { value: 1 });
      assertEquals(validate("1"), { value: 1 });

      assertEquals(validate(true), {
        issues: [
          {
            message: "Expected a number",
          },
        ],
      });
      assertEquals(validate(false), {
        issues: [
          {
            message: "Expected a number",
          },
        ],
      });
      assertEquals(validate({}), {
        issues: [
          {
            message: "Expected a number",
          },
        ],
      });
      assertEquals(validate([]), {
        issues: [
          {
            message: "Expected a number",
          },
        ],
      });
    });
  });
});
