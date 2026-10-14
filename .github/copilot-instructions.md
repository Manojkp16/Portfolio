# Copilot instructions

## Project overview

This repository contains a single-page React portfolio and an Express API. The frontend lives in `client/` and is built with Vite; the backend lives in `server/` and uses Mongoose to persist contact-form submissions in MongoDB. `client/src/data.js` is the source for public profile, skills, projects, and process content. `client/src/App.jsx` composes the page sections and handles client-side contact-form state. The form sends JSON to `/api/contact`; `server/src/app.js` validates and stores messages through the `Contact` model. `server/src/index.js` connects to MongoDB before listening, so the API does not start with an unavailable database.

## Commands

Run these from the repository root:

- Install: `npm install`
- Start Vite and the API together: `npm run dev`
- Build the frontend: `npm run build`
- Run backend tests: `npm test`
- Run one backend test by name: `npm test -w server -- --test-name-pattern="invalid email"`

The backend requires `server/.env` with `MONGODB_URI`; see `.env.example`. Vite serves the frontend on port 5173 and proxies `/api` to the backend at port 3000 for local development. In production, route `/api` to Express through the deployment's reverse proxy or combined host.

## Repository conventions

- Keep editable portfolio copy, skills, project details, and process content in `client/src/data.js`; avoid duplicating profile content in page components.
- Keep page sections and their UI behavior in `client/src/App.jsx`, with shared visual rules and responsive/reduced-motion handling in `client/src/styles.css`.
- The UI uses a dark palette, lime accent, and small uppercase DM Mono labels. Preserve the responsive layout and the `prefers-reduced-motion` override when adjusting animation. Vite proxies local `/api` requests to the Express server at `http://localhost:3000`.
- Keep contact validation in `server/src/contactValidation.js` as a pure function so the same rules remain independently testable. The route returns actionable 4xx responses for invalid requests and reports unexpected server errors rather than treating them as successful submissions.
- Store contact submissions through the Mongoose model; do not expose database credentials or accept additional persisted fields without an explicit requirement.
- Backend tests use Node's built-in test runner under `server/test/`; test files use the `*.test.js` suffix.
- `.mcp.json` configures the official Playwright MCP server. When browser validation is useful, start the app with `npm run dev` and use Playwright to inspect the UI and exercise responsive behavior.
