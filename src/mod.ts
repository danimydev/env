/**
 * @module @danimydev/env
 *
 * Provides a unified runtime for parsing objects against any schema
 * that implements the StandardSchemaV1 specification.
 *
 * This module works with:
 * - custom StandardSchemaV1 schemas,
 * - Valibot schemas adapted to StandardSchemaV1,
 * - Zod schemas adapted to StandardSchemaV1,
 * - or any future libraries implementing StandardSchemaV1.
 *
 * The main exported function is `env()`.
 */

import type { StandardSchemaV1 } from "./lib/standard-schema/spec.ts";
import { SchemaError } from "./lib/standard-schema/utils.ts";

/**
 * @internal
 *
 * Validates an input value using a StandardSchemaV1 and returns
 * the parsed output. Supports asynchronous validators.
 *
 * @typeParam T — A StandardSchemaV1 instance
 * @param schema — The schema used to validate input
 * @param input — The value to validate
 * @returns The typed validated output
 * @throws {SchemaError} if validation fails
 *
 * @example
 * ```ts
 * const value = await parse(booleanSchema, "true"); // true
 * ```
 */
async function parse<T extends StandardSchemaV1>(
  schema: T,
  input: unknown,
): Promise<StandardSchemaV1.InferOutput<T>> {
  let result = schema["~standard"].validate(input);

  if (result instanceof Promise) result = await result;

  if (result.issues) {
    throw new SchemaError(result.issues);
  }

  return result.value;
}

/**
 * @internal
 *
 * Creates a StandardSchemaV1 record schema from a shape of nested schemas.
 *
 * Validates that input is an object, runs each field through its
 * schema, and accumulates issues with proper path information.
 *
 * @typeParam TShape — A record of keys to StandardSchemaV1 schemas
 * @param shape — The schema shape mapping keys to schemas
 * @param message — Error message when input is not a valid object
 * @returns A StandardSchemaV1 schema representing the record
 *
 * @example
 * ```ts
 * const configSchema = record({
 *   ENABLED: booleanSchema,
 *   TIMEOUT: numberSchema
 * });
 *
 * const result = await configSchema["~standard"].validate({
 *   ENABLED: "true",
 *   TIMEOUT: "100"
 * });
 *
 * // result.value => { ENABLED: true, TIMEOUT: 100 }
 * ```
 */
function record<TShape extends Record<string, StandardSchemaV1>>(
  shape: TShape,
  message = "Invalid record",
):
  & StandardSchemaV1<
    { [K in keyof TShape]: StandardSchemaV1.InferOutput<TShape[K]> }
  >
  & {
    type: "record";
    shape: TShape;
  } {
  return {
    type: "record",
    shape,
    "~standard": {
      version: 1,
      vendor: "valizod",

      async validate(value: unknown) {
        if (
          typeof value !== "object" || value === null || Array.isArray(value)
        ) {
          return { issues: [{ message, path: [] }] };
        }

        const obj = value as Record<string, unknown>;

        type Output = {
          [K in keyof TShape]: StandardSchemaV1.InferOutput<TShape[K]>;
        };
        const result = {} as Output;
        const issues: StandardSchemaV1.Issue[] = [];

        for (const key in shape) {
          const schema = shape[key];
          const validated = await schema["~standard"].validate(obj[key]);

          if ("issues" in validated && validated.issues) {
            validated.issues.forEach((issue) => {
              issues.push({
                message: issue.message,
                path: [{ key }, ...(issue.path ?? [])],
              });
            });
          } else if ("value" in validated) {
            result[key as keyof TShape] = validated.value;
          }
        }

        if (issues.length > 0) {
          return { issues };
        }

        return { value: result };
      },
    },
  };
}

/**
 * Parses a "record-like" input object against a shape of StandardSchemaV1 schemas.
 *
 * This is the primary exported function of the module. It is fully asynchronous
 * and supports any schema implementing the StandardSchemaV1 specification.
 *
 * ## Behavior
 * 1. Wraps the provided shape into a `record()` schema
 * 2. Validates each property asynchronously
 * 3. Throws a `SchemaError` if any issues occur
 * 4. Returns a strongly typed output object
 *
 * @typeParam TSchema — The type of the schemas in the shape
 * @typeParam TShape — The shape of the configuration object
 * @param shape — Object mapping keys to schemas
 * @param rawRecord — The input object to validate (e.g., `Deno.env.toObject()`)
 * @returns A Promise resolving to a typed object with validated values
 *
 * @throws {SchemaError} If validation fails for any key in the shape
 *
 * @example
 * ```ts
 * import { env } from "@danimydev/env";
 * import { boolean, number } from "@danimydev/env/schemas/valibot";
 *
 * const config = await env(
 *   {
 *     DEBUG: boolean(),
 *     PORT: number()
 *   },
 *   Deno.env.toObject()
 * );
 *
 * console.log(config.DEBUG); // boolean
 * console.log(config.PORT);  // number
 * ```
 */
export async function env<
  TSchema extends StandardSchemaV1,
  TShape extends Record<string, TSchema>,
>(
  shape: TShape,
  rawRecord: unknown,
): Promise<{ [K in keyof TShape]: StandardSchemaV1.InferOutput<TShape[K]> }> {
  return await parse(record(shape), rawRecord);
}
