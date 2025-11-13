import { assertEquals } from "@std/assert";

import { string } from "./string.ts";
import { number } from "./number.ts";
import { boolean } from "./boolean.ts";

import { object } from "./object.ts";

Deno.test("object", () => {
  const objectSchema = object({
    name: string(),
    age: number(),
    active: boolean(),
  });

  assertEquals(objectSchema.type, "object");
  assertEquals(objectSchema.message, "Expected an object");

  const validate = objectSchema["~standard"].validate;

  assertEquals(validate([]), {
    issues: [{ message: objectSchema.message }],
  });
  assertEquals(validate(""), {
    issues: [{ message: objectSchema.message }],
  });
  assertEquals(validate(true), {
    issues: [{ message: objectSchema.message }],
  });
  assertEquals(validate(1), {
    issues: [{ message: objectSchema.message }],
  });

  Deno.test("validate", () => {
    assertEquals(
      object({
        name: string(),
        age: number(),
        active: boolean(),
      })["~standard"].validate({
        name: "Daniel Madrid",
        age: 26,
        active: true,
      }),
      {
        value: {
          name: "Daniel Madrid",
          age: 26,
          active: true,
        },
      },
    );

    assertEquals(
      object({
        name: string(),
        age: number(),
      })["~standard"].validate({
        name: "Daniel Madrid",
        age: 26,
        active: true,
      }),
      {
        value: {
          name: "Daniel Madrid",
          age: 26,
        },
      },
    );

    assertEquals(
      object({
        name: string(),
        age: number(),
      })["~standard"].validate({
        name: "Daniel Madrid",
        age: "26",
      }),
      {
        value: {
          name: "Daniel Madrid",
          age: 26,
        },
      },
    );

    assertEquals(
      object({
        name: string(),
        age: number(),
      })["~standard"].validate({
        name: "Daniel Madrid",
        age: "x",
      }),
      {
        issues: [
          {
            message: "Expected a number",
            path: [
              {
                key: "age",
              },
            ],
          },
        ],
      },
    );
  });
});
