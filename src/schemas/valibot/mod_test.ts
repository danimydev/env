import { assertEquals } from "@std/assert";
import { boolean, number } from "./mod.ts";

Deno.test("valibot", () => {
  Deno.test("boolean", () => {
    assertEquals(boolean()["~standard"].validate("true"), { value: true });
    assertEquals(boolean()["~standard"].validate("on"), { value: true });
    assertEquals(boolean()["~standard"].validate("1"), { value: true });
    assertEquals(boolean()["~standard"].validate("false"), { value: false });
    assertEquals(boolean()["~standard"].validate("off"), { value: false });
    assertEquals(boolean()["~standard"].validate("0"), { value: false });
  });

  Deno.test("number", () => {
    assertEquals(number()["~standard"].validate("1"), { value: 1 });
  });
});
