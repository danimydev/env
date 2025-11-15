# @danimydev/env

A TypeScript-first, runtime-safe environment variable reader. Works in Node.js,
Deno and Bun. If you want you can just copy the source code or install it via
[jsr](https://jsr.io/@danimydev/env).

## Usage

```typescript
import env, { boolean, number, optional, string } from "@danimydev/env";

const config = env({
  NODE_ENV: string(), // string,
  PORT: number(), // number,
  DEBUG: optional(boolean()), // boolean | undefined
});
```

## Highlights

- ✅ TypeScript-first: fully typed environment variable schemas.
- 🌍 Cross-runtime: works in Node.js, Deno and Bun.
- 💡 Flexible: supports optional variables.
- ⚡ Lightweight: zero dependencies, minimal overhead.

## License

This project is released into the public domain under
[The Unlicense](https://unlicense.org).

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this
software for any purpose.

If you like the project, feel free to ⭐
[@danimydev/env on GitHub](https://github.com/danimydev/env)!
