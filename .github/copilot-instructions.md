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
        *   Example: `src/controllers/lap-details.controller.ts` handles rendering lap details and fetching specific lap data.
    *   **Services:** `src/services/` encapsulates business logic and orchestrates interactions with repositories.
        *   Example: `src/services/leaderboard.service.ts` provides methods to get track lists and leaderboard data.
        *   Example: `src/services/lap-details.service.ts` provides methods to get lap details.
    *   **Repositories:** `src/repositories/` handles direct database interactions using a connection pool.
        *   Example: `src/repositories/leaderboard.repository.ts` contains SQL queries for tracks and leaderboard data.
        *   Example: `src/repositories/lap-details.repository.ts` contains SQL queries for lap details.
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

## 3. Data Flow Example: Lap Details Page

1.  **Page Load (`GET /leaderboard/lap-details?lapTime=X&riderName=Y&motorcycle=Z&lap_date=W`):**
    *   `src/routes/leaderboard.route.ts` maps `/leaderboard/lap-details` to `lap-details.controller.ts::getLapDetails`.
    *   `getLapDetails` extracts query parameters (`lapTime`, `riderName`, `motorcycle`, `lap_date`), fetches data from `lap-details.service.ts::getLapDetails`, and renders `src/views/lap-details.ejs` with lap details.
2.  **Client-Side Navigation:**
    *   Client-side JavaScript in `public/scripts/leaderboard.js` constructs the URL with query parameters on row click and navigates using `window.location.href`.
    *   Optional client-side interactions in `public/scripts/lap-details.js` handle page-specific features like modals.

## 4. Key Conventions and Patterns

*   **Layered Architecture:** The project follows a clear separation of concerns: Route -> Controller -> Service -> Repository -> Database.
*   **Asynchronous Operations:** Database and I/O operations are typically `async/await`.
*   **EJS Templating:** EJS is used for dynamic HTML generation. Pay attention to `<% %>` for logic and `<%= %>` for output (escaped).
*   **Static Assets:** Client-side CSS, JS, and images are served from the `public/` directory.
    *   `public/assets/css/` for stylesheets.
    *   `public/assets/images/` for application images.
    *   `public/scripts/` for client-side JavaScript, including shared utilities like `public/scripts/utils.js` for date formatting.
*   **Database Views:** The `leaderboard_get_all_tack_laps` MySQL view is used to simplify complex queries in the repository layer.
*   **Date Formatting:** Client-side utilities in `public/scripts/utils.js` handle conversions between DD.MM.YYYY and YYYY-MM-DD for display and DB compatibility.

## 5. Critical Developer Workflows

*   **Starting the Application:**
    *   `npm install` (to install dependencies)
    *   `npm run dev` (to start the development server, likely using `ts-node-dev` or similar for live reloading)
*   **Database Interaction:**
    *   Database connection details are in `src/config/leaderboard.database.config.ts`.
    *   SQL queries are directly embedded in repository methods.
*   **Security:** Use `helmet` in `src/index.ts` for CSP headers to allow localhost and CDNs.

## 6. External Dependencies

*   **Express.js:** Web framework.
*   **EJS:** Templating engine.
*   **MySQL2:** MySQL client for Node.js.
*   **Helmet:** Security middleware for CSP.
*   **Bootstrap 5:** Frontend CSS framework (linked via CDN in EJS templates).

## 7. Common Pitfalls/Considerations for AI Agents

*   When modifying service or repository methods, ensure the return type matches what the caller expects (e.g., an array for `forEach`).
*   Client-side JavaScript in `public/scripts/` should be pure JavaScript, not TypeScript, as it's served directly to the browser. Use ES modules with `type="module"` in EJS script tags for imports.
*   When adding new static assets, ensure they are placed in the `public/` directory and linked with correct relative paths (e.g., `/assets/css/new.css`).
*   User-uploaded content (e.g., customer pictures) should NOT be placed in `public/assets/`. A dedicated `uploads/` directory or cloud storage is preferred.
*   For date handling, use utilities in `public/scripts/utils.js` for conversions between display and DB formats`.