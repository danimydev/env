import type { StandardSchemaV1 } from "./standard.ts";

/**
 * A schema representing a numeric value.
 *
 * Validates that the input is a number or a string representing a number.
 */
export interface NumberSchema extends StandardSchemaV1<number> {
  /** The literal type of the schema */
  type: "number";

  /** The error message returned if validation fails */
  message: string;
}

/**
 * Creates a `NumberSchema` for validating numeric values.
 *
 * ```ts
 * number().validate(42);      // { value: 42 }
 * number().validate("3.14");  // { value: 3.14 }
 * number().validate("abc");   // { issues: [{ message: "Expected a number" }] }
 * ```
 *
 * @param message - Optional error message to return if validation fails. Defaults to `"Expected a number"`.
 * @returns A `NumberSchema` instance that can validate numeric values.
 */
export function number(message: string = "Expected a number"): NumberSchema {
  return {
    type: "number",
    message,
    "~standard": {
      validate(value) {
        const parsed = typeof value === "number"
          ? value
          : typeof value === "string" && value.trim() !== ""
          ? Number(value)
          : NaN;

        return !Number.isNaN(parsed)
          ? { value: parsed }
          : { issues: [{ message }] };
      },
    },
  };
}
