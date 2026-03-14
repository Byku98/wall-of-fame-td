"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_config_1 = require("../config/routes.config");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const lap_details_controller_1 = require("../controllers/lap-details.controller");
const router = (0, express_1.Router)();
router.get(routes_config_1.ROUTES.PAGES.LEADERBOARD, leaderboard_controller_1.renderLeaderboardPage);
router.get(routes_config_1.ROUTES.API.LEADERBOARD.FILTER, leaderboard_controller_1.getFilteredLeaderboardData);
router.get(`${routes_config_1.ROUTES.PAGES.LAP_DETAILS}/:lapTime/:riderName/:motorcycle/:lap_date/:trackName`, lap_details_controller_1.getLapDetails);
exports.default = router;
//# sourceMappingURL=leaderboard.route.js.map