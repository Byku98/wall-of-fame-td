"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import helmet from 'helmet';
const path_1 = __importDefault(require("path"));
const pages_route_1 = __importDefault(require("./routes/pages.route"));
const routes_config_1 = require("./config/routes.config");
const add_laptime_enums_1 = require("./config/add-laptime.enums"); // NEW
require("./scripts/events_calendar/scheduler"); // This line will execute the scheduler's top-level code
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Set view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// NEW: Global middleware to make ROUTES available in all EJS templates
app.use((req, res, next) => {
    res.locals.ROUTES = routes_config_1.ROUTES;
    res.locals.MOTORCYCLE_TYPES = add_laptime_enums_1.MOTORCYCLE_TYPES; // NEW: Make types available in EJS
    next();
});
// Body parser middleware for form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// add external styling
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../node_modules/bootstrap/dist")));
// add external assets and images
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/assets/images")));
app.use('/client_scripts', express_1.default.static(path_1.default.join(__dirname, "../public/scripts")));
app.use('/client_config', express_1.default.static(path_1.default.join(__dirname, "../public/scripts/config")));
app.use('/scripts', express_1.default.static(path_1.default.join(__dirname, "../scripts")));
app.use('/styles', express_1.default.static(path_1.default.join(__dirname, "../public/assets/css")));
app.use('/evidences', express_1.default.static(path_1.default.join(__dirname, "../uploads/evidences")));
app.use('/utils', express_1.default.static(path_1.default.join(__dirname, "./utils")));
// Routes
app.use("/", pages_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map