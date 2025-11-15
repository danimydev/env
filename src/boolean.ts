import type { StandardSchemaV1 } from "./standard.ts";

/**
 * A schema representing a boolean value.
 *
 * Validates boolean values, numeric 0/1, and string representations
 * such as `"true"`, `"false"`, `"1"`, `"0"`.
 */
export interface BooleanSchema extends StandardSchemaV1<boolean> {
  /** The literal type of the schema */
  type: "boolean";

  /** The error message returned if validation fails */
  message: string;
}

/**
 * Creates a `BooleanSchema` for validating boolean values.
 *
 * ```ts
 * boolean().validate(true);          // { value: true }
 * boolean().validate("1");           // { value: true }
 * boolean().validate("false");       // { value: false }
 * boolean().validate(0);             // { value: false }
 * boolean().validate("maybe");       // { issues: [{ message: "Expected a boolean" }] }
 * ```
 *
 * @param message - Optional error message to return if validation fails. Defaults to `"Expected a boolean"`.
 * @returns A `BooleanSchema` instance that can validate boolean values.
 */
export function boolean(message: string = "Expected a boolean"): BooleanSchema {
  return {
    type: "boolean",
    message: message,
    "~standard": {
      validate(value) {
        if (typeof value === "boolean") return { value };

        if (typeof value === "string" || value instanceof String) {
          const primitive = value.toString();

          if (["TRUE", "True", "true", "1"].includes(primitive)) {
            return { value: true };
          }

          if (["FALSE", "False", "false", "0"].includes(primitive)) {
            return { value: false };
          }
        }

        if (typeof value === "number") {
          if (value === 1) {
            return { value: true };
          }

          if (value === 0) {
            return { value: false };
          }
        }

        return { issues: [{ message }] };
      },
    },
  };
}
