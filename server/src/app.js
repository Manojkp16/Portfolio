import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Contact from "./models/Contact.js";
import { validateContact } from "./contactValidation.js";

export function createApp() {
  const app = express();
  const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
  });

  app.post("/api/contact", async (request, response, next) => {
    const result = validateContact(request.body);
    if (!result.valid) {
      return response.status(400).json({ error: result.error });
    }

    if (mongoose.connection.readyState !== 1) {
      return response.status(503).json({ error: "The contact service is temporarily unavailable." });
    }

    try {
      await Contact.create(result.value);
      return response.status(201).json({ message: "Message received." });
    } catch (error) {
      return next(error);
    }
  });

  app.use((error, _request, response, _next) => {
    if (error instanceof SyntaxError && "body" in error) {
      return response.status(400).json({ error: "Request body must be valid JSON." });
    }
    if (error.type === "entity.too.large") {
      return response.status(413).json({ error: "Request body is too large." });
    }
    console.error("API request failed:", error);
    return response.status(500).json({ error: "An unexpected server error occurred." });
  });

  return app;
}
