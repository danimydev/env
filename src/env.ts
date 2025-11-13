import type { StandardSchema } from "./standard-schema.ts";
import { parse } from "./parse.ts";
import { getEnv, getRuntime } from "./runtime.ts";

/**
 * Reads and validates environment variables based on the provided schema.
 *
 * Main entry point of the `@danimydev/env` library.
 *
 * ```ts
 * import env, { string, number, boolean, object, optional } from "@danimydev/env";
 *
 * const config = env(
 *   object({
 *     NODE_ENV: string(),
 *     PORT: number(),
 *     DEBUG: optional(boolean()),
 *   })
 * );
 * ```
 *
 * @typeParam TSchema - The schema type.
 * @param schema - A `StandardSchema` describing the expected environment shape.
 * @returns The validated and typed environment object.
 * @throws {Error} If any variable fails validation.
 */
export function env<TSchema extends StandardSchema>(
  schema: TSchema,
): StandardSchema.InferOutput<TSchema> {
  const runtime = getRuntime();
  const env = getEnv(runtime);
  return parse(schema, env);
}
