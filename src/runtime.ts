/**
 * @module runtime
 *
 * Cross-runtime JavaScript environment detection and unified environment variable access.
 *
 * This module provides:
 * 1. Detection of the current runtime (`getRuntime`).
 * 2. Access to environment variables across different runtimes (`getEnv`).
 *
 * Supported runtimes:
 * - Bun
 * - Deno
 * - Node.js
 * - Browser
 * - Cloudflare Workers
 * - Unknown
 */

/**
 * Represents the possible JavaScript runtime environments.
 */
export type Runtime =
  | "Bun"
  | "Deno"
  | "Node.js"
  | "Browser"
  | "Cloudflare Worker"
  | "unknown";

/**
 * Detects the current JavaScript runtime environment.
 *
 * Checks for the presence of global objects unique to each runtime.
 *
 * @returns {Runtime} The detected runtime as a string.
 *
 * @example
 * ```ts
 * const runtime: Runtime = getRuntime();
 * console.log(runtime); // "Deno", "Node.js", "Bun", etc.
 * ```
 */
export function getRuntime(): Runtime {
  if (typeof Bun !== "undefined" && typeof Bun.version !== "undefined") {
    return "Bun";
  }

  if (typeof Deno !== "undefined" && typeof Deno.version !== "undefined") {
    return "Deno";
  }

  if (typeof process !== "undefined" && process.versions?.node) {
    return "Node.js";
  }

  if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    return "Browser";
  }

  if (
    typeof WebSocketPair !== "undefined" &&
    typeof fetch !== "undefined" &&
    typeof Response !== "undefined"
  ) {
    return "Cloudflare Worker";
  }

  return "unknown";
}

/**
 * Returns environment variables for a given runtime.
 *
 * Provides a unified interface to access environment variables across
 * different JavaScript runtimes. For runtimes without native environment
 * variables (Browser, Cloudflare Worker, unknown), it returns an empty object.
 *
 * @param runtime - The runtime environment string
 * @returns An object containing environment variables as key-value pairs
 *
 * @example
 * ```ts
 * const env = getEnv("Deno");
 * console.log(env["HOME"]);
 * ```
 */
export function getEnv(runtime: Runtime): Record<string, string | undefined> {
  switch (runtime) {
    case "Deno":
      if (
        typeof Deno !== "undefined" && typeof Deno.env?.toObject === "function"
      ) {
        return Deno.env.toObject();
      }
      return {};

    case "Node.js":
      if (typeof process !== "undefined" && process.env) {
        return { ...process.env };
      }
      return {};

    case "Bun":
      if (typeof Bun !== "undefined" && Bun.env) {
        return { ...Bun.env };
      }
      return {};

    case "Browser":
    case "Cloudflare Worker":
    default:
      return {};
  }
}

/* Global runtime objects declarations (for TypeScript type checking) */

/**
 * Bun global object.
 */
declare const Bun: {
  version: string;
  env: Record<string, string | undefined>;
} | undefined;

/**
 * Node.js process global object.
 */
declare const process: {
  versions?: { node?: string };
  env?: Record<string, string | undefined>;
} | undefined;

/**
 * Deno global object.
 */
declare const Deno: {
  version: Record<string, string>;
  env: {
    toObject(): Record<string, string | undefined>;
  };
} | undefined;

/**
 * Browser global window object.
 */
declare const window: {
  document?: unknown;
} | undefined;

/**
 * Cloudflare Workers globals.
 */
declare const WebSocketPair: unknown;
declare const fetch: unknown;
declare const Response: unknown;
