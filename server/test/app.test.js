import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "../src/app.js";

test("contact API reports health and rejects invalid input", async (context) => {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const healthResponse = await fetch(`${baseUrl}/api/health`);
  assert.deepEqual(await healthResponse.json(), { status: "ok", database: "disconnected" });

  const contactResponse = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Alex", email: "bad", message: "Too short" }),
  });
  assert.equal(contactResponse.status, 400);
  assert.deepEqual(await contactResponse.json(), { error: "Enter a valid email address." });
});
