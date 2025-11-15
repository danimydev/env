import type { StandardSchemaV1 } from "./standard.ts";

/**
 * Validates and parses an input according to a schema.
 *
 * - Returns the typed value on success.
 * - Throws an `Error` with detailed issues if validation fails.
 *
 * ```ts
 * parse(number(), "42"); // returns 42
 * parse(number(), "abc"); // throws Error("Expected a number")
 * ```
 *
 * @typeParam TSchema - The schema type.
 * @param schema - The `StandardSchemaV1` to validate against.
 * @param input - The value to validate.
 * @returns The validated value.
 * @throws {Error} If validation fails.
 */
export function parse<TSchema extends StandardSchemaV1>(
  schema: TSchema,
  input: unknown,
): StandardSchemaV1.InferOutput<TSchema> {
  const result = schema["~standard"].validate(input);

  if (result.issues) {
    const errorMessage = result.issues
      .map((issue) => {
        if (issue.path) {
          return issue.path
            .map((e) => (typeof e === "object" ? e.key : e))
            .join(".");
        }
        return issue.message;
      })
      .join(", ");

    throw new Error(errorMessage);
  }

  return result.value;
}
