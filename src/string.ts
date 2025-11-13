import type { StandardSchema } from "./standard-schema.ts";

/**
 * A schema representing a string value.
 *
 * Validates that the input is a string or a `String` object,
 * coercing `String` objects into primitive strings.
 *
 * ### Validation Result:
 * - Returns the validated string on success.
 * - Returns a failure with a single issue containing the provided message on failure.
 */
export interface StringSchema extends StandardSchema<string> {
  /** The literal type of the schema */
  type: "string";

  /** The error message returned if validation fails */
  message: string;
}

/**
 * Creates a `StringSchema` for validating string values.
 *
 * ```ts
 * string().validate("hello");         // { value: "hello" }
 * string().validate(new String("hi")); // { value: "hi" }
 * string().validate(123);              // { issues: [{ message: "Expected a string" }] }
 * ```
 *
 * @param message - Optional error message to return if validation fails. Defaults to `"Expected a string"`.
 * @returns A `StringSchema` instance that can validate string values.
 */
export function string(message: string = "Expected a string"): StringSchema {
  return {
    type: "string",
    message,
    "~standard": {
      validate(value) {
        return typeof value === "string" || value instanceof String
          ? { value: value.toString() }
          : { issues: [{ message }] };
      },
    },
  };
}
