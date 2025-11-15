import type { StandardSchemaV1 } from "./standard.ts";

/**
 * A schema representing an optional value.
 *
 * Wraps another schema and allows `undefined` or `null` values.
 */
export interface OptionalSchema<
  TSchema extends StandardSchemaV1<string | number | boolean>,
> extends StandardSchemaV1<StandardSchemaV1.InferOutput<TSchema> | undefined> {
  /** The literal type of the schema */
  type: "optional";

  /** The error message returned if validation fails */
  message: string;

  /** The underlying schema for validation */
  schema?: TSchema;
}

/**
 * Creates an `OptionalSchema` that allows `undefined` values or validates
 * the input with the provided schema.
 *
 * ```ts
 * optional(number()).validate(undefined); // { value: undefined }
 * optional(number()).validate("42");      // { value: 42 }
 * ```
 *
 * @param schema - Optional schema to validate the value if defined.
 * @param message - Optional error message. Defaults to `"Value is optional"`.
 * @returns An `OptionalSchema` instance.
 */
export function optional<
  TSchema extends StandardSchemaV1<string | number | boolean>,
>(schema?: TSchema, message = "Value is optional"): OptionalSchema<TSchema> {
  return {
    type: "optional",
    message,
    schema,
    "~standard": {
      validate(value) {
        if (value === undefined || value === null || schema === undefined) {
          return { value: undefined };
        }

        return schema["~standard"].validate(value);
      },
    },
  };
}
