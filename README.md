# @danimydev/env

A TypeScript-first, runtime-safe object validator for environment-like records.
It works with any schema implementing the StandardSchemaV1 spec, including
Valibot, Zod, or custom schemas.

## Usage

```typescript
import { env } from "@danimydev/env";
import { boolean, enum as enum_, number } from "@zod/zod";

const typeSafeEnv = await env(
  {
    NODE_ENV: enum_(["development", "production"]),
    PORT: number(),
    IS_ENABLED: boolean(),
  },
  Deno.env.toObject(), // or process.env in Node.js
);

console.log(typeSafeEnv.NODE_ENV);   // "development" | "production"
console.log(typeSafeEnv.PORT);       // number
console.log(typeSafeEnv.IS_ENABLED); // boolean
```

## License

Released under The Unlicense — free to use, copy, modify, publish, or
distribute. ⭐ Star on GitHub if you like it!
