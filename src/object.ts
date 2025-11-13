import type { StandardSchema } from "./standard-schema.ts";
import type { OptionalSchema } from "./optional.ts";

/**
 * A schema representing an object with a fixed shape.
 *
 * Each property must conform to the provided schemas.
 */
export interface ObjectSchema<
  TShape extends Record<
    string,
    | StandardSchema<string | number | boolean>
    | OptionalSchema<StandardSchema<string | number | boolean>>
  >,
> extends
  StandardSchema<
    Record<string, unknown>,
    { [K in keyof TShape]: StandardSchema.InferOutput<TShape[K]> }
  > {
  /** The literal type of the schema */
  type: "object";

  /** The shape of the object with schemas for each property */
  shape: TShape;

  /** The error message returned if validation fails */
  message: string;
}

/**
 * Creates an `ObjectSchema` for validating structured objects.
 *
 * ```ts
 * const schema = object({
 *   name: string(),
 *   age: optional(number()),
 * });
 * schema.validate({ name: "Alice", age: 30 });
 * ```
 *
 * @param shape - An object mapping property names to schemas.
 * @param message - Optional error message. Defaults to `"Expected an object"`.
 * @returns An `ObjectSchema` instance.
 */
export function object<
  TShape extends Record<
    string,
    | StandardSchema<string | number | boolean>
    | OptionalSchema<StandardSchema<string | number | boolean>>
  >,
>(shape: TShape, message = "Expected an object"): ObjectSchema<TShape> {
  return {
    type: "object",
    shape,
    message,
    "~standard": {
      validate(value) {
        if (
          typeof value !== "object" || value === null || Array.isArray(value)
        ) {
          return { issues: [{ message }] };
        }

        const result: Record<string, unknown> = {};
        const issues: StandardSchema.Issue[] = [];

        for (const key in shape) {
          const fieldSchema = shape[key];
          const fieldValue = (value as Record<string, unknown>)[key];
          const validation = fieldSchema?.["~standard"].validate(fieldValue);

          if (validation) {
            if (validation.issues) {
              for (const issue of validation.issues) {
                issues.push({
                  ...issue,
                  path: [{ key }, ...(issue.path ?? [])],
                });
              }
            } else {
              result[key] = validation.value;
            }
          }
        }

        return issues.length > 0
          ? { issues }
          : { value: result } as StandardSchema.SuccessResult<
            { [K in keyof TShape]: StandardSchema.InferOutput<TShape[K]> }
          >;
      },

      types: {
        input: {} as Record<string, unknown>,
        output: {} as {
          [K in keyof TShape]: StandardSchema.InferOutput<TShape[K]>;
        },
      },
    },
  };
}
