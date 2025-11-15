import type { StandardSchemaV1 } from "./standard.ts";
import type { OptionalSchema } from "./optional.ts";
import { object } from "./object.ts";
import { getEnv, getRuntime } from "./runtime.ts";
import { parse } from "./parse.ts";

/**
 * Reads and validates environment variables based on the provided record of schemas.
 *
 * Main entry point of the `@danimydev/env` library.
 *
 * ```ts
 * import env, { string, number, boolean, optional } from "@danimydev/env";
 *
 * const safeEnv = env({
 *     NODE_ENV: string(),
 *     PORT: number(),
 *     DEBUG: optional(boolean()),
 * });
 * ```
 *
 * @typeParam TSchema - The schema type.
 * @param schema - A `StandardSchemaV1` describing the expected environment shape.
 * @returns The validated and typed environment object.
 * @throws {Error} If any variable fails validation.
 */
export function env<
  TShape extends Record<
    string,
    | StandardSchemaV1<string | number | boolean>
    | OptionalSchema<StandardSchemaV1<string | number | boolean>>
  >,
>(
  shape: TShape,
): { [K in keyof TShape]: StandardSchemaV1.InferOutput<TShape[K]> } {
  return parse(object(shape), getEnv(getRuntime()));
}
