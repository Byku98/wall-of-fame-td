# AI Agent Instructions for `pszczolki-wof-terms`

This document guides AI coding agents on the essential architecture, conventions, and workflows of the `pszczolki-wof-terms` codebase.

## 1. Project Architecture Overview

This is a Node.js application using Express.js for the backend and EJS for server-side templating. It interacts with a MySQL database.

*   **Frontend (Client-side):**
    *   EJS templates (`src/views/*.ejs`) render dynamic HTML.
    *   Client-side JavaScript (`public/scripts/*.js`) handles interactivity and AJAX requests.
    *   Static assets (CSS, images) are served from the `public/assets/` directory.
*   **Backend (Server-side):**
    *   **Entry Point:** `src/index.ts` (or similar, based on `package.json` `main` script).
    *   **Routing:** Express routes are defined in `src/routes/`. `src/routes/pages.route.ts` acts as a central router mounting sub-routes like `src/routes/landing.route.ts` and `src/routes/leaderboard.route.ts`.
    *   **Controllers:** `src/controllers/` contains functions that handle requests, interact with services, and render EJS views or send JSON responses.
        *   Example: `src/controllers/leaderboard.controller.ts` handles rendering the leaderboard page and fetching filtered data.
    *   **Services:** `src/services/` encapsulates business logic and orchestrates interactions with repositories.
        *   Example: `src/services/leaderboard.service.ts` provides methods to get track lists and leaderboard data.
    *   **Repositories:** `src/repositories/` handles direct database interactions using a connection pool.
        *   Example: `src/repositories/leaderboard.repository.ts` contains SQL queries for tracks and leaderboard data.
    *   **Database Configuration:** `src/config/leaderboard.database.config.ts` manages database connection settings.

## 2. Data Flow Example: Leaderboard Page

1.  **Initial Page Load (`GET /leaderboard`):**
    *   `src/routes/leaderboard.route.ts` maps `/leaderboard` to `leaderboard.controller.ts::renderLeaderboardPage`.
    *   `renderLeaderboardPage` fetches `trackList` from `leaderboard.service.ts::getAllTracks`.
    *   It determines an initial `trackId` (from query param or first track in `trackList`).
    *   If a `trackId` is found, it fetches initial `leaderboard` data from `leaderboard.service.ts::getLeaderboardByTrack`.
    *   Renders `src/views/leaderboard.ejs`, passing `title`, `trackList`, `leaderboard`, and `selectedTrackId`.
2.  **AJAX Filter (`GET /leaderboard/filter?trackId=X`):**
    *   Client-side JavaScript in `public/scripts/leaderboard.js` makes a `fetch` request to `/leaderboard/filter` when the filter button is clicked.
    *   `src/routes/leaderboard.route.ts` maps `/leaderboard/filter` to `leaderboard.controller.ts::getFilteredLeaderboardData`.
    *   `getFilteredLeaderboardData` extracts `trackId` from query, fetches data via `leaderboard.service.ts::getLeaderboardByTrack`, and responds with JSON.
    *   Client-side JavaScript receives JSON and dynamically updates the table in `leaderboard.ejs`.

## 3. Key Conventions and Patterns

*   **Layered Architecture:** The project follows a clear separation of concerns: Route -> Controller -> Service -> Repository -> Database.
*   **Asynchronous Operations:** Database and I/O operations are typically `async/await`.
*   **EJS Templating:** EJS is used for dynamic HTML generation. Pay attention to `<% %>` for logic and `<%= %>` for output (escaped).
*   **Static Assets:** Client-side CSS, JS, and images are served from the `public/` directory.
    *   `public/assets/css/` for stylesheets.
    *   `public/assets/images/` for application images.
    *   `public/scripts/` for client-side JavaScript.
*   **Database Views:** The `leaderboard_get_all_tack_laps` MySQL view is used to simplify complex queries in the repository layer.

## 4. Critical Developer Workflows

*   **Starting the Application:**
    *   `npm install` (to install dependencies)
    *   `npm run dev` (to start the development server, likely using `ts-node-dev` or similar for live reloading)
*   **Database Interaction:**
    *   Database connection details are in `src/config/leaderboard.database.config.ts`.
    *   SQL queries are directly embedded in repository methods.

## 5. External Dependencies

*   **Express.js:** Web framework.
*   **EJS:** Templating engine.
*   **MySQL2:** MySQL client for Node.js.
*   **Bootstrap 5:** Frontend CSS framework (linked via CDN in EJS templates).

## 6. Common Pitfalls/Considerations for AI Agents

*   When modifying service or repository methods, ensure the return type matches what the caller expects (e.g., an array for `forEach`).
*   Client-side JavaScript in `public/scripts/` should be pure JavaScript, not TypeScript, as it's served directly to the browser.
*   When adding new static assets, ensure they are placed in the `public/` directory and linked with correct relative paths (e.g., `/assets/css/new.css`).
*   User-uploaded content (e.g., customer pictures) should NOT be placed in `public/assets/`. A dedicated `uploads/` directory or cloud storage is preferred.
