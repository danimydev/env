import { assertEquals, assertThrows } from "@std/assert";

import { object } from "./object.ts";
import { string } from "./string.ts";
import { number } from "./number.ts";
import { boolean } from "./boolean.ts";

import { parse } from "./parse.ts";

Deno.test("parse", () => {
  assertEquals(
    parse(
      object({
        name: string(),
        age: number(),
        active: boolean(),
      }),
      {
        name: "Daniel Madrid",
        age: 26,
        active: true,
      },
    ),
    {
      name: "Daniel Madrid",
      age: 26,
      active: true,
    },
  );

  assertEquals(
    parse(
      object({
        name: string(),
        age: number(),
        active: boolean(),
      }),
      {
        name: "Daniel Madrid",
        age: "26",
        active: "true",
      },
    ),
    {
      name: "Daniel Madrid",
      age: 26,
      active: true,
    },
  );

  assertEquals(
    parse(
      object({
        name: string(),
        age: number(),
      }),
      {
        name: "Daniel Madrid",
        age: 26,
        active: true,
      },
    ),
    {
      name: "Daniel Madrid",
      age: 26,
    },
  );

  assertThrows(
    () =>
      parse(
        object({
          name: string(),
          age: number(),
          active: boolean(),
        }),
        {
          name: "Daniel Madrid",
          age: "x",
          active: true,
        },
      ),
  );
});
