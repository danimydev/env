import { assertEquals, assertInstanceOf } from "@std/assert";
import { SchemaError } from "@standard-schema/utils";
import * as valibotSchemas from "@danimydev/env/schemas/valibot";
import * as zodSchemas from "@danimydev/env/schemas/zod";
import { env } from "./mod.ts";

Deno.test("env", async () => {
  assertEquals(
    await env(
      { PORT: valibotSchemas.number() },
      { PORT: 8080 },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { PORT: valibotSchemas.number() },
      { PORT: "8080" },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: true },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "true" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "on" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "1" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: false },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "false" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "off" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "0" },
    ),
    { IS_ENABLED: false },
  );

  try {
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      [],
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  try {
    await env(
      { IS_ENABLED: valibotSchemas.flag() },
      { IS_ENABLED: "invalid" },
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  /////////

  assertEquals(
    await env(
      { PORT: zodSchemas.number() },
      { PORT: 8080 },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { PORT: zodSchemas.number() },
      { PORT: "8080" },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: true },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "true" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "on" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "1" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: false },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "false" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "off" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "0" },
    ),
    { IS_ENABLED: false },
  );

  try {
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      [],
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  try {
    await env(
      { IS_ENABLED: zodSchemas.flag() },
      { IS_ENABLED: "invalid" },
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }
});
