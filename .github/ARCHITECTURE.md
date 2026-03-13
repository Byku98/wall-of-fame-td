# Project Architecture & Conventions

## Folder Layout

pszczolki-wof-terms/
├── public/                                 # Static assets served directly to the client
│   ├── assets/                             # Frontend assets
│   │   ├── css/                            # Stylesheets
│   │   │   ├── find-track-day.css          # Custom styles for the track day calendar page
│   │   │   ├── lap-details.css             # Styles specific to lap details pages
│   │   │   ├── leaderboard_styles.css      # Styles specific to the leaderboard
│   │   │   └── styles.css                  # Global/common stylesheets
│   │   ├── images/                         # Image assets
│   │   │   ├── laptimers/                  # Images of laptimer devices
│   │   │   ├── media/                      # General media files
│   │   │   ├── organizers/                 # Logos/images for event organizers
│   │   │   └── wof-internal/               # Internal WoF branding/logos (e.g., favicon)
│   │   └── scripts/                        # Client-side JavaScript files
│   │       ├── add-laptime.js              # Logic for the add laptime form
│   │       ├── find-track-day.js           # Logic for the find track day page (filtering, etc.)
│   │       ├── lap-details.js              # Logic for lap details pages
│   │       ├── leaderboard.js              # Logic for the leaderboard page
│   │       ├── translations.js             # Frontend translation utilities
│   │       └── utils.js                    # Frontend utility functions
│   │       └── config/                     # Client-side configuration (if any)
│   │           └── add-laptime.config.js   # Configuration specific to add laptime form
├── src/                                    # Source code (TypeScript)
│   ├── clients/                            # External service clients
│   │   ├── discord.client.ts               # Handles communication with Discord webhooks
│   │   └── mail.client.ts                  # Handles sending emails (e.g., Nodemailer setup)
│   ├── config/                             # Application configuration files
│   │   ├── add-laptime.database.config.ts  # Database connection configuration for add-laptime module
│   │   ├── add-laptime.enums.ts            # Enums specific to add-laptime (e.g., MOTORCYCLE_TYPES)
│   │   ├── leaderboard.database.config.ts  # Database connection configuration for leaderboard module
│   │   └── routes.config.ts                # Centralized definition of all application routes/paths
│   ├── controllers/                        # Express.js route handlers (business logic orchestration)
│   │   ├── add-laptime.controller.ts       # Handles requests related to adding lap times
│   │   ├── find-track-day.controller.ts    # Handles requests for the "Find Track Day" page
│   │   ├── lap-details.controller.ts       # Handles requests for displaying lap details
│   │   ├── leaderboard.controller.ts       # Handles requests for the leaderboard page
│   │   ├── management.controller.ts        # Handles requests for approving/rejecting/modifying pending items
│   │   └── privacy-policy.controller.ts    # Handles requests for the Privacy Policy page
│   ├── middlewares/                        # Express.js middleware functions
│   │   └── upload.middleware.ts            # Middleware for handling file uploads (e.g., proof images)
│   ├── repositories/                       # Data access layer (interacts with the database)
│   │   ├── add-laptime.repository.ts       # Database operations for adding lap times and related entities
│   │   ├── event.repository.ts             # Database operations for event calendar data
│   │   ├── lap-details.repository.ts       # Database operations for fetching lap details
│   │   ├── leaderboard.repository.ts       # Database operations for leaderboard data
│   │   └── management.repository.ts        # Database operations for managing pending items
│   ├── routes/                             # Express.js route definitions
│   │   ├── add-laptime.route.ts            # Routes specific to adding lap times
│   │   ├── find-track-day.route.ts         # Routes specific to the "Find Track Day" page
│   │   ├── leaderboard.route.ts            # Routes specific to the leaderboard
│   │   ├── management.route.ts             # Routes specific to management actions (approve/reject)
│   │   ├── pages.route.ts                  # Main router that mounts all other page-level route modules
│   │   └── privacy-policy.route.ts         # Routes specific to the Privacy Policy page
│   ├── scripts/                            # Server-side scripts (e.g., scrapers, scheduled tasks)
│   │   ├── events_calendar/                # Scripts related to the events calendar
│   │   │   ├── common/                     # Common utilities and types for scrapers
│   │   │   │   ├── crawler.ts              # Web crawling utility
│   │   │   │   ├── types.ts                # TypeScript types for scraped events
│   │   │   │   └── utils.ts                # Common utility functions for scraping (text cleaning, date extraction)
│   │   │   ├── events/                     # Storage for scraped event data
│   │   │   │   └── events.json             # JSON file storing scraped event data
│   │   │   ├── organizers/                 # Individual scraper modules for different organizers
│   │   │   │   ├── 3mm.ts                  # Scraper for 3MM Racing Academy events
│   │   │   │   └── motoekipa.ts            # Scraper for Motoekipa events
│   │   │   └── scheduler.ts                # Script for scheduling scraper runs
│   │   └── get_trackdays_pomeranian.py     # (Legacy) Python scraper for Pomeranian track days
│   ├── services/                           # Business logic layer (orchestrates repositories and clients)
│   │   ├── add-laptime.service.ts          # Business logic for adding lap times
│   │   ├── lap-details.service.ts          # Business logic for lap details
│   │   ├── leaderboard.service.ts          # Business logic for leaderboard
│   │   └── management.service.ts           # Business logic for managing pending items
│   ├── types/                              # TypeScript type definitions (interfaces)
│   │   └── lap-details.ts                  # Interface for lap details data
│   ├── utils/                              # General utility functions (TypeScript)
│   │   ├── formatters.ts                   # Data formatting utilities
│   │   └── translations.ts                 # Translation utilities
│   └── views/                              # EJS templates for server-side rendering
│       ├── add-laptime.ejs                 # Main EJS view for adding lap times
│       ├── error.ejs                       # Generic error page
│       ├── lap-details.ejs                 # Main EJS view for lap details
│       ├── leaderboard.ejs                 # Main EJS view for the leaderboard
│       │   └── components/                 # Reusable EJS components
│       │       ├── add-laptime/            # Components for add laptime form
│       │       ├── header/                 # Header components
│       │       ├── lap-details/            # Components for lap details
│       │       └── leaderboard/            # Components for leaderboard
│       ├── find-track-day.ejs              # Main EJS view for the "Find Track Day" calendar
│       ├── privacy-policy.ejs              # Main EJS view for the Privacy Policy page
│       └── laps-management/                # EJS views for management actions
│           ├── management-error.ejs        # Error page for management actions
│           ├── management-modify-motorcycle.ejs # Form for modifying pending motorcycles
│           ├── management-modify-tyre.ejs  # Form for modifying pending tyres
│           ├── management-reject.ejs       # Form for rejecting pending items
│           └── management-success.ejs      # Success page for management actions
└── package.json                            # Project dependencies and scripts


- Place new files in corresponding directories.
- Update registries (e.g., `index.ts`, routers) if needed.
- Follow existing naming and import/export conventions.
- Respect module type (CommonJS / ESM).

## TypeScript / JavaScript Rules
- `.ts` → TypeScript; `.js` → JavaScript
- Use `tsconfig.json`, ESLint, Prettier rules
- Reuse existing helpers, utilities, and async patterns
- Do not introduce unnecessary dependencies

## Development Guidelines
- Only create folders/files when logically needed.
- Maintain minimal and maintainable changes.
- Integrate new features with existing architecture.
- Document structural changes.