/**
 * @module @danimydev/env/schemas/zod
 *
 * Enhanced Zod schemas used by `@danimydev/env`.
 *
 * These helpers extend Zod's numeric and boolean schemas to accept common
 * real-world data formats such as string-based environment variables.
 *
 * ## Included Schemas
 *
 * - `boolean()` — Recognizes `"true"`, `"on"`, `"false"`, `"off"`, `"1"`, `"0"`, etc.
 * - `number()` — Converts numeric strings using `Number(value)`.
 *
 * Both functions:
 *
 * - rely on `z.preprocess()` for normalization
 * - validate final output using strict Zod primitives
 *
 * @see @danimydev/env/schemas/valibot for the Valibot equivalents.
 * @see https://jsr.io/@danimydev/env
 */

import { z } from "@zod/zod";

/**
 * Creates a flexible boolean schema that accepts common truthy/falsy
 * string formats in addition to native booleans.
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
 * ## Example
 *
 * ```ts
 * import { boolean } from "@danimydev/env/schemas/zod";
 *
 * const Bool = boolean();
 *
 * Bool.parse("on");   // true
 * Bool.parse("0");    // false
 * Bool.parse("nope"); // ❌ error
 * ```
 *
 * @returns A Zod schema producing a strict `boolean`.
 */
export function boolean(): z.ZodPipe<
  z.ZodTransform<unknown, unknown>,
  z.ZodBoolean
> {
  return z.preprocess((value) => {
    if (typeof value === "boolean") return value;

    if (typeof value === "string") {
      if (["true", "on", "1"].includes(value)) return true;
      if (["false", "off", "0"].includes(value)) return false;
    }

    return value;
  }, z.boolean());
}

/**
 * Creates a Zod number schema that accepts numeric strings and
 * converts them via `Number(value)`.
 *
 * ## Accepted Inputs
 *
 * - `number`
 * - `string` → numeric strings only
 *
 * ⚠️ Invalid numeric strings produce `NaN`, which Zod rejects.
 *
 * ## Example
 *
 * ```ts
 * import { number } from "@danimydev/env/schemas/zod";
 *
 * const Num = number();
 *
 * Num.parse("10");   // 10
 * Num.parse(5);      // 5
 * Num.parse("abc");  // ❌ error
 * ```
 *
 * @returns A Zod schema producing a strict `number`.
 */
export function number(): z.ZodPipe<
  z.ZodTransform<unknown, unknown>,
  z.ZodNumber
> {
  return z.preprocess((value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") return Number(value);
    return value;
  }, z.number());
}
