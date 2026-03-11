import express, { Request, Response } from "express";
// import helmet from 'helmet';
import path from "path";
import pagesRoute from "./routes/pages.route";
import { ROUTES } from "./config/routes.config";
import { MOTORCYCLE_TYPES } from "./config/add-laptime.enums"; // NEW
import './scripts/events_calendar/scheduler'; // This line will execute the scheduler's top-level code

const app = express();

const PORT = process.env.PORT || 3000

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// NEW: Global middleware to make ROUTES available in all EJS templates
app.use((req, res, next) => {
  res.locals.ROUTES = ROUTES;
  res.locals.MOTORCYCLE_TYPES = MOTORCYCLE_TYPES; // NEW: Make types available in EJS
  next();
});

// Body parser middleware for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add external styling
app.use("/static", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));

// add external assets and images
app.use("/images", express.static(path.join(__dirname, "../public/assets/images")));
app.use('/client_scripts', express.static(path.join(__dirname, "../public/scripts")));
app.use('/client_config', express.static(path.join(__dirname, "../public/scripts/config")));
app.use('/scripts', express.static(path.join(__dirname, "../scripts")));
app.use('/styles', express.static(path.join(__dirname, "../public/assets/css")));
app.use('/evidences', express.static(path.join(__dirname, "../uploads/evidences")));
app.use('/utils', express.static(path.join(__dirname, "./utils")));

// Routes
app.use("/", pagesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});