"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const lap_details_controller_1 = require("../controllers/lap-details.controller");
const router = (0, express_1.Router)();
// Root route → landing page
router.get("/leaderboard", leaderboard_controller_1.renderLeaderboardPage);
// Route to get filtered leaderboard data via AJAX
router.get("/leaderboard/filter", leaderboard_controller_1.getFilteredLeaderboardData);
// Change from query params to URL params
router.get('/lap-details/:lapTime/:riderName/:motorcycle/:lap_date/:trackName', lap_details_controller_1.getLapDetails);
// Route for rider lap history
// router.get("/rider-history/:riderName/:trackName", getRiderLapHistory);
exports.default = router;
//# sourceMappingURL=leaderboard.route.js.map