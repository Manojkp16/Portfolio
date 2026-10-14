import assert from "node:assert/strict";
import test from "node:test";
import { validateContact } from "../src/contactValidation.js";

test("trims and accepts a complete contact message", () => {
  const result = validateContact({
    name: "  Manoj  ",
    email: " hello@example.com ",
    message: "  I would like to discuss a project.  ",
  });

  assert.deepEqual(result, {
    valid: true,
    value: {
      name: "Manoj",
      email: "hello@example.com",
      message: "I would like to discuss a project.",
    },
  });
});

test("rejects an invalid email address", () => {
  const result = validateContact({ name: "Alex", email: "not-an-email", message: "A long enough message." });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Enter a valid email address.");
});

test("rejects a message that is too short", () => {
  const result = validateContact({ name: "Alex", email: "alex@example.com", message: "Short" });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Message must be between 10 and 5000 characters.");
});

test("rejects missing or non-string fields", () => {
  const result = validateContact({ name: 42, email: null, message: [] });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Name is required and must be 100 characters or fewer.");
});
