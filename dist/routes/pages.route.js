"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_config_1 = require("../config/routes.config");
// Import your specific route modules
const leaderboard_route_1 = __importDefault(require("./leaderboard.route"));
const add_laptime_route_1 = __importDefault(require("./add-laptime.route"));
const management_route_1 = __importDefault(require("./management.route"));
const find_track_day_route_1 = __importDefault(require("./find-track-day.route"));
const privacy_policy_route_1 = __importDefault(require("./privacy-policy.route"));
const router = (0, express_1.Router)();
// Redirect root to leaderboard
router.get(routes_config_1.ROUTES.PAGES.ROOT, (req, res) => res.redirect(routes_config_1.ROUTES.PAGES.LEADERBOARD));
// Mount other specific route modules
// These modules should define their own full paths (e.g., /leaderboard, /add-laptime)
router.use(leaderboard_route_1.default);
router.use(add_laptime_route_1.default);
router.use(management_route_1.default);
router.use(find_track_day_route_1.default);
router.use(privacy_policy_route_1.default);
exports.default = router;
//# sourceMappingURL=pages.route.js.map