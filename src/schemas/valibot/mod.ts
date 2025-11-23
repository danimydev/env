/**
 * @module @danimydev/env/schemas/valibot
 *
 * Enhanced Valibot schemas used by `@danimydev/env`.
 *
 * These helpers extend the built-in Valibot primitives to accept common
 * real-world input formats such as strings from environment variables,
 * query parameters, or form values.
 *
 * ## Included Schemas
 *
 * - `boolean()` — Accepts `"true"`, `"false"`, `"on"`, `"off"`, `"1"`, `"0"`, etc.
 * - `number()` — Accepts numeric strings, converts with `Number(value)`.
 *
 * Both schemas:
 *
 * - handle mixed input types gracefully
 * - transform values before final validation
 * - guarantee strict typed output (`boolean` or `number`)
 *
 * @see @danimydev/env/schemas/zod for the Zod equivalents.
 * @see https://jsr.io/@danimydev/env
 */

import * as v from "@valibot/valibot";

/**
 * Creates a flexible boolean schema that accepts common "truthy" and "falsy"
 * string values in addition to native boolean values.
 *
 * ## Accepted Inputs
 *
 * ### Truthy → `true`
 * - `"true"`
 * - `"on"`
 * - `"1"`
 * - `true`
 *
 * ### Falsy → `false`
 * - `"false"`
 * - `"off"`
 * - `"0"`
 * - `false`
 *
 * ## Behavior
 *
 * 1. Accepts:
 *    - booleans
 *    - strings representing booleans
 * 2. Converts string values to real booleans.
 * 3. Validates the result using `vBoolean()`.
 *
 * ## Example
 *
 * ```ts
 * import { boolean } from "@danimydev/env/schemas/valibot";
 *
 * const Bool = boolean();
 *
 * Bool.parse("on");      // true
 * Bool.parse("false");   // false
 * Bool.parse(true);      // true
 * Bool.parse("invalid"); // ❌ error
 * ```
 *
 * @returns A Valibot schema that outputs a strict `boolean`.
 */
export function boolean(): v.SchemaWithPipe<
  readonly [
    v.UnionSchema<
      [v.BooleanSchema<undefined>, v.StringSchema<undefined>],
      undefined
    >,
    v.TransformAction<string | boolean, string | boolean>,
    v.BooleanSchema<undefined>,
  ]
> {
  return v.pipe(
    v.union([v.boolean(), v.string()]),
    v.transform((value) => {
      if (typeof value === "boolean") return value;
      if (["true", "on", "1"].includes(value)) return true;
      if (["false", "off", "0"].includes(value)) return false;
      return value;
    }),
    v.boolean(),
  );
}

/**
 * Creates a flexible number schema that accepts both numeric values
 * and numeric strings.
 *
 * Useful for environment variables, CLI arguments, form inputs, and
 * other cases where numbers often appear as strings.
 *
 * ## Accepted Inputs
 *
 * - `number` — returned directly
 * - `string` — converted via `Number(value)`
 *
 * ## Behavior
 *
 * 1. Accepts numbers and number-like strings.
 * 2. Converts string values using `Number(value)`.
 * 3. Validates with `vNumber()` — rejects `NaN`.
 *
 * ⚠️ Invalid numeric strings (e.g. `"abc"`) produce `NaN`, causing a
 * validation error.
 *
 * ## Example
 *
 * ```ts
 * import { number } from "@danimydev/env/schemas/valibot";
 *
 * const Num = number();
 *
 * Num.parse("42");  // 42
 * Num.parse(10);    // 10
 * Num.parse("abc"); // ❌ error (NaN)
 * ```
 *
 * @returns A Valibot schema that outputs a strict `number`.
 */
export function number(): v.SchemaWithPipe<
  readonly [
    v.UnionSchema<
      [v.NumberSchema<undefined>, v.StringSchema<undefined>],
      undefined
    >,
    v.TransformAction<string | number, number>,
    v.NumberSchema<undefined>,
  ]
> {
  return v.pipe(
    v.union([v.number(), v.string()]),
    v.transform((value) => {
      if (typeof value === "number") return value;
      return Number(value);
    }),
    v.number(),
  );
}
