import { assertObjectMatch } from "@std/assert";
import { flag, number } from "./mod.ts";

Deno.test("schemas/zod", () => {
  assertObjectMatch(flag()["~standard"].validate("true"), { value: true });
  assertObjectMatch(flag()["~standard"].validate("on"), { value: true });
  assertObjectMatch(flag()["~standard"].validate("1"), { value: true });
  assertObjectMatch(flag()["~standard"].validate("false"), { value: false });
  assertObjectMatch(flag()["~standard"].validate("off"), { value: false });
  assertObjectMatch(flag()["~standard"].validate("0"), { value: false });
  assertObjectMatch(number()["~standard"].validate("1"), { value: 1 });
});
