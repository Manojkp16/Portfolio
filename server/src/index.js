import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is required. Copy .env.example to .env and set your MongoDB connection string.");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);
  const app = createApp();
  const server = app.listen(port, () => {
    console.info(`Portfolio API listening on http://localhost:${port}`);
  });

  async function shutdown(signal) {
    console.info(`${signal} received; shutting down.`);
    server.close(async (error) => {
      if (error) {
        console.error("Failed to close the HTTP server:", error);
        process.exitCode = 1;
      }
      await mongoose.disconnect();
      process.exit();
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
} catch (error) {
  console.error("Could not connect to MongoDB:", error.message);
  process.exit(1);
}
