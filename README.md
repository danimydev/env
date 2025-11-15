# @danimydev/env

A TypeScript-first, runtime-safe environment variable reader. Works in Node.js,
Deno and Bun.

## Usage

```typescript
import env, { boolean, number, object, optional, string } from "@danimydev/env";

const config = env(
  object({
    NODE_ENV: string(),
    PORT: number(),
    DEBUG: optional(boolean()),
  }),
);

console.log(config.NODE_ENV);
console.log(config.PORT);
console.log(config.DEBUG);
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
