# Manoj K P — Portfolio

A responsive React portfolio for Manoj K P, MERN stack developer, with a Node.js and Express API that stores contact messages in MongoDB.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- MongoDB running locally or a MongoDB connection string

## Setup

1. Install dependencies from the repository root:

   ```sh
   npm install
   ```

2. Create the server environment file and set `MONGODB_URI`:

   ```sh
   cp .env.example server/.env
   ```

   On Windows PowerShell, use `Copy-Item .env.example server/.env`.

3. Start the client and API together:

   ```sh
   npm run dev
   ```

   The Vite app runs at `http://localhost:5173`; the API runs at `http://localhost:3000`.

## Build and tests

- Build the frontend: `npm run build`
- Run the backend tests: `npm test`
- Run one backend test by name: `npm test -w server -- --test-name-pattern="invalid email"`

The contact form posts to `/api/contact`. MongoDB connection settings, API port, and the allowed client origin are configured through `server/.env`.

## Browser testing in VS Code

The workspace `.mcp.json` configures the official Playwright MCP server. Start the app with `npm run dev`, then use its browser tools to inspect the page and exercise responsive behavior. VS Code may ask you to trust the server the first time it starts.

## Project structure

- `client/src/data.js` contains the public profile, skills, and process content.
- `client/src/App.jsx` composes the page and contact form; `client/src/styles.css` contains the responsive styling and motion effects.
- `server/src/app.js` defines the API; `contactValidation.js` validates incoming form data; `models/Contact.js` defines the MongoDB document.
- `server/src/index.js` connects to MongoDB before starting the API.
