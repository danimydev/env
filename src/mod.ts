import { object } from "./object.ts";
import { string } from "./string.ts";
import { number } from "./number.ts";
import { boolean } from "./boolean.ts";
import { optional } from "./optional.ts";
import { parse } from "./parse.ts";
import { env } from "./env.ts";

/**
 * Main exports of the `@danimydev/env` library.
 *
 * Provides schemas and utilities to read and validate environment variables in TypeScript:
 * - `env`: The primary function to read and validate environment variables.
 * - `parse`: Parse and validate arbitrary input against a schema.
 * - `string`, `number`, `boolean`, `object`, `optional`: Standard schema constructors.
 */
export { boolean, env, number, object, optional, parse, string };

export default env;
