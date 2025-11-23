import { assertEquals, assertInstanceOf } from "@std/assert";
import * as envValibot from "@danimydev/env/schemas/valibot";
import * as envZod from "@danimydev/env/schemas/zod";
import { SchemaError } from "./lib/standard-schema/utils.ts";
import { env } from "./mod.ts";

Deno.test("env", async () => {
  assertEquals(
    await env(
      { PORT: envValibot.number() },
      { PORT: 8080 },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { PORT: envValibot.number() },
      { PORT: "8080" },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: true },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "true" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "on" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "1" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: false },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "false" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "off" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "0" },
    ),
    { IS_ENABLED: false },
  );

  try {
    await env(
      { IS_ENABLED: envValibot.boolean() },
      [],
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  try {
    await env(
      { IS_ENABLED: envValibot.boolean() },
      { IS_ENABLED: "invalid" },
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  /////////

  assertEquals(
    await env(
      { PORT: envZod.number() },
      { PORT: 8080 },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { PORT: envZod.number() },
      { PORT: "8080" },
    ),
    { PORT: 8080 },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: true },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "true" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "on" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "1" },
    ),
    { IS_ENABLED: true },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: false },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "false" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "off" },
    ),
    { IS_ENABLED: false },
  );

  assertEquals(
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "0" },
    ),
    { IS_ENABLED: false },
  );

  try {
    await env(
      { IS_ENABLED: envZod.boolean() },
      [],
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }

  try {
    await env(
      { IS_ENABLED: envZod.boolean() },
      { IS_ENABLED: "invalid" },
    );
  } catch (e) {
    assertInstanceOf(e, SchemaError);
  }
});
